import Link from "next/link";
import { Crown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <Crown className="mb-4 h-12 w-12 text-slate-300" />
      <h1 className="text-2xl font-bold text-slate-800">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
      >
        갤러리로 돌아가기
      </Link>
    </div>
  );
}
