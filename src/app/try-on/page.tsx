"use client";

import { useState, useCallback, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Upload, ChevronRight, ChevronLeft, Download, RotateCcw, Share2, ShieldCheck, Move, ZoomIn, ZoomOut } from "lucide-react";
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

  function goToResult(useAi: boolean) {
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
      // === AI 피팅 모드 ===
      (async () => {
        try {
          setProcessingMsg("사진을 업로드하고 있습니다...");
          const photoRes = await fetch(photo!);
          const photoBlob = await photoRes.blob();
          const photoFile = new File([photoBlob], "photo.jpg", { type: photoBlob.type });
          const photoUrl = await fal.storage.upload(photoFile);
          if (!isCurrent()) return;

          const garmentFullUrl = `${window.location.origin}${selectedDress!.images.catalog}`;

          setProcessingMsg("AI가 드레스를 피팅하고 있습니다... (15~30초 소요)");
          const result = await fal.subscribe("fal-ai/fashn/tryon/v1.6", {
            input: {
              model_image: photoUrl,
              garment_image: garmentFullUrl,
              category: "auto",
              mode: "quality",
              num_samples: 2,
            },
            onQueueUpdate: (update) => {
              if (!isCurrent()) return;
              if (update.status === "IN_QUEUE") {
                setProcessingMsg(`대기열 ${update.queue_position ?? "?"}번째...`);
              } else if (update.status === "IN_PROGRESS") {
                setProcessingMsg("AI가 피팅 중입니다...");
              }
            },
          });

          if (!isCurrent()) return;
          const data = result.data as { images?: { url: string }[] };

          if (!data.images || data.images.length === 0) {
            throw new Error("이미지 생성 실패");
          }

          setAiResults(data.images.map((img) => img.url));
          setAiSelectedIdx(0);
          setProcessing(false);
          setResultReady(true);
        } catch (err: unknown) {
          if (!isCurrent()) return;
          const msg = err instanceof Error ? err.message : "알 수 없는 오류";
          setAiError(msg);
          setProcessing(false);
          setResultReady(true);
        }
      })();
    } else {
      // === 수동 Fabric.js 모드 ===
      let canvas: import("fabric").Canvas | null = null;

      (async () => {
        // 캔버스 DOM이 렌더링될 때까지 짧은 대기
        await new Promise((r) => setTimeout(r, 100));
        if (!isCurrent() || !canvasRef.current) return;

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
                  <div className="aspect-square bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dress.images.catalog}
                      alt={dress.name}
                      className="h-full w-full object-cover"
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
              <p className="text-[11px] text-slate-400">수동: 드레스를 직접 배치 | AI: Fashn AI가 자동으로 피팅</p>
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
                        <div className="flex justify-center gap-3">
                          <Button onClick={() => goToResult(false)}>
                            수동 피팅으로 전환
                          </Button>
                          <Button variant="ghost" onClick={() => goToResult(true)}>
                            다시 시도
                          </Button>
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
                      if (fabricRef.current) {
                        fabricRef.current.dispose();
                        fabricRef.current = null;
                      }
                      dressObjRef.current = null;
                      setStep(1);
                      setResultReady(false);
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
