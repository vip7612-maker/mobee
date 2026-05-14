"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Star, TrendingUp, Pause, Play, Archive, Lock, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "../workspace-context";
import { products, teams, getMember, getTeam, type Product } from "@/data/workspace";
import { agents } from "@/data/agents";
import { formatPrice, formatCount, getPersonaName, getPersonaCode, getRobotAccent, getRobotShellTone, cn } from "@/lib/utils";

const STATUS_COLORS: Record<Product["status"], string> = {
  live:       "bg-emerald-50 text-emerald-700",
  paused:     "bg-amber-50 text-amber-700",
  deprecated: "bg-ink-100 text-ink-500",
};

const STATUS_LABEL: Record<Product["status"], string> = {
  live:       "라이브",
  paused:     "일시중지",
  deprecated: "단종",
};

type SortKey = "revenue" | "subscribers" | "rating" | "recent";

export default function ProductsPage() {
  const { currentUser } = useWorkspace();
  const [teamFilter, setTeamFilter] = useState<string | "all">("all");
  const [sortBy, setSortBy] = useState<SortKey>("revenue");

  const visibleProducts = useMemo(() => {
    let list = [...products];
    // 팀원은 자기 팀만, 팀장도 자기 팀 우선 + 매출 권한 없으면 매출 미표시
    if (currentUser.role === "member" && currentUser.teamId) {
      list = list.filter((p) => p.teamId === currentUser.teamId);
    }
    if (teamFilter !== "all") list = list.filter((p) => p.teamId === teamFilter);

    switch (sortBy) {
      case "revenue":     list.sort((a, b) => b.monthlyRevenue - a.monthlyRevenue); break;
      case "subscribers": list.sort((a, b) => b.subscribers - a.subscribers); break;
      case "rating":      list.sort((a, b) => b.rating - a.rating); break;
      case "recent":      list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); break;
    }
    return list;
  }, [currentUser, teamFilter, sortBy]);

  const canSeeRevenue = currentUser.permissions.products.revenue;
  const canPublish = currentUser.permissions.products.publish;

  // 팀별 집계
  const byTeam = teams.map((t) => {
    const tps = products.filter((p) => p.teamId === t.id);
    return {
      team: t,
      count: tps.length,
      revenue: tps.reduce((s, p) => s + p.monthlyRevenue, 0),
      subscribers: tps.reduce((s, p) => s + p.subscribers, 0),
    };
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-xs font-mono tracking-widest text-ink-400 mb-1">PRODUCTS · 판매 중</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900">홈페이지에 노출된 판매 제품</h1>
          <p className="text-ink-500 mt-1 text-sm">
            완성되어 마켓에 노출 중인 비서들. 개발자(팀)별·프로젝트별로 매출과 구독자, 평점을 한자리에서 관리해요.
          </p>
        </div>
      </div>

      {/* 팀별 요약 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {byTeam.map(({ team, count, revenue, subscribers }) => (
          <Card key={team.id} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{team.emoji}</span>
              <span className="font-semibold text-sm text-ink-900 truncate">{team.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="font-extrabold text-lg text-ink-900">{count}</div>
                <div className="text-[10px] text-ink-500">제품</div>
              </div>
              <div>
                <div className="font-extrabold text-lg text-ink-900">{formatCount(subscribers)}</div>
                <div className="text-[10px] text-ink-500">구독자</div>
              </div>
              <div>
                <div className="font-extrabold text-lg text-brand-800">{canSeeRevenue ? `${formatPrice(revenue / 10000)}만` : "***"}</div>
                <div className="text-[10px] text-ink-500">월매출</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 필터 + 정렬 */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs font-semibold text-ink-700 mr-1">팀:</span>
        <button
          onClick={() => setTeamFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
            teamFilter === "all" ? "bg-ink-900 text-white" : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400"
          )}
        >
          전체
        </button>
        {teams.map((t) => (
          <button
            key={t.id}
            onClick={() => setTeamFilter(t.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
              teamFilter === t.id ? "bg-ink-900 text-white" : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400"
            )}
          >
            {t.emoji} {t.name}
          </button>
        ))}
        <div className="ml-auto relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="appearance-none pl-3 pr-9 py-1.5 text-xs font-semibold bg-white border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-900"
          >
            <option value="revenue">월 매출순</option>
            <option value="subscribers">구독자순</option>
            <option value="rating">평점순</option>
            <option value="recent">최신순</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none text-ink-500" />
        </div>
      </div>

      {/* 테이블 */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 bg-ink-50 text-[11px] font-mono tracking-widest uppercase text-ink-500">
          <div className="col-span-5">모델 · 제품</div>
          <div className="col-span-2">팀·담당</div>
          <div className="col-span-1 text-center">상태</div>
          <div className="col-span-1 text-right">구독</div>
          <div className="col-span-1 text-right">평점</div>
          <div className="col-span-2 text-right">월매출</div>
        </div>
        <div className="divide-y divide-ink-50">
          {visibleProducts.map((product) => {
            const agent = agents.find((a) => a.id === product.agentId);
            const team = getTeam(product.teamId);
            const lead = getMember(product.leadId);
            const persona = getPersonaName(product.agentId);
            const code = getPersonaCode(product.agentId);
            return (
              <div key={product.id} className="grid grid-cols-12 px-4 py-4 items-center hover:bg-ink-50/50 transition-colors">
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-ink-900 text-brand font-extrabold flex items-center justify-center text-xs">
                    {code}
                  </div>
                  <div className="min-w-0">
                    <Link href={`/agents/${product.agentId}`} className="font-semibold text-sm text-ink-900 hover:underline truncate block">
                      {persona}
                    </Link>
                    <div className="text-[11px] text-ink-500 truncate">{agent?.name}</div>
                  </div>
                </div>
                <div className="col-span-2 text-xs">
                  <div className="font-medium text-ink-900">{team?.emoji} {team?.name.replace(" 팀", "")}</div>
                  <div className="text-ink-500">{lead?.avatar} {lead?.name}</div>
                </div>
                <div className="col-span-1 flex justify-center">
                  <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", STATUS_COLORS[product.status])}>
                    {STATUS_LABEL[product.status]}
                  </span>
                </div>
                <div className="col-span-1 text-right text-sm font-semibold text-ink-900">
                  {formatCount(product.subscribers)}
                </div>
                <div className="col-span-1 text-right text-sm font-semibold text-ink-900 inline-flex items-center justify-end gap-0.5">
                  <Star className="h-3 w-3 fill-brand text-brand" />
                  {product.rating}
                </div>
                <div className="col-span-2 text-right">
                  {canSeeRevenue ? (
                    <>
                      <div className="font-extrabold text-sm text-ink-900">{formatPrice(product.monthlyRevenue)}원</div>
                      <div className="text-[10px] text-ink-400">누적 {formatPrice(product.totalRevenue / 10000)}만</div>
                    </>
                  ) : (
                    <div className="text-xs text-ink-400 inline-flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      매출 권한 없음
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 권한 안내 */}
      <Card className="mt-6 p-4 bg-ink-50 border-0 flex items-start gap-3">
        <Lock className="h-4 w-4 text-ink-500 mt-0.5 shrink-0" />
        <div className="text-xs text-ink-700 leading-relaxed">
          <strong>권한 안내:</strong> 마스터·팀장은 매출까지 모두 볼 수 있어요. 팀원은 자기 팀 제품만 보이고
          {canSeeRevenue ? "" : ", 매출 컬럼은 권한이 없으면 마스킹돼요"}.
          publish/일시중지 등 상태 변경은 {canPublish ? "현재 사용자가 가능합니다." : "권한이 있는 사용자만 가능합니다."}
        </div>
      </Card>
    </div>
  );
}
