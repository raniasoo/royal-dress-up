import Link from "next/link";
import { Crown } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2 text-slate-400">
            <Crown className="h-4 w-4" />
            <span className="text-sm font-medium">The Royal Closet</span>
          </div>
          <p className="text-xs text-slate-400 max-w-lg">
            The Royal Closet은 독립 패션 영감 플랫폼이며, 영국 왕실, 모나코 왕실
            또는 특정 패션 브랜드와 공식적인 제휴, 후원 또는 연관 관계가 없습니다.
            모든 컬렉션은 역사적 패션 트렌드에서 영감을 받은 창작물이며,
            엔터테인먼트 목적으로 제공됩니다.
          </p>
          <Link
            href="/privacy"
            className="text-xs text-slate-400 underline hover:text-slate-600 transition-colors"
          >
            개인정보 처리방침
          </Link>
          <p className="text-xs text-slate-300">
            &copy; {new Date().getFullYear()} The Royal Closet. Demo Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
