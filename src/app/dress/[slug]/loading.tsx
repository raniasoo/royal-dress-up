import { Spinner } from "@/components/ui/Spinner";

export default function DressLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <Spinner />
      <p className="mt-4 text-sm text-slate-400">드레스 정보를 불러오는 중...</p>
    </div>
  );
}
