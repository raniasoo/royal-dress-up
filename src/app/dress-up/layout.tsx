import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "아바타 꾸미기 | Royal Dress-Up",
  description: "드래그앤드롭으로 왕실 드레스를 아바타에 입혀보세요",
};

export default function DressUpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
