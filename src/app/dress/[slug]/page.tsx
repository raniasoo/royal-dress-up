import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Palette, Sparkles, Wand2, Info } from "lucide-react";
import { getDressBySlug, dresses } from "@/data/dresses";
import { Button } from "@/components/ui/Button";
import { DressCard } from "@/components/gallery/DressCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dresses.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dress = getDressBySlug(slug);
  if (!dress) return { title: "드레스를 찾을 수 없습니다" };
  return {
    title: `${dress.name} | The Royal Closet`,
    description: dress.description,
    openGraph: {
      title: `${dress.name} - ${dress.royal.name}`,
      description: dress.description,
      type: "article",
      url: `/dress/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${dress.name} - ${dress.royal.name}`,
      description: dress.description,
    },
    alternates: {
      canonical: `/dress/${slug}`,
    },
  };
}

export default async function DressDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dress = getDressBySlug(slug);
  if (!dress) notFound();

  const relatedDresses = dresses
    .filter((d) => d.slug !== dress.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: dress.name,
    description: dress.description,
    image: `https://royal-dress-up.vercel.app${dress.images.catalog}`,
    brand: { "@type": "Brand", name: dress.royal.name },
    designer: { "@type": "Person", name: dress.designer },
    dateCreated: `${dress.year}`,
    category: dress.category,
    keywords: dress.tags.join(", "),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Back */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        갤러리로 돌아가기
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={dress.images.catalog}
            alt={dress.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6 pt-16">
            <p className="text-sm font-medium text-rose-300">{dress.royal.name}</p>
            <h1 className="text-2xl font-bold text-white">{dress.name}</h1>
            <p className="mt-1 text-sm text-white/70">{dress.nameEn}</p>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
              {dress.royal.name} · {dress.royal.title}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3">
              <Palette className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-[11px] text-slate-400">디자이너</p>
                <p className="text-sm font-medium text-slate-700">{dress.designer}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3">
              <Calendar className="h-4 w-4 text-slate-400" />
              <div>
                <p className="text-[11px] text-slate-400">연도</p>
                <p className="text-sm font-medium text-slate-700">{dress.year}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-[11px] text-slate-400">행사</p>
            <p className="text-sm font-medium text-slate-700">{dress.event}</p>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">{dress.description}</p>

          {dress.funFact && (
            <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
              <div>
                <p className="text-xs font-semibold text-amber-700">알고 계셨나요?</p>
                <p className="mt-1 text-sm text-amber-800">{dress.funFact}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {dress.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Link href={`/try-on?dress=${dress.slug}`} className="flex-1">
              <Button className="w-full" size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                AI 가상 피팅
              </Button>
            </Link>
            <Link href={`/dress-up?dress=${dress.slug}`} className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                <Wand2 className="mr-2 h-4 w-4" />
                아바타에 입혀보기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-16">
        <h2 className="mb-4 text-lg font-bold text-slate-900">다른 드레스 보기</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {relatedDresses.map((d) => (
            <DressCard key={d.slug} dress={d} />
          ))}
        </div>
      </section>
    </div>
  );
}
