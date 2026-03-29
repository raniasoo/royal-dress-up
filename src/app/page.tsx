import { Crown, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { DressGrid } from "@/components/gallery/DressGrid";
import { FadeIn } from "@/components/ui/FadeIn";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 to-white px-4 py-16 sm:py-24">
        <FadeIn className="mx-auto max-w-6xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-700">
            <Crown className="h-4 w-4" />
            왕실 드레스 가상 피팅
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            다이애나, 케이트의
            <br />
            <span className="text-rose-600">전설적인 드레스</span>를 입어보세요
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 sm:text-lg">
            영국 왕실의 아이코닉한 드레스를 AI 가상 피팅으로 내 사진에 입혀보거나,
            아바타에 드래그앤드롭으로 꾸며보세요.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/try-on"
              className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
            >
              <Sparkles className="h-4 w-4" />
              AI 가상 피팅
            </Link>
            <Link
              href="/dress-up"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              <Wand2 className="h-4 w-4" />
              아바타 꾸미기
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <FadeIn delay={0.2}>
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            드레스 컬렉션
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            역사적인 왕실 드레스를 둘러보고, 마음에 드는 드레스를 입어보세요
          </p>
          <DressGrid />
        </FadeIn>
      </section>
    </div>
  );
}
