"use client";

import Link from "next/link";
import { Lightbulb, GitBranch, Rocket, Users, ArrowRight, TrendingUp, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "./workspace-context";
import { ideas, projects, products, teams, members, getTeam, getMember } from "@/data/workspace";
import { formatPrice, formatCount } from "@/lib/utils";

export default function DevDashboard() {
  const { currentUser } = useWorkspace();

  // 권한·역할에 따른 스코프 필터링
  const myScope = currentUser.role === "master"
    ? "전체 조직"
    : currentUser.role === "lead"
      ? `${getTeam(currentUser.teamId)?.name ?? "내 팀"}`
      : `${getMember(currentUser.managedBy ?? "")?.name ?? "내 팀장"} 산하`;

  const monthlyRevenue = products.reduce((s, p) => s + p.monthlyRevenue, 0);
  const totalRevenue = products.reduce((s, p) => s + p.totalRevenue, 0);
  const activeProjects = projects.filter((p) => p.stage !== "review").length;

  const myIdeas = ideas.filter((i) => i.proposerId === currentUser.id);
  const myProjects = projects.filter((p) =>
    p.leadId === currentUser.id || p.memberIds.includes(currentUser.id)
  );
  const myProducts = products.filter((p) =>
    p.leadId === currentUser.id || currentUser.role === "master"
  );

  return (
    <div className="p-8 max-w-7xl">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="text-xs font-mono tracking-widest text-ink-400 mb-1">DEV WORKSPACE</div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900">
          안녕하세요, {currentUser.name}님 {currentUser.avatar}
        </h1>
        <p className="text-ink-500 mt-1 text-sm">
          현재 보이는 범위: <strong className="text-ink-900">{myScope}</strong>
        </p>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5 bg-brand border-0">
          <div className="flex items-center justify-between mb-2">
            <Lightbulb className="h-5 w-5 text-ink-900" />
            <Badge variant="default" className="text-[10px]">아이디어</Badge>
          </div>
          <div className="text-3xl font-extrabold text-ink-900">{ideas.length}</div>
          <div className="text-xs text-ink-900/70 mt-1">
            {ideas.filter((i) => i.status === "backlog").length} 백로그 · {ideas.filter((i) => i.status === "review").length} 검토중
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <GitBranch className="h-5 w-5 text-ink-700" />
            <Badge variant="soft" className="text-[10px]">개발 중</Badge>
          </div>
          <div className="text-3xl font-extrabold text-ink-900">{activeProjects}</div>
          <div className="text-xs text-ink-500 mt-1">
            평균 진행률 {Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length)}%
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <Rocket className="h-5 w-5 text-ink-700" />
            <Badge variant="soft" className="text-[10px]">판매 중</Badge>
          </div>
          <div className="text-3xl font-extrabold text-ink-900">{products.filter((p) => p.status === "live").length}</div>
          <div className="text-xs text-ink-500 mt-1">
            구독 {formatCount(products.reduce((s, p) => s + p.subscribers, 0))}명
          </div>
        </Card>
        <Card className="p-5 bg-ink-900 text-white border-0">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-5 w-5 text-brand" />
            <Badge variant="brand" className="text-[10px]">월 매출</Badge>
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-brand">{formatPrice(monthlyRevenue)}원</div>
          <div className="text-xs text-white/60 mt-1">
            누적 {formatPrice(totalRevenue / 10000)}만원
          </div>
        </Card>
      </div>

      {/* 내 활동 / 팀 활동 요약 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-ink-900">내가 관여한 작업</h2>
            <Badge variant="soft">{myIdeas.length + myProjects.length + myProducts.length}건</Badge>
          </div>
          <div className="space-y-3 text-sm">
            <Row icon={<Lightbulb className="h-4 w-4" />} label="발의한 아이디어" value={myIdeas.length} href="/dev/ideas" />
            <Row icon={<GitBranch className="h-4 w-4" />} label="참여 중 프로젝트" value={myProjects.length} href="/dev/projects" />
            <Row icon={<Rocket className="h-4 w-4" />} label="담당 판매 제품" value={myProducts.length} href="/dev/products" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-ink-900">팀 분포</h2>
            <Link href="/dev/team" className="text-xs font-semibold text-ink-700 hover:text-ink-900 inline-flex items-center gap-1">
              팀·권한 관리 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {teams.map((t) => {
              const teamProjects = projects.filter((p) => p.teamId === t.id);
              const teamRevenue = products.filter((p) => p.teamId === t.id).reduce((s, p) => s + p.monthlyRevenue, 0);
              return (
                <div key={t.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-ink-50">
                  <span className="text-2xl">{t.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-ink-900">{t.name}</div>
                    <div className="text-[11px] text-ink-500">
                      팀원 {t.memberIds.length + 1}명 · 프로젝트 {teamProjects.length}개
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-ink-900">{formatPrice(teamRevenue / 10000)}만</div>
                    <div className="text-[10px] text-ink-400">월 매출</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* 빠른 진입 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLink href="/dev/ideas" icon={<Lightbulb className="h-5 w-5" />} title="아이디어 게시" desc="새 비서 아이디어 등록·논의" />
        <QuickLink href="/dev/projects" icon={<GitBranch className="h-5 w-5" />} title="개발 진행" desc="담당자·마일스톤 추적" />
        <QuickLink href="/dev/products" icon={<Rocket className="h-5 w-5" />} title="판매 분석" desc="매출·구독자·평점" />
        <QuickLink href="/dev/team" icon={<Users className="h-5 w-5" />} title="팀·권한" desc="팀원 추가·역할·권한 설정" />
      </div>
    </div>
  );
}

function Row({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: number; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-ink-50">
      <span className="flex items-center gap-2 text-ink-700">
        {icon}
        {label}
      </span>
      <span className="font-bold text-ink-900">{value}건 <ArrowRight className="inline h-3 w-3 ml-1" /></span>
    </Link>
  );
}

function QuickLink({ href, icon, title, desc }: { href: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link href={href}>
      <Card className="p-5 hover:shadow-md hover:border-ink-300 transition-all h-full">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand text-ink-900 mb-3">
          {icon}
        </div>
        <div className="font-bold text-ink-900">{title}</div>
        <div className="text-xs text-ink-500 mt-1">{desc}</div>
      </Card>
    </Link>
  );
}
