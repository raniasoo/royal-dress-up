"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { RotateCcw, Download, Trash2 } from "lucide-react";
import { dresses, getDressBySlug } from "@/data/dresses";
import { Button } from "@/components/ui/Button";
import type { Dress } from "@/types";

const DRESS_COLORS: Record<string, string> = {
  "diana-revenge-dress": "#1a1a1a",
  "diana-wedding-dress": "#faf5ef",
  "diana-travolta-dress": "#1a2744",
  "kate-engagement-dress": "#2b5ea7",
  "kate-wedding-dress": "#fffef8",
  "kate-red-korea": "#c4302b",
  "elizabeth-coronation": "#f5f0e8",
};

function getDressColor(slug: string) {
  return DRESS_COLORS[slug] ?? "#d4a0a0";
}

function getTextColor(slug: string) {
  const dark = ["diana-revenge-dress", "diana-travolta-dress", "kate-engagement-dress", "kate-red-korea"];
  return dark.includes(slug) ? "#ffffff" : "#333333";
}

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

  useEffect(() => {
    const dressParam = searchParams.get("dress");
    if (dressParam && getDressBySlug(dressParam)) {
      setSelectedSlug(dressParam);
    }
  }, [searchParams]);

  const saveHistory = useCallback(() => {
    if (!fabricRef.current) return;
    setHistory((prev) => [...prev, JSON.stringify(fabricRef.current!.toJSON())]);
  }, []);

  // Initialize canvas
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

      // Draw avatar silhouette
      const head = new fabric.Ellipse({
        rx: 35,
        ry: 42,
        left: 215,
        top: 60,
        fill: "#e2e8f0",
        stroke: "#cbd5e1",
        strokeWidth: 2,
        selectable: false,
        evented: false,
      });

      const body = new fabric.Rect({
        left: 175,
        top: 150,
        width: 150,
        height: 250,
        rx: 20,
        ry: 20,
        fill: "#e2e8f0",
        stroke: "#cbd5e1",
        strokeWidth: 2,
        selectable: false,
        evented: false,
      });

      const leftArm = new fabric.Rect({
        left: 130,
        top: 170,
        width: 40,
        height: 180,
        rx: 20,
        ry: 20,
        fill: "#e2e8f0",
        stroke: "#cbd5e1",
        strokeWidth: 2,
        selectable: false,
        evented: false,
      });

      const rightArm = new fabric.Rect({
        left: 330,
        top: 170,
        width: 40,
        height: 180,
        rx: 20,
        ry: 20,
        fill: "#e2e8f0",
        stroke: "#cbd5e1",
        strokeWidth: 2,
        selectable: false,
        evented: false,
      });

      const skirt = new fabric.Rect({
        left: 155,
        top: 380,
        width: 190,
        height: 220,
        rx: 10,
        ry: 10,
        fill: "#e2e8f0",
        stroke: "#cbd5e1",
        strokeWidth: 2,
        selectable: false,
        evented: false,
      });

      canvas.add(head, body, leftArm, rightArm, skirt);
      canvas.renderAll();
      setReady(true);

      // Save initial state
      setHistory([JSON.stringify(canvas.toJSON())]);
    }

    init();

    return () => {
      if (canvas) canvas.dispose();
    };
  }, []);

  async function addDressToCanvas(dress: Dress) {
    const canvas = fabricRef.current;
    if (!canvas) return;

    saveHistory();

    const fabric = await import("fabric");
    const color = getDressColor(dress.slug);
    const textColor = getTextColor(dress.slug);

    const dressRect = new fabric.Rect({
      left: 180,
      top: 160,
      width: 140,
      height: 230,
      rx: 12,
      ry: 12,
      fill: color,
      opacity: 0.85,
      stroke: textColor === "#ffffff" ? "#ffffff30" : "#00000020",
      strokeWidth: 2,
    });

    const label = new fabric.FabricText(dress.name, {
      left: 195,
      top: 260,
      fontSize: 14,
      fontWeight: "bold",
      fill: textColor,
    });

    const group = new fabric.Group([dressRect, label], {
      left: 170,
      top: 150,
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
    canvas.loadFromJSON(JSON.parse(prev)).then(() => {
      canvas.renderAll();
    });
  }

  function clearCanvas() {
    const canvas = fabricRef.current;
    if (!canvas || history.length === 0) return;

    saveHistory();
    const initial = history[0];
    canvas.loadFromJSON(JSON.parse(initial)).then(() => {
      canvas.renderAll();
    });
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
              </div>
            </div>
            <div className="flex justify-center bg-slate-50 p-4">
              <canvas
                ref={canvasRef}
                className="rounded-lg border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Dress selector */}
        <div className="w-full lg:w-72">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-bold text-slate-700">드레스 선택</h2>
              <p className="text-xs text-slate-400">클릭하면 아바타에 입혀집니다</p>
            </div>
            <div className="max-h-[520px] overflow-y-auto p-2">
              {dresses.map((dress, i) => (
                <motion.button
                  key={dress.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    setSelectedSlug(dress.slug);
                    addDressToCanvas(dress);
                  }}
                  className={`mb-1.5 flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors ${
                    selectedSlug === dress.slug
                      ? "bg-rose-50 ring-1 ring-rose-300"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div
                    className="h-10 w-10 shrink-0 rounded-lg border border-slate-200"
                    style={{ backgroundColor: getDressColor(dress.slug) }}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {dress.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {dress.royal.name} · {dress.year}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
