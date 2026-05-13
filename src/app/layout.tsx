import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "모두의비서 - 모든 영역에 나만의 AI 비서를",
  description: "AI 에이전트 매칭 플랫폼. 업무, 마케팅, CS, 분석까지 - 내게 꼭 맞는 AI 비서를 찾고 의뢰하세요.",
  keywords: ["AI 에이전트", "AI 비서", "자동화", "n8n", "GPT", "챗봇", "업무자동화"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans">
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
