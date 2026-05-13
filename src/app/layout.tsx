import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Mobee · 모두의 AI 비서",
  description:
    "따로 또 같이 — 개인의 비서이자, 모두를 잇는 비서. 강사·교육자·소규모 팀을 위한 AI 비서 + 협업 허브 Mobee.",
  keywords: [
    "Mobee",
    "모비",
    "AI 비서",
    "AI 에이전트",
    "협업 허브",
    "강사",
    "교육자",
    "온라인 교무실",
    "자동화",
  ],
  openGraph: {
    title: "Mobee · 모두의 AI 비서",
    description: "Buzzing with Ideas, Together — 부지런한 꿀벌이 만드는 변화",
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
