"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingBag, TrendingUp, Sparkles, Gift, ArrowRight, Lock, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AgentCard } from "@/components/agent-card";
import { LoginGate } from "@/components/login-gate";
import { BeeMark } from "@/components/layout/logo";
import { agents, getHotAgents, getNewAgents, getFreeAgents } from "@/data/agents";
import { categories } from "@/data/categories";
import { formatPrice, formatCount, cn, getPersonaName, getPersonaFull, getPersonaCode } from "@/lib/utils";

type Tab = "all" | "hot" | "new" | "free";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "전체", icon: <ShoppingBag className="h-4 w-4" /> },
  { key: "hot", label: "베스트셀러", icon: <TrendingUp className="h-4 w-4" /> },
  { key: "new", label: "신규 등록", icon: <Sparkles className="h-4 w-4" /> },
  { key: "free", label: "무료", icon: <Gift className="h-4 w-4" /> },
];

export default function MarketPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");

  const filtered = useMemo(() => {
    let list = [...agents];
    if (tab === "hot") list = getHotAgents();
    if (tab === "new") list = getNewAgents();
    if (tab === "free") list = getFreeAgents();
    if (selectedCategory) list = list.filter((a) => a.categoryId === selectedCategory);
    if (priceFilter === "free") list = list.filter((a) => a.isFree);
    if (priceFilter === "paid") list = list.filter((a) => !a.isFree);
    return list;
  }, [tab, selectedCategory, priceFilter]);

  const topPicks = agents.filter((a) => a.isHot).slice(0, 3);

  return (
    <div className="bg-ink-50/30">
      {/* Hero Banner */}
      <div className="relative bg-ink-900 text-white overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand rounded-full" />
        <div className="absolute bottom-10 right-32 w-16 h-16 bg-brand rounded-full opacity-80 hidden md:block" />
        <div className="container relative py-14 md:py-20">
          <Badge variant="brand" className="mb-4">🛍️ AI 에이전트 마켓</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            완성된 AI 에이전트를<br />
            <span className="text-brand">즉시 구매해서 바로 사용</span>하세요
          </h1>
          <p className="text-ink-200 text-base md:text-lg max-w-2xl mb-8">
            제작 의뢰 없이 검증된 에이전트를 바로 구매. n8n, Make, GPT 등<br />
            다양한 플랫폼에서 즉시 사용 가능해요.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="brand" size="xl">
              지금 둘러보기
            </Button>
            <Button variant="outline" size="xl" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              무료부터 시작하기
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-6 max-w-2xl">
            <div>
              <div className="text-2xl md:text-3xl font-extrabold">3,254+</div>
              <div className="text-xs md:text-sm text-ink-300 mt-1">판매 중</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold">42,000+</div>
              <div className="text-xs md:text-sm text-ink-300 mt-1">누적 구매</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold">4.86</div>
              <div className="text-xs md:text-sm text-ink-300 mt-1">평균 평점</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold">847개</div>
              <div className="text-xs md:text-sm text-ink-300 mt-1">무료 에이전트</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Picks Banner */}
      <section className="py-12 bg-white border-b border-ink-100">
        <div className="container">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-ink-900">
                🏆 이번 주 베스트 셀러
              </h2>
              <p className="text-sm text-ink-500 mt-1">가장 많이 팔린 TOP 3</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topPicks.map((agent, i) => {
              const persona = getPersonaName(agent.id);
              const full = getPersonaFull(agent.id);
              const code = getPersonaCode(agent.id);
              const bg = i === 0 ? "bg-brand" : "bg-ink-900";
              const textColor = i === 0 ? "text-ink-900" : "text-brand";
              const subColor = i === 0 ? "text-ink-900/60" : "text-white/50";
              const grid = i === 0 ? "rgba(33,33,33,0.08)" : "rgba(255,193,7,0.08)";
              const beeOpacity = i === 0 ? "opacity-50" : "opacity-40";
              return (
                <Card key={agent.id} className="relative overflow-hidden hover:shadow-xl transition-all group">
                  <Link href={`/market/${agent.id}`}>
                    <div className="absolute top-3 left-3 z-20 w-10 h-10 rounded-full bg-brand text-ink-900 font-extrabold text-lg flex items-center justify-center shadow-lg">
                      {i + 1}
                    </div>
                    <div className={`aspect-[16/10] relative ${bg} overflow-hidden`}>
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
                          backgroundSize: "28px 28px",
                        }}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:scale-[1.04] transition-transform duration-500">
                        <BeeMark className={`h-9 w-9 mb-2 ${beeOpacity}`} />
                        <div className={`text-[10px] font-mono tracking-[0.3em] uppercase ${subColor}`}>
                          Mobee Model
                        </div>
                        <div className={`font-extrabold text-6xl tracking-tight ${textColor} mt-1`}>
                          {code}
                        </div>
                        <div className={`mt-2 flex items-center gap-1 text-[10px] font-mono ${subColor}`}>
                          <Cpu className="h-2.5 w-2.5" />
                          AI · {agent.platforms[0] || "GPT-4"}
                        </div>
                      </div>
                    </div>
                    <div className="px-5 pt-5 pb-3">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-extrabold text-base text-ink-900">{persona}</span>
                        <span className="text-[11px] text-ink-400">({full})</span>
                      </div>
                      <div className="text-xs text-ink-500 mb-2">{agent.category}</div>
                      <h3 className="font-bold text-sm mb-1 line-clamp-2">{agent.name}</h3>
                      <p className="text-xs text-ink-500 line-clamp-2 mb-3">{agent.description}</p>
                      <div className="flex items-center justify-between text-xs text-ink-500 pt-3 border-t border-ink-50">
                        <span>⭐ {agent.rating} · 채용 {formatCount(agent.orderCount)}</span>
                        <span className="font-extrabold text-lg text-ink-900">
                          {agent.isFree ? "무료" : `${formatPrice(agent.startPrice)}원`}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-5 pb-5">
                    <LoginGate
                      action="채용"
                      description={`${full}을(를) 채용하려면 회원 로그인이 필요해요. 계약·결제·메시지 채널은 회원만 사용할 수 있어요.`}
                      className="block w-full"
                    >
                      <span className="inline-flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-ink-900 text-white font-semibold text-sm hover:bg-ink-700 transition-colors">
                        <Lock className="h-3.5 w-3.5" />
                        {agent.isFree ? "무료로 채용하기" : "채용하기"}
                      </span>
                    </LoginGate>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container py-10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-ink-100">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-4 py-3 font-semibold text-sm flex items-center gap-1.5 border-b-2 -mb-px transition-colors",
                tab === t.key
                  ? "text-ink-900 border-ink-900"
                  : "text-ink-500 border-transparent hover:text-ink-900"
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
              selectedCategory === null
                ? "bg-ink-900 text-white"
                : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400"
            )}
          >
            전체 카테고리
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1",
                selectedCategory === cat.id
                  ? "bg-ink-900 text-white"
                  : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400"
              )}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="text-sm text-ink-700">
            <strong className="text-ink-900">{filtered.length}</strong>개의 상품
          </div>
          <div className="flex gap-1 bg-ink-100 rounded-lg p-1">
            {[
              { v: "all" as const, label: "전체" },
              { v: "free" as const, label: "무료만" },
              { v: "paid" as const, label: "유료만" },
            ].map((p) => (
              <button
                key={p.v}
                onClick={() => setPriceFilter(p.v)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-md transition-colors",
                  priceFilter === p.v ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <Card className="py-20 text-center">
            <div className="text-4xl mb-3">🛒</div>
            <div className="font-bold text-ink-900 mb-1">상품이 없어요</div>
            <p className="text-sm text-ink-500">다른 필터를 시도해보세요</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <Card className="mt-16 bg-brand p-8 md:p-12 border-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-ink-900 mb-2">
                직접 만든 에이전트, 마켓에서 팔아보세요
              </h3>
              <p className="text-ink-800">
                개인/팀 누구나 자신의 에이전트를 등록하고 수익을 만들 수 있어요.
              </p>
            </div>
            <Button variant="default" size="xl" asChild>
              <Link href="/agents/register">
                등록하러 가기
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
