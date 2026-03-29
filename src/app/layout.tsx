import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Royal Dress-Up | 왕실 드레스 가상 피팅",
  description:
    "영국 왕실의 유명 드레스를 가상으로 입어보세요. AI 가상 피팅과 아바타 드레스업을 경험해보세요.",
  openGraph: {
    title: "Royal Dress-Up | 왕실 드레스 가상 피팅",
    description:
      "다이애나, 케이트의 유명 드레스를 가상으로 입어보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
