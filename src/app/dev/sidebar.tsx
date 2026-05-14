"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Lightbulb,
  GitBranch,
  Rocket,
  Users,
  ChevronDown,
  Crown,
  Shield,
  User,
} from "lucide-react";
import { useWorkspace } from "./workspace-context";
import { members, getTeam } from "@/data/workspace";
import { BeeMark } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dev",          label: "대시보드",     icon: LayoutDashboard },
  { href: "/dev/ideas",    label: "아이디어 보드", icon: Lightbulb },
  { href: "/dev/projects", label: "개발 중",      icon: GitBranch },
  { href: "/dev/products", label: "판매 중",      icon: Rocket },
  { href: "/dev/team",     label: "팀·권한",      icon: Users },
];

const roleStyles = {
  master: { badge: "bg-brand text-ink-900", label: "마스터", icon: Crown },
  lead:   { badge: "bg-ink-900 text-brand", label: "팀장",   icon: Shield },
  member: { badge: "bg-ink-100 text-ink-700", label: "팀원", icon: User },
} as const;

export function Sidebar() {
  const pathname = usePathname();
  const { currentUserId, setCurrentUserId, currentUser } = useWorkspace();
  const team = currentUser.teamId ? getTeam(currentUser.teamId) : null;
  const RoleIcon = roleStyles[currentUser.role].icon;

  return (
    <aside className="w-64 shrink-0 bg-ink-900 text-white flex flex-col min-h-[calc(100vh-4rem)]">
      {/* 워크스페이스 헤더 */}
      <div className="p-5 border-b border-white/10">
        <Link href="/dev" className="flex items-center gap-2 group">
          <BeeMark className="h-8 w-8" />
          <div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-brand uppercase">Mobee · Dev</div>
            <div className="font-bold text-white">개발자 워크스페이스</div>
          </div>
        </Link>
      </div>

      {/* 현재 사용자 (시뮬레이션 전환) */}
      <div className="p-4 border-b border-white/10">
        <div className="text-[10px] font-mono tracking-widest text-white/40 mb-2">CURRENT USER</div>
        <div className="relative">
          <select
            value={currentUserId}
            onChange={(e) => setCurrentUserId(e.target.value)}
            className="appearance-none w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg pl-3 pr-9 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand"
            aria-label="시뮬레이션 사용자 전환"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id} className="bg-ink-900 text-white">
                {m.avatar} {m.name} · {roleStyles[m.role].label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold", roleStyles[currentUser.role].badge)}>
            <RoleIcon className="h-3 w-3" />
            {roleStyles[currentUser.role].label}
          </span>
          {team && (
            <span className="text-[10px] text-white/60">
              {team.emoji} {team.name}
            </span>
          )}
        </div>
        <div className="mt-2 text-[10px] text-white/40 font-mono truncate">
          {currentUser.email}
        </div>
      </div>

      {/* 메뉴 */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dev" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-brand text-ink-900"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* 푸터 */}
      <div className="p-4 border-t border-white/10 text-[10px] text-white/40 leading-relaxed">
        <div>RBAC 데모 · 마스터/팀장/팀원 권한 시뮬레이션</div>
        <Link href="/" className="text-white/60 hover:text-white underline-offset-2 hover:underline mt-1 inline-block">
          ← 홈으로
        </Link>
      </div>
    </aside>
  );
}
