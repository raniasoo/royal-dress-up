"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Link2, Check, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./Button";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  imageDataUrl: string | null;
  title?: string;
}

export function ShareModal({ open, onClose, imageDataUrl, title = "내 왕실 드레스업" }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  function handleDownload() {
    if (!imageDataUrl) return;
    const link = document.createElement("a");
    link.download = "the-royal-closet.png";
    link.href = imageDataUrl;
    link.click();
    toast.success("이미지가 저장되었습니다");
  }

  async function handleCopyImage() {
    if (!imageDataUrl) return;
    try {
      const res = await fetch(imageDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      toast.success("이미지가 클립보드에 복사되었습니다");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("복사에 실패했습니다. 이미지를 다운로드해주세요.");
    }
  }

  function shareToTwitter() {
    const text = encodeURIComponent(`${title} 👑✨ #RoyalDressUp #왕실드레스`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }

  function shareToKakao() {
    const text = encodeURIComponent(`${title} - The Royal Closet으로 왕실 드레스를 입어봤어요! 👑`);
    window.open(`https://story.kakao.com/share?url=${encodeURIComponent(window.location.href)}&text=${text}`, "_blank");
  }

  async function handleNativeShare() {
    if (!navigator.share) {
      toast.error("이 브라우저에서는 공유가 지원되지 않습니다");
      return;
    }
    try {
      const shareData: ShareData = {
        title: "The Royal Closet",
        text: `${title} 👑✨`,
        url: window.location.href,
      };
      if (imageDataUrl) {
        const res = await fetch(imageDataUrl);
        const blob = await res.blob();
        const file = new File([blob], "the-royal-closet.png", { type: "image/png" });
        if (navigator.canShare?.({ files: [file] })) {
          shareData.files = [file];
        }
      }
      await navigator.share(shareData);
    } catch {
      // User cancelled
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">저장 & 공유</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {imageDataUrl && (
              <div className="mb-4 overflow-hidden rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageDataUrl}
                  alt="미리보기"
                  className="h-48 w-full object-contain bg-slate-50"
                />
              </div>
            )}

            <div className="space-y-2">
              <Button className="w-full" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                이미지 저장 (PNG)
              </Button>

              <Button variant="outline" className="w-full" onClick={handleCopyImage}>
                {copied ? (
                  <><Check className="mr-2 h-4 w-4" /> 복사됨!</>
                ) : (
                  <><Link2 className="mr-2 h-4 w-4" /> 클립보드에 복사</>
                )}
              </Button>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="mb-3 text-xs font-medium text-slate-400">SNS 공유</p>
              <div className="flex gap-2">
                <button
                  onClick={shareToTwitter}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1DA1F2] px-3 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X (Twitter)
                </button>
                <button
                  onClick={shareToKakao}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#FEE500] px-3 py-2.5 text-xs font-semibold text-[#3C1E1E] transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4" />
                  카카오스토리
                </button>
              </div>
              <button
                onClick={handleNativeShare}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                기기 공유 (더보기...)
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
