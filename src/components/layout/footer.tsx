import Link from "next/link";
import { Logo } from "./logo";

const sections = [
  {
    title: "서비스",
    links: [
      { label: "에이전트 요청", href: "/request" },
      { label: "에이전트 찾기", href: "/agents" },
      { label: "마켓", href: "/market" },
      { label: "커뮤니티", href: "/community" },
    ],
  },
  {
    title: "비서 제작자",
    links: [
      { label: "에이전트 등록하기", href: "/agents/register" },
      { label: "제작자 가이드", href: "/guide" },
      { label: "수익화 정책", href: "/revenue" },
      { label: "제작자 센터", href: "/creator" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { label: "공지사항", href: "/notice" },
      { label: "자주 묻는 질문", href: "/faq" },
      { label: "1:1 문의", href: "/inquiry" },
      { label: "신고센터", href: "/report" },
    ],
  },
  {
    title: "회사",
    links: [
      { label: "회사소개", href: "/about" },
      { label: "채용", href: "/careers" },
      { label: "보도자료", href: "/press" },
      { label: "파트너십", href: "/partners" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50/50 mt-20">
      <div className="container py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-ink-500 leading-relaxed">
              따로 또 같이 — 개인의 비서이자,<br />
              모두를 잇는 AI. Mobee.
            </p>
            <p className="mt-3 text-xs text-ink-400 italic">
              Buzzing with Ideas, Together
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm text-ink-900 mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-500 hover:text-ink-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-ink-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-xs text-ink-400 space-y-1">
            <p>(주)Mobee | 대표 김에이아이 | 사업자등록번호 123-45-67890</p>
            <p>서울특별시 강남구 테헤란로 123 | 통신판매업신고 2026-서울강남-0001</p>
            <p>고객센터 1588-0000 | hello@mobee.kr</p>
          </div>
          <div className="flex gap-4 text-xs text-ink-500">
            <Link href="/terms" className="hover:text-ink-900">이용약관</Link>
            <Link href="/privacy" className="hover:text-ink-900 font-semibold">개인정보처리방침</Link>
            <Link href="/youth" className="hover:text-ink-900">청소년보호정책</Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-ink-400">
          © 2026 Mobee Inc. All rights reserved. 🐝
        </p>
      </div>
    </footer>
  );
}
