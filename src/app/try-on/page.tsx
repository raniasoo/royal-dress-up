"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Upload, ChevronRight, ChevronLeft, Download, RotateCcw, Share2, ShieldCheck, Move, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { fal } from "@fal-ai/client";
import { dresses, getClothing, getDressBySlug } from "@/data/dresses";
import { Button } from "@/components/ui/Button";
import { ShareModal } from "@/components/ui/ShareModal";
import { Spinner } from "@/components/ui/Spinner";

fal.config({ proxyUrl: "/api/tryon" });

const steps = ["사진 업로드", "드레스 선택", "결과 확인"];

export default function TryOnPage() {
  return (
    <Suspense>
      <TryOnContent />
    </Suspense>
  );
}

function TryOnContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [photoConsent, setPhotoConsent] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [resultReady, setResultReady] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const [dressOpacity, setDressOpacity] = useState(0.9);
  const [processingMsg, setProcessingMsg] = useState("");
  const [aiMode, setAiMode] = useState(false);
  const [aiResults, setAiResults] = useState<string[]>([]);
  const [aiSelectedIdx, setAiSelectedIdx] = useState(0);
  const [aiError, setAiError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<import("fabric").Canvas | null>(null);
  const dressObjRef = useRef<import("fabric").FabricImage | null>(null);

  useEffect(() => {
    const dressParam = searchParams.get("dress");
    if (dressParam && getDressBySlug(dressParam)) {
      setSelectedSlug(dressParam);
    }
  }, [searchParams]);

  const onDrop = useCallback((accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    toast.success("사진이 업로드되었습니다");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    multiple: false,
  });

  const initIdRef = useRef(0);

  function goToResult(useAi: boolean, isRetry = false) {
    // 이전 캔버스 정리
    if (fabricRef.current) {
      fabricRef.current.dispose();
      fabricRef.current = null;
    }
    dressObjRef.current = null;

    setStep(2);
    setProcessing(true);
    setResultReady(false);
    setDressOpacity(0.9);
    setAiMode(useAi);
    setAiResults([]);
    setAiSelectedIdx(0);
    setAiError(null);
    if (isRetry) {
      setRetryCount((c) => c + 1);
      toast.info(`재시도 중... (${retryCount + 1}/${MAX_RETRIES})`);
    } else {
      setRetryCount(0);
    }
    setProcessingMsg(useAi ? "AI가 드레스를 피팅하고 있습니다..." : "드레스를 준비하고 있습니다...");

    // 새 초기화 ID로 이전 effect 무효화
    initIdRef.current += 1;
  }

  // 캔버스/AI 초기화 통합 effect
  useEffect(() => {
    if (!processing || !photo || !selectedDress) return;
    const myId = initIdRef.current;
    const isCurrent = () => myId === initIdRef.current;

    if (aiMode) {
      // === GPT Image Edit 모드 ===
      (async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90_000);

        try {
          setProcessingMsg("사진을 준비하고 있습니다...");

          // blob URL → base64 data URL 변환 (Vercel 4.5MB 제한 내 최대 품질 유지)
          const photoDataUrl = await new Promise<string>((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => {
              const MAX = 2048;
              let { width, height } = img;
              if (width > MAX || height > MAX) {
                const scale = MAX / Math.max(width, height);
                width = Math.round(width * scale);
                height = Math.round(height * scale);
              }
              const cvs = document.createElement("canvas");
              cvs.width = width;
              cvs.height = height;
              const ctx = cvs.getContext("2d")!;
              ctx.drawImage(img, 0, 0, width, height);
              resolve(cvs.toDataURL("image/jpeg", 0.95));
            };
            img.onerror = () => reject(new Error("사진 로드에 실패했습니다."));
            img.src = photo!;
          });

          setProcessingMsg("AI가 드레스를 피팅하고 있습니다... (30~60초 소요)");

          const res = await fetch("/api/gpt-fitting", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              photoDataUrl,
              dressImageUrl: selectedDress!.images.catalog,
              dressName: selectedDress!.name,
            }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          if (!isCurrent()) return;

          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            if (res.status === 429) throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
            if (res.status >= 500) throw new Error("서버에 일시적인 문제가 발생했습니다. 다시 시도해주세요.");
            throw new Error(data.error || "AI 피팅 실패");
          }

          const data = await res.json();
          setAiResults([data.imageUrl]);
          setAiSelectedIdx(0);
          setProcessing(false);
          setResultReady(true);
        } catch (err: unknown) {
          clearTimeout(timeoutId);
          if (!isCurrent()) return;
          let msg: string;
          if (err instanceof DOMException && err.name === "AbortError") {
            msg = "요청 시간이 초과되었습니다. 네트워크 상태를 확인하고 다시 시도해주세요.";
          } else if (err instanceof TypeError && err.message === "Failed to fetch") {
            msg = "네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.";
          } else {
            msg = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
          }
          setAiError(msg);
          setProcessing(false);
          setResultReady(true);
        }
      })();
    } else {
      // === 수동 Fabric.js 모드 ===
      let canvas: import("fabric").Canvas | null = null;

      (async () => {
        try {
          // 캔버스 DOM이 렌더링될 때까지 대기 (AnimatePresence exit 200ms + 여유)
          for (let i = 0; i < 30; i++) {
            await new Promise((r) => setTimeout(r, 50));
            if (!isCurrent()) return;
            if (canvasRef.current) break;
          }
          if (!canvasRef.current) {
            throw new Error("캔버스를 초기화할 수 없습니다. 다시 시도해주세요.");
          }

          const fabric = await import("fabric");
          if (!isCurrent() || !canvasRef.current) return;

          const CANVAS_W = 500;
          const CANVAS_H = 650;

          canvas = new fabric.Canvas(canvasRef.current, {
            width: CANVAS_W,
            height: CANVAS_H,
            backgroundColor: "#f1f5f9",
            selection: true,
          });
          fabricRef.current = canvas;

          setProcessingMsg("사진을 로딩하고 있습니다...");
          const bgImg = await fabric.FabricImage.fromURL(photo!);
          if (!bgImg.width || !bgImg.height) throw new Error("사진 로드 실패");
          const bgScale = Math.max(CANVAS_W / bgImg.width!, CANVAS_H / bgImg.height!);
          bgImg.set({
            scaleX: bgScale,
            scaleY: bgScale,
            left: CANVAS_W / 2,
            top: CANVAS_H / 2,
            originX: "center",
            originY: "center",
            selectable: false,
            evented: false,
          });
          canvas.add(bgImg);
          if (!isCurrent()) return;

          setProcessingMsg("드레스를 피팅하고 있습니다...");
          let dressImg: import("fabric").FabricImage;
          try {
            dressImg = await fabric.FabricImage.fromURL(selectedDress!.images.garment);
            if (!dressImg.width || dressImg.width < 10) throw new Error("invalid");
          } catch {
            dressImg = await fabric.FabricImage.fromURL(selectedDress!.images.catalog);
          }
          if (!isCurrent()) return;

          const dressScale = Math.min(
            (CANVAS_W * 0.7) / dressImg.width!,
            (CANVAS_H * 0.75) / dressImg.height!,
          );
          dressImg.set({
            scaleX: dressScale,
            scaleY: dressScale,
            left: CANVAS_W / 2,
            top: CANVAS_H / 2,
            originX: "center",
            originY: "center",
            opacity: 0.9,
            cornerColor: "#e11d48",
            cornerStrokeColor: "#e11d48",
            cornerSize: 12,
            transparentCorners: false,
            borderColor: "#e11d48",
            borderScaleFactor: 2,
            padding: 5,
          });
          canvas.add(dressImg);
          canvas.setActiveObject(dressImg);
          canvas.renderAll();
          dressObjRef.current = dressImg;

          setProcessing(false);
          setResultReady(true);
        } catch (err: unknown) {
          if (!isCurrent()) return;
          const msg = err instanceof Error ? err.message : "수동 피팅 초기화 실패";
          setAiError(msg);
          setProcessing(false);
          setResultReady(true);
        }
      })();

      return () => {
        if (canvas) {
          canvas.dispose();
          fabricRef.current = null;
          dressObjRef.current = null;
        }
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  // 불투명도 슬라이더 반영
  useEffect(() => {
    if (dressObjRef.current && fabricRef.current) {
      dressObjRef.current.set({ opacity: dressOpacity });
      fabricRef.current.renderAll();
    }
  }, [dressOpacity]);

  function downloadResult() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.renderAll();
    const dataUrl = canvas.toDataURL({ format: "png", multiplier: 2 });
    const link = document.createElement("a");
    link.download = "royal-closet-fitting.png";
    link.href = dataUrl;
    link.click();
  }

  function openShare() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.renderAll();
    const dataUrl = canvas.toDataURL({ format: "png", multiplier: 2 });
    setShareImage(dataUrl);
    setShareOpen(true);
  }

  function reset() {
    initIdRef.current += 1;
    if (fabricRef.current) {
      fabricRef.current.dispose();
      fabricRef.current = null;
    }
    dressObjRef.current = null;
    setStep(0);
    setPhoto(null);
    setSelectedSlug(null);
    setProcessing(false);
    setResultReady(false);
    setShareImage(null);
    setAiResults([]);
    setAiError(null);
    setRetryCount(0);
  }

  const selectedDress = selectedSlug ? getDressBySlug(selectedSlug) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Step indicator */}
      <div className="mb-10 flex items-center justify-center gap-0">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  i <= step
                    ? "bg-rose-600 text-white"
                    : "bg-slate-200 text-slate-400"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium ${
                  i <= step ? "text-rose-600" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-3 mb-5 h-0.5 w-12 sm:w-20 ${
                  i < step ? "bg-rose-600" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Upload */}
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="mb-6 text-center text-xl font-bold text-slate-900">
              사진을 업로드하세요
            </h2>

            {!photoConsent ? (
              <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                  <h3 className="text-base font-semibold text-slate-900">사진 업로드 동의</h3>
                </div>
                <p className="mb-4 text-sm text-slate-600">
                  귀하의 사진은 가상 트라이온 기능에만 사용됩니다.
                </p>
                <ul className="mb-5 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    사진은 브라우저에서만 처리되며 서버로 전송되지 않습니다
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    얼굴 인식 기술을 사용하지 않습니다
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    세션 종료 시 모든 사진 데이터가 자동 삭제됩니다
                  </li>
                </ul>
                <label className="mb-5 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={photoConsent}
                    onChange={(e) => setPhotoConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-sm text-slate-700">
                    위 내용을 이해하고 사진 업로드에 동의합니다
                  </span>
                </label>
                <div className="flex gap-3">
                  <Button onClick={() => setPhotoConsent(true)} disabled={!photoConsent}>
                    동의 후 계속
                  </Button>
                  <a
                    href="/dress-up"
                    className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    사진 없이 아바타 꾸미기
                  </a>
                </div>
              </div>
            ) : !photo ? (
              <>
                <div
                  {...getRootProps()}
                  className={`mx-auto flex max-w-md cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed p-12 transition-colors ${
                    isDragActive
                      ? "border-rose-400 bg-rose-50"
                      : "border-slate-300 bg-slate-50 hover:border-slate-400"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-10 w-10 text-slate-400" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-600">
                      사진을 드래그하거나 클릭하여 선택
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      JPG, PNG, WebP (최대 10MB)
                    </p>
                  </div>
                </div>
                <div className="mx-auto mt-4 max-w-md rounded-lg border border-violet-100 bg-violet-50/50 px-4 py-3">
                  <p className="mb-1.5 text-xs font-semibold text-violet-600">AI 피팅 최적 사진 가이드</p>
                  <ul className="space-y-1 text-[11px] text-violet-500/80">
                    <li>• 정면을 바라보는 <strong>전신 사진</strong>이 가장 좋습니다</li>
                    <li>• <strong>밝고 단순한 배경</strong> 앞에서 촬영하세요</li>
                    <li>• 몸에 <strong>붙는 옷</strong>을 입은 사진이 더 자연스럽습니다</li>
                    <li>• 해상도 <strong>1000px 이상</strong>을 권장합니다</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="mx-auto max-w-md text-center">
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt="업로드된 사진"
                    className="max-h-80 w-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setPhoto(null)}
                  className="mt-3 text-sm text-slate-500 underline hover:text-slate-700"
                >
                  다른 사진 선택
                </button>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                disabled={!photo}
                onClick={() => setStep(1)}
              >
                다음 단계
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Select dress */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="mb-6 text-center text-xl font-bold text-slate-900">
              드레스를 선택하세요
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {getClothing().map((dress) => (
                <button
                  key={dress.slug}
                  onClick={() => setSelectedSlug(dress.slug)}
                  className={`overflow-hidden rounded-xl border-2 text-left transition-all ${
                    selectedSlug === dress.slug
                      ? "border-rose-500 ring-2 ring-rose-500/30"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="relative aspect-square bg-slate-100">
                    <Image
                      src={dress.images.catalog}
                      alt={dress.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs text-rose-500 font-medium">{dress.royal.name}</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{dress.name}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  이전
                </Button>
                <Button
                  size="lg"
                  disabled={!selectedSlug}
                  onClick={() => goToResult(false)}
                >
                  수동 피팅
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  disabled={!selectedSlug}
                  onClick={() => goToResult(true)}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  AI 피팅
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <p className="text-[11px] text-slate-400">수동: 드레스를 직접 배치 | AI: 사진 위에 드레스를 자동 합성</p>
            </div>
          </motion.div>
        )}

        {/* Step 3: Result */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mx-auto max-w-2xl">
                <h2 className="mb-2 text-center text-xl font-bold text-slate-900">
                  피팅 결과 {aiMode && <span className="ml-1 rounded bg-violet-100 px-1.5 py-0.5 text-xs text-violet-600">AI</span>}
                </h2>

                {/* === AI 피팅 모드 === */}
                {aiMode ? (
                  <>
                    {processing && (
                      <div className="flex flex-col items-center gap-4 py-20">
                        <Spinner className="h-12 w-12" />
                        <p className="text-sm font-medium text-slate-500">{processingMsg}</p>
                        <p className="text-xs text-slate-400">10~20초 정도 소요됩니다</p>
                      </div>
                    )}

                    {resultReady && aiError && (
                      <div className="mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                        <p className="text-sm font-medium text-red-600 mb-2">AI 피팅 실패</p>
                        <p className="text-xs text-red-500 mb-4">{aiError}</p>
                        {retryCount > 0 && (
                          <p className="text-xs text-red-400 mb-3">재시도 {retryCount}/{MAX_RETRIES}회 실패</p>
                        )}
                        <div className="flex justify-center gap-3">
                          <Button onClick={() => goToResult(false)}>
                            수동 피팅으로 전환
                          </Button>
                          {retryCount < MAX_RETRIES ? (
                            <Button variant="ghost" onClick={() => goToResult(true, true)}>
                              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                              다시 시도 ({MAX_RETRIES - retryCount}회 남음)
                            </Button>
                          ) : (
                            <p className="flex items-center text-xs text-slate-400">
                              최대 재시도 횟수를 초과했습니다
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {resultReady && aiResults.length > 0 && (
                      <div>
                        {selectedDress && (
                          <p className="mb-4 text-center text-xs text-slate-400">
                            {selectedDress.name} — {selectedDress.royal.name}
                          </p>
                        )}

                        {/* 2장 결과 선택 */}
                        {aiResults.length > 1 && (
                          <p className="mb-3 text-center text-xs font-medium text-violet-500">
                            마음에 드는 결과를 선택하세요
                          </p>
                        )}
                        <div className={`grid gap-3 ${aiResults.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-md mx-auto"}`}>
                          {aiResults.map((url, idx) => (
                            <button
                              key={idx}
                              onClick={() => setAiSelectedIdx(idx)}
                              className={`overflow-hidden rounded-xl border-2 transition-all ${
                                aiSelectedIdx === idx
                                  ? "border-violet-500 ring-2 ring-violet-500/30 shadow-lg"
                                  : "border-slate-200 hover:border-slate-300 opacity-75"
                              }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={url} alt={`AI 피팅 결과 ${idx + 1}`} className="w-full" />
                              {aiResults.length > 1 && (
                                <div className={`py-1.5 text-center text-xs font-medium ${
                                  aiSelectedIdx === idx ? "bg-violet-500 text-white" : "bg-slate-100 text-slate-400"
                                }`}>
                                  결과 {idx + 1} {aiSelectedIdx === idx && "✓"}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                          <Button onClick={() => {
                            const link = document.createElement("a");
                            link.download = "royal-closet-ai-fitting.png";
                            link.href = aiResults[aiSelectedIdx];
                            link.click();
                          }}>
                            <Download className="mr-1.5 h-4 w-4" />
                            저장
                          </Button>
                          <Button variant="outline" onClick={() => {
                            setShareImage(aiResults[aiSelectedIdx]);
                            setShareOpen(true);
                          }}>
                            <Share2 className="mr-1.5 h-4 w-4" />
                            공유
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* === 수동 피팅 모드 (Fabric.js) === */
                  <>
                    {resultReady && (
                      <p className="mb-5 text-center text-xs text-slate-400">
                        <Move className="mr-1 inline h-3 w-3" />
                        드레스를 드래그하여 위치를 조정하세요. 모서리를 잡아 크기와 회전을 변경할 수 있습니다.
                      </p>
                    )}

                    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                      {processing && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white/80">
                          <Spinner className="h-12 w-12" />
                          <p className="text-sm font-medium text-slate-500">{processingMsg}</p>
                          <p className="text-xs text-slate-400">잠시만 기다려주세요</p>
                        </div>
                      )}

                      {resultReady && (
                        <>
                          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2">
                            {selectedDress && (
                              <span className="text-xs font-medium text-rose-500">
                                {selectedDress.name} — {selectedDress.royal.name}
                              </span>
                            )}
                            <div className="flex gap-1.5">
                              <Button variant="ghost" size="sm" onClick={downloadResult}>
                                <Download className="mr-1 h-3.5 w-3.5" />
                                저장
                              </Button>
                              <Button variant="primary" size="sm" onClick={openShare}>
                                <Share2 className="mr-1 h-3.5 w-3.5" />
                                공유
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-2.5">
                            <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">불투명도</span>
                            <input
                              type="range"
                              min={0}
                              max={1}
                              step={0.05}
                              value={dressOpacity}
                              onChange={(e) => setDressOpacity(parseFloat(e.target.value))}
                              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-rose-500"
                            />
                            <span className="text-[11px] font-mono text-slate-400 w-8 text-right">
                              {Math.round(dressOpacity * 100)}%
                            </span>
                          </div>
                        </>
                      )}

                      <div className="flex justify-center bg-slate-50 p-4 overflow-x-auto">
                        <div className="origin-top scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100" style={{ width: 500, height: 650 }}>
                          <canvas ref={canvasRef} className="rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 공통 하단 버튼 */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      initIdRef.current += 1;
                      if (fabricRef.current) {
                        fabricRef.current.dispose();
                        fabricRef.current = null;
                      }
                      dressObjRef.current = null;
                      setStep(1);
                      setProcessing(false);
                      setResultReady(false);
                      setAiResults([]);
                      setAiError(null);
                    }}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    다른 드레스 시도
                  </Button>
                  <Button variant="ghost" onClick={reset}>
                    <RotateCcw className="mr-1.5 h-4 w-4" />
                    처음부터 다시
                  </Button>
                </div>

                <ShareModal
                  open={shareOpen}
                  onClose={() => setShareOpen(false)}
                  imageDataUrl={shareImage}
                  title={selectedDress ? `${selectedDress.name} 가상 피팅` : "가상 피팅"}
                />
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
