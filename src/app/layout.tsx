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
  metadataBase: new URL("https://royal-dress-up.vercel.app"),
  title: "The Royal Closet | 왕실 드레스 가상 피팅",
  description:
    "다이애나, 케이트, 메건, 그레이스 켈리의 아이코닉한 왕실 드레스를 AI 가상 피팅으로 입어보세요. 31개 이상의 역사적인 왕실 의상과 악세서리 컬렉션.",
  openGraph: {
    title: "The Royal Closet | 왕실 드레스 가상 피팅",
    description: "다이애나, 케이트, 메건의 전설적인 드레스를 AI로 입어보세요",
    siteName: "The Royal Closet",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Royal Closet | 왕실 드레스 가상 피팅",
    description: "다이애나, 케이트, 메건의 전설적인 드레스를 AI로 입어보세요",
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
