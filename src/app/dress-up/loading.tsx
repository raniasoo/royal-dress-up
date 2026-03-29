import { Spinner } from "@/components/ui/Spinner";

export default function DressUpLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <Spinner />
      <p className="mt-4 text-sm text-slate-400">아바타 꾸미기 준비 중...</p>
    </div>
  );
}
