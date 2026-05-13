import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Mobee · 나에게 맞는 AI 비서 매칭 플랫폼",
  description:
    "Mobee는 비서 앱이 아닙니다. 검증된 AI 비서를 찾고, 맞춤 제작을 의뢰하고, 바로 구매해 쓰는 매칭 플랫폼. 모두에게 자기에게 맞는 비서를 연결해드려요.",
  keywords: [
    "Mobee",
    "모비",
    "AI 비서 매칭",
    "AI 에이전트 마켓",
    "AI 비서 제작 의뢰",
    "에이전트 플랫폼",
    "자동화",
  ],
  openGraph: {
    title: "Mobee · 나에게 맞는 AI 비서 매칭 플랫폼",
    description: "검증된 AI 비서를 찾고, 만들고, 연결해주는 플랫폼",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-sans">
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
