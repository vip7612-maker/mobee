"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter, SlidersHorizontal, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AgentCard } from "@/components/agent-card";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

type SortBy = "popular" | "rating" | "recent" | "price-low" | "price-high";

const sortOptions: { value: SortBy; label: string }[] = [
  { value: "popular", label: "리뷰 많은순" },
  { value: "rating", label: "평점 높은순" },
  { value: "recent", label: "최신순" },
  { value: "price-low", label: "낮은 가격순" },
  { value: "price-high", label: "높은 가격순" },
];

const platforms = ["GPT-4", "Claude", "n8n", "Make", "Zapier", "Python", "Notion", "Slack"];
const priceRanges = [
  { label: "무료", min: 0, max: 0 },
  { label: "5만원 이하", min: 1, max: 50000 },
  { label: "5~10만원", min: 50001, max: 100000 },
  { label: "10~30만원", min: 100001, max: 300000 },
  { label: "30만원 이상", min: 300001, max: Infinity },
];

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>("popular");

  const filtered = useMemo(() => {
    let list = [...agents];
    if (selectedCategory) list = list.filter((a) => a.categoryId === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedPlatforms.length > 0) {
      list = list.filter((a) =>
        selectedPlatforms.some((p) => a.platforms.includes(p))
      );
    }
    if (minRating > 0) list = list.filter((a) => a.rating >= minRating);
    if (selectedPrice !== null) {
      const r = priceRanges[selectedPrice];
      list = list.filter((a) => a.startPrice >= r.min && a.startPrice <= r.max);
    }
    switch (sortBy) {
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "popular": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case "recent": list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "price-low": list.sort((a, b) => a.startPrice - b.startPrice); break;
      case "price-high": list.sort((a, b) => b.startPrice - a.startPrice); break;
    }
    return list;
  }, [search, selectedCategory, selectedPlatforms, minRating, selectedPrice, sortBy]);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedPlatforms([]);
    setMinRating(0);
    setSelectedPrice(null);
  };

  return (
    <div className="bg-ink-50/30">
      {/* Hero */}
      <div className="bg-white border-b border-ink-100">
        <div className="container py-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-2">
            에이전트 찾기
          </h1>
          <p className="text-ink-500 mb-8">
            검증된 1,800명 제작자가 만든 8,152개 AI 에이전트
          </p>

          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="에이전트, 카테고리, 태그로 검색"
              className="pl-12 h-14 text-base"
            />
          </div>

          {/* Category chips */}
          <div className="mt-6 flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                selectedCategory === null
                  ? "bg-ink-900 text-white"
                  : "bg-ink-50 text-ink-700 hover:bg-ink-100"
              )}
            >
              전체
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                }
                className={cn(
                  "shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5",
                  selectedCategory === cat.id
                    ? "bg-ink-900 text-white"
                    : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                )}
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-bold text-ink-900">
                  <SlidersHorizontal className="h-4 w-4" />
                  필터
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs text-ink-500 hover:text-ink-900 underline"
                >
                  초기화
                </button>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-ink-900 mb-2">최소 평점</div>
                <div className="space-y-1">
                  {[4.5, 4.0, 3.5, 0].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm transition-colors",
                        minRating === r ? "bg-brand-50 text-ink-900 font-semibold" : "hover:bg-ink-50"
                      )}
                    >
                      <span className="flex items-center gap-1.5">
                        {r > 0 ? (
                          <>
                            <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                            {r.toFixed(1)} 이상
                          </>
                        ) : (
                          "전체"
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-ink-900 mb-2">가격대</div>
                <div className="space-y-1">
                  {priceRanges.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPrice(selectedPrice === i ? null : i)}
                      className={cn(
                        "w-full text-left px-2 py-2 rounded-lg text-sm transition-colors",
                        selectedPrice === i
                          ? "bg-brand-50 text-ink-900 font-semibold"
                          : "hover:bg-ink-50"
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div>
                <div className="text-sm font-semibold text-ink-900 mb-2">사용 플랫폼</div>
                <div className="flex flex-wrap gap-1.5">
                  {platforms.map((p) => (
                    <button
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                        selectedPlatforms.includes(p)
                          ? "bg-ink-900 text-white border-ink-900"
                          : "bg-white text-ink-700 border-ink-200 hover:border-ink-400"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-brand-50 p-5 border-0">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-bold text-ink-900 mb-1">원하는 비서가 없으세요?</div>
              <p className="text-xs text-ink-700 mb-4 leading-relaxed">
                요청서를 올리면 제작자들이<br />맞춤 제안을 보내드려요
              </p>
              <Button variant="default" size="sm" className="w-full" asChild>
                <Link href="/request">에이전트 요청하기</Link>
              </Button>
            </Card>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="text-sm text-ink-700">
                <strong className="text-ink-900">{filtered.length}</strong>개의 에이전트
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="appearance-none pl-3 pr-9 py-2 text-sm font-semibold bg-white border border-ink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-900"
                >
                  {sortOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-ink-500" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <Card className="py-20 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <div className="font-bold text-ink-900 mb-1">검색 결과가 없어요</div>
                <p className="text-sm text-ink-500">필터를 조정하거나 요청서를 올려보세요</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
