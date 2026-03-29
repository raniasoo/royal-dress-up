"use client";

import { useState } from "react";
import { DressCard } from "./DressCard";
import { dresses, royals, eras } from "@/data/dresses";

export function DressGrid() {
  const [royalFilter, setRoyalFilter] = useState<string | null>(null);
  const [eraFilter, setEraFilter] = useState<string | null>(null);

  const filtered = dresses.filter((d) => {
    if (royalFilter && d.royal.nameEn !== royalFilter) return false;
    if (eraFilter && d.era !== eraFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setRoyalFilter(null)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !royalFilter
              ? "bg-rose-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          전체
        </button>
        {royals.map((r) => (
          <button
            key={r.nameEn}
            onClick={() =>
              setRoyalFilter(royalFilter === r.nameEn ? null : r.nameEn)
            }
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              royalFilter === r.nameEn
                ? "bg-rose-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {r.name}
          </button>
        ))}

        <div className="w-px bg-slate-200 mx-1" />

        {eras.map((era) => (
          <button
            key={era}
            onClick={() => setEraFilter(eraFilter === era ? null : era)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              eraFilter === era
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {era}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-slate-400">
          <p className="text-lg">해당하는 드레스가 없습니다</p>
          <p className="mt-1 text-sm">다른 필터를 선택해보세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((dress) => (
            <DressCard key={dress.slug} dress={dress} />
          ))}
        </div>
      )}
    </div>
  );
}
