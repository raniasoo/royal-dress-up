import { Spinner } from "@/components/ui/Spinner";

export default function TryOnLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <Spinner />
      <p className="mt-4 text-sm text-slate-400">AI 가상 피팅 준비 중...</p>
    </div>
  );
}
