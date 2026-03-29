import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 가상 피팅 | Royal Dress-Up",
  description: "내 사진에 왕실 드레스를 AI로 입혀보세요",
};

export default function TryOnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
