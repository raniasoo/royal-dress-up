"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Upload, ChevronRight, ChevronLeft, Download, RotateCcw } from "lucide-react";
import { dresses, getDressBySlug } from "@/data/dresses";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

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
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [resultReady, setResultReady] = useState(false);

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

  function goToResult() {
    setStep(2);
    setProcessing(true);
    setResultReady(false);
    setTimeout(() => {
      setProcessing(false);
      setResultReady(true);
    }, 2500);
  }

  function reset() {
    setStep(0);
    setPhoto(null);
    setSelectedSlug(null);
    setProcessing(false);
    setResultReady(false);
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

            {!photo ? (
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
              {dresses.map((dress) => (
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

            <div className="mt-8 flex justify-center gap-3">
              <Button variant="outline" onClick={() => setStep(0)}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                이전
              </Button>
              <Button
                size="lg"
                disabled={!selectedSlug}
                onClick={goToResult}
              >
                피팅 시작
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
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
            {processing ? (
              <div className="flex flex-col items-center gap-4 py-20">
                <Spinner className="h-12 w-12" />
                <p className="text-sm font-medium text-slate-500">
                  AI가 드레스를 피팅하고 있습니다...
                </p>
                <p className="text-xs text-slate-400">잠시만 기다려주세요</p>
              </div>
            ) : (
              <div className="mx-auto max-w-md text-center">
                <h2 className="mb-6 text-xl font-bold text-slate-900">
                  피팅 결과
                </h2>
                <div className="relative overflow-hidden rounded-xl border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo!}
                    alt="피팅 결과"
                    className="max-h-96 w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                    <p className="rounded-lg bg-white/90 px-4 py-2 text-sm font-bold text-slate-800">
                      AI 피팅 결과 (데모)
                    </p>
                    {selectedDress && (
                      <p className="mt-2 rounded-md bg-rose-600/90 px-3 py-1 text-xs font-medium text-white">
                        {selectedDress.name} — {selectedDress.royal.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button variant="outline" disabled>
                    <Download className="mr-1.5 h-4 w-4" />
                    다운로드 (데모)
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setStep(1);
                      setResultReady(false);
                    }}
                  >
                    다른 드레스 시도
                  </Button>
                  <Button variant="ghost" onClick={reset}>
                    <RotateCcw className="mr-1.5 h-4 w-4" />
                    처음부터 다시
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
