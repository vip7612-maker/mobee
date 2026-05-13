import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Search } from "lucide-react";

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
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <MessageSquare className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center gap-2 ml-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">로그인</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/signup">회원가입</Link>
            </Button>
            <Button variant="brand" size="sm" asChild>
              <Link href="/agents/register">에이전트 등록하기</Link>
            </Button>
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
