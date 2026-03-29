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
          <p className="text-xs text-slate-400 max-w-md">
            본 서비스는 엔터테인먼트 목적으로 제공됩니다. 드레스 이미지는 공개된
            보도 자료를 기반으로 제작되었으며, 해당 디자이너 및 왕실과 직접적인
            관련이 없습니다.
          </p>
          <p className="text-xs text-slate-300">
            &copy; {new Date().getFullYear()} The Royal Closet. Demo Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
