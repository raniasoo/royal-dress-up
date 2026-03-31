"use client";

import { useState, useEffect } from "react";
import { Crown } from "lucide-react";
import Link from "next/link";

const AGE_GATE_KEY = "royal-closet-age-verified";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(AGE_GATE_KEY);
    setVerified(stored === "true");
  }, []);

  function handleVerify() {
    sessionStorage.setItem(AGE_GATE_KEY, "true");
    setVerified(true);
  }

  // Loading state
  if (verified === null) return null;

  if (verified) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="mx-4 w-full max-w-sm text-center">
        <Crown className="mx-auto mb-4 h-10 w-10 text-rose-600" />
        <h1 className="text-xl font-bold text-slate-900">The Royal Closet</h1>
        <p className="mt-2 text-sm text-slate-500">
          왕실 드레스 가상 피팅 & 아바타 꾸미기
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-base font-semibold text-slate-900">
            연령 확인
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            본 서비스는 만 13세 이상을 대상으로 합니다.
          </p>
          <button
            onClick={handleVerify}
            className="mt-5 w-full rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
          >
            만 13세 이상입니다
          </button>
          <p className="mt-3 text-xs text-slate-400">
            계속 진행하면{" "}
            <Link href="/terms" className="underline hover:text-slate-600">
              이용약관
            </Link>{" "}
            및{" "}
            <Link href="/privacy" className="underline hover:text-slate-600">
              개인정보 처리방침
            </Link>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
