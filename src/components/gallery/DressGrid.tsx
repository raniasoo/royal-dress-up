"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { DressCard } from "./DressCard";
import { dresses, royals, eras } from "@/data/dresses";

type ItemTypeFilter = "all" | "clothing" | "accessory";

export function DressGrid() {
  const [search, setSearch] = useState("");
  const [royalFilter, setRoyalFilter] = useState<string | null>(null);
  const [eraFilter, setEraFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<ItemTypeFilter>("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return dresses.filter((d) => {
      if (royalFilter && d.royal.nameEn !== royalFilter) return false;
      if (eraFilter && d.era !== eraFilter) return false;
      if (typeFilter !== "all" && d.itemType !== typeFilter) return false;
      if (q) {
        const haystack = [
          d.name, d.nameEn, d.royal.name, d.royal.nameEn,
          d.designer, ...d.tags,
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, royalFilter, eraFilter, typeFilter]);

  const typeButtons: { key: ItemTypeFilter; label: string }[] = [
    { key: "all", label: "전체" },
    { key: "clothing", label: "의상" },
    { key: "accessory", label: "악세서리" },
  ];

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="드레스, 디자이너, 인물 검색..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-colors"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {/* Category filter */}
        {typeButtons.map((t) => (
          <button
            key={t.key}
            onClick={() => setTypeFilter(t.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              typeFilter === t.key
                ? "bg-violet-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}

        <div className="w-px bg-slate-200 mx-1" />

        {/* Royal filter */}
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

        {/* Era filter */}
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

      {/* Results count */}
      <p className="mb-4 text-xs text-slate-400">{filtered.length}개 아이템</p>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-slate-400">
          <p className="text-lg">해당하는 아이템이 없습니다</p>
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
