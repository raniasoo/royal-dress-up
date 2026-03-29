"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw, Download, Trash2, Crown, Shirt, Share2 } from "lucide-react";
import { dresses, getClothing, getAccessories, getDressBySlug } from "@/data/dresses";
import { Button } from "@/components/ui/Button";
import { ShareModal } from "@/components/ui/ShareModal";
import type { Dress, ItemCategory } from "@/types";

const ITEM_COLORS: Record<string, string> = {
  "diana-revenge-dress": "#1a1a1a",
  "diana-wedding-dress": "#faf5ef",
  "diana-travolta-dress": "#1a2744",
  "kate-engagement-dress": "#2b5ea7",
  "kate-wedding-dress": "#fffef8",
  "kate-red-korea": "#c4302b",
  "elizabeth-coronation": "#f5f0e8",
  "spencer-tiara": "#d4af37",
  "cambridge-lovers-knot-tiara": "#d4af37",
  "diana-pearl-choker": "#f0ead6",
  "kate-sapphire-earrings": "#1a3a6a",
  "diana-clutch-bag": "#2d2d2d",
  "elizabeth-coronation-gloves": "#fffefa",
  "kate-jimmy-choo-pumps": "#e8d5c0",
};

function getItemColor(slug: string) {
  return ITEM_COLORS[slug] ?? "#d4a0a0";
}

function getTextColor(slug: string) {
  const dark = [
    "diana-revenge-dress", "diana-travolta-dress", "kate-engagement-dress",
    "kate-red-korea", "kate-sapphire-earrings", "diana-clutch-bag",
  ];
  return dark.includes(slug) ? "#ffffff" : "#333333";
}

const CATEGORY_TABS = [
  { key: "clothing" as const, label: "드레스", icon: Shirt },
  { key: "accessory" as const, label: "악세서리", icon: Crown },
];

const ACCESSORY_SUBTABS: { key: ItemCategory; label: string }[] = [
  { key: "tiara", label: "티아라" },
  { key: "necklace", label: "목걸이" },
  { key: "earrings", label: "귀걸이" },
  { key: "bag", label: "백" },
  { key: "gloves", label: "장갑" },
  { key: "shoes", label: "구두" },
];

export default function DressUpPage() {
  return (
    <Suspense>
      <DressUpContent />
    </Suspense>
  );
}

function DressUpContent() {
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<import("fabric").Canvas | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [activeTab, setActiveTab] = useState<"clothing" | "accessory">("clothing");
  const [accessoryFilter, setAccessoryFilter] = useState<ItemCategory | "all">("all");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);

  useEffect(() => {
    const dressParam = searchParams.get("dress");
    if (dressParam && getDressBySlug(dressParam)) {
      setSelectedSlug(dressParam);
      const item = getDressBySlug(dressParam);
      if (item?.itemType === "accessory") setActiveTab("accessory");
    }
  }, [searchParams]);

  const saveHistory = useCallback(() => {
    if (!fabricRef.current) return;
    setHistory((prev) => [...prev, JSON.stringify(fabricRef.current!.toJSON())]);
  }, []);

  useEffect(() => {
    let canvas: import("fabric").Canvas | null = null;

    async function init() {
      const fabric = await import("fabric");
      if (!canvasRef.current) return;

      canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 700,
        backgroundColor: "#f8fafc",
        selection: true,
      });
      fabricRef.current = canvas;

      const head = new fabric.Ellipse({
        rx: 35, ry: 42, left: 215, top: 60,
        fill: "#e2e8f0", stroke: "#cbd5e1", strokeWidth: 2,
        selectable: false, evented: false,
      });
      const body = new fabric.Rect({
        left: 175, top: 150, width: 150, height: 250, rx: 20, ry: 20,
        fill: "#e2e8f0", stroke: "#cbd5e1", strokeWidth: 2,
        selectable: false, evented: false,
      });
      const leftArm = new fabric.Rect({
        left: 130, top: 170, width: 40, height: 180, rx: 20, ry: 20,
        fill: "#e2e8f0", stroke: "#cbd5e1", strokeWidth: 2,
        selectable: false, evented: false,
      });
      const rightArm = new fabric.Rect({
        left: 330, top: 170, width: 40, height: 180, rx: 20, ry: 20,
        fill: "#e2e8f0", stroke: "#cbd5e1", strokeWidth: 2,
        selectable: false, evented: false,
      });
      const skirt = new fabric.Rect({
        left: 155, top: 380, width: 190, height: 220, rx: 10, ry: 10,
        fill: "#e2e8f0", stroke: "#cbd5e1", strokeWidth: 2,
        selectable: false, evented: false,
      });

      canvas.add(head, body, leftArm, rightArm, skirt);
      canvas.renderAll();
      setReady(true);
      setHistory([JSON.stringify(canvas.toJSON())]);
    }

    init();
    return () => { if (canvas) canvas.dispose(); };
  }, []);

  async function addItemToCanvas(item: Dress) {
    const canvas = fabricRef.current;
    if (!canvas) return;

    saveHistory();
    const fabric = await import("fabric");
    const color = getItemColor(item.slug);
    const textColor = getTextColor(item.slug);

    const pos = item.canvasPosition ?? { top: 160, left: 180, width: 140, height: 230 };

    const rect = new fabric.Rect({
      left: 0, top: 0,
      width: pos.width, height: pos.height,
      rx: item.itemType === "accessory" ? 8 : 12,
      ry: item.itemType === "accessory" ? 8 : 12,
      fill: color,
      opacity: 0.85,
      stroke: textColor === "#ffffff" ? "#ffffff30" : "#00000020",
      strokeWidth: 2,
    });

    const label = new fabric.FabricText(item.name, {
      left: 4, top: pos.height / 2 - 7,
      fontSize: item.itemType === "accessory" ? 11 : 14,
      fontWeight: "bold",
      fill: textColor,
    });

    const group = new fabric.Group([rect, label], {
      left: pos.left,
      top: pos.top,
    });

    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.renderAll();
  }

  function undo() {
    const canvas = fabricRef.current;
    if (!canvas || history.length <= 1) return;
    const prev = history[history.length - 2];
    setHistory((h) => h.slice(0, -1));
    canvas.loadFromJSON(JSON.parse(prev)).then(() => canvas.renderAll());
  }

  function clearCanvas() {
    const canvas = fabricRef.current;
    if (!canvas || history.length === 0) return;
    saveHistory();
    canvas.loadFromJSON(JSON.parse(history[0])).then(() => canvas.renderAll());
  }

  function downloadCanvas() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({ format: "png", multiplier: 2 });
    const link = document.createElement("a");
    link.download = "royal-dress-up.png";
    link.href = dataUrl;
    link.click();
  }

  function openShare() {
    const canvas = fabricRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({ format: "png", multiplier: 2 });
    setShareImage(dataUrl);
    setShareOpen(true);
  }

  const items = activeTab === "clothing"
    ? getClothing()
    : accessoryFilter === "all"
      ? getAccessories()
      : getAccessories().filter((a) => a.category === accessoryFilter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-xl font-bold text-slate-900">아바타 꾸미기</h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Canvas */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2">
              <span className="text-xs font-medium text-slate-400">캔버스</span>
              <div className="flex gap-1.5">
                <Button variant="ghost" size="sm" onClick={undo} disabled={history.length <= 1}>
                  <RotateCcw className="mr-1 h-3.5 w-3.5" />
                  실행 취소
                </Button>
                <Button variant="ghost" size="sm" onClick={clearCanvas}>
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  초기화
                </Button>
                <Button variant="ghost" size="sm" onClick={downloadCanvas}>
                  <Download className="mr-1 h-3.5 w-3.5" />
                  저장
                </Button>
                <Button variant="primary" size="sm" onClick={openShare}>
                  <Share2 className="mr-1 h-3.5 w-3.5" />
                  공유
                </Button>
              </div>
            </div>
            <div className="flex justify-center bg-slate-50 p-4">
              <canvas ref={canvasRef} className="rounded-lg border border-slate-200" />
            </div>
          </div>
        </div>

        {/* Item selector */}
        <div className="w-full lg:w-80">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Main tabs */}
            <div className="flex border-b border-slate-100">
              {CATEGORY_TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setAccessoryFilter("all"); }}
                    className={`flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors ${
                      activeTab === tab.key
                        ? "border-b-2 border-rose-500 text-rose-600"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Accessory sub-filters */}
            {activeTab === "accessory" && (
              <div className="flex flex-wrap gap-1 border-b border-slate-100 px-3 py-2">
                <button
                  onClick={() => setAccessoryFilter("all")}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                    accessoryFilter === "all"
                      ? "bg-rose-600 text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  전체
                </button>
                {ACCESSORY_SUBTABS.map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => setAccessoryFilter(sub.key)}
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                      accessoryFilter === sub.key
                        ? "bg-rose-600 text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}

            {/* Item list */}
            <div className="max-h-[480px] overflow-y-auto p-2">
              {items.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-400">
                  해당 카테고리에 아이템이 없습니다
                </p>
              ) : (
                items.map((item, i) => (
                  <motion.button
                    key={item.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => {
                      setSelectedSlug(item.slug);
                      addItemToCanvas(item);
                    }}
                    className={`mb-1.5 flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors ${
                      selectedSlug === item.slug
                        ? "bg-rose-50 ring-1 ring-rose-300"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className="h-10 w-10 shrink-0 rounded-lg border border-slate-200"
                      style={{ backgroundColor: getItemColor(item.slug) }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.royal.name} · {item.year}
                      </p>
                    </div>
                    {item.itemType === "accessory" && (
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-medium text-amber-700">
                        {item.category === "tiara" ? "👑" :
                         item.category === "necklace" ? "📿" :
                         item.category === "earrings" ? "💎" :
                         item.category === "bag" ? "👜" :
                         item.category === "gloves" ? "🧤" :
                         item.category === "shoes" ? "👠" : "✨"}
                      </span>
                    )}
                  </motion.button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        imageDataUrl={shareImage}
        title="내 왕실 드레스업"
      />
    </div>
  );
}
