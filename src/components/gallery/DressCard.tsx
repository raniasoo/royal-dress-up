"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Dress } from "@/types";

interface DressCardProps {
  dress: Dress;
}

export function DressCard({ dress }: DressCardProps) {
  return (
    <Link href={`/dress/${dress.slug}`}>
      <Card hover>
        <div className="relative aspect-[3/4] bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dress.images.catalog}
            alt={dress.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
            <p className="text-xs font-medium text-rose-300">
              {dress.royal.name}
            </p>
            <h3 className="text-sm font-bold text-white">{dress.name}</h3>
          </div>
        </div>
        <div className="p-3">
          <p className="text-xs text-slate-500">
            {dress.designer} &middot; {dress.year}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {dress.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
