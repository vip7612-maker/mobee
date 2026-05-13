import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { LoginGate } from "@/components/login-gate";
import { Bell, MessageSquare, Search, Lock } from "lucide-react";

const navItems = [
  { label: "에이전트 요청", href: "/request" },
  { label: "에이전트 찾기", href: "/agents" },
  { label: "마켓", href: "/market" },
  { label: "커뮤니티", href: "/community" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-ink-700 hover:text-ink-900 hover:bg-ink-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
          </Button>
          <LoginGate action="알림" description="알림함은 매칭·메시지가 도착할 때 받아볼 수 있어요. 회원만 사용 가능합니다.">
            <span className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-ink-50 text-ink-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
          </LoginGate>
          <LoginGate action="메시지" description="제작자·매칭 상대와의 채팅은 회원만 가능해요.">
            <span className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-ink-50 text-ink-700">
              <MessageSquare className="h-5 w-5" />
            </span>
          </LoginGate>

          <div className="hidden md:flex items-center gap-2 ml-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">로그인</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/signup">회원가입</Link>
            </Button>
            <LoginGate
              action="에이전트 등록"
              description="제작자로 비서를 등록하려면 본인 인증과 정산 정보가 필요해 회원가입 후 진행해주세요."
            >
              <span className="inline-flex items-center justify-center h-9 px-3 rounded-lg bg-brand text-ink-900 font-semibold text-sm hover:bg-brand-400 shadow-sm">
                <Lock className="h-3 w-3 mr-1" />
                에이전트 등록하기
              </span>
            </LoginGate>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
