"use client";

import { useEffect } from "react";
import { Crown } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <Crown className="mb-4 h-12 w-12 text-red-300" />
      <h1 className="text-2xl font-bold text-slate-800">
        문제가 발생했습니다
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        일시적인 오류가 발생했습니다. 다시 시도해주세요.
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex items-center rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
      >
        다시 시도
      </button>
    </div>
  );
}
