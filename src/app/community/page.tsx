"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  MessageCircle,
  ThumbsUp,
  PenSquare,
  Flame,
  Search,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LoginGate } from "@/components/login-gate";
import { posts, popularPosts } from "@/data/community";
import { formatCount, cn } from "@/lib/utils";

type Tab = "전체" | "활용사례" | "질문" | "정보공유" | "에이전트 리뷰";

const tabs: Tab[] = ["전체", "활용사례", "질문", "정보공유", "에이전트 리뷰"];

const tabColors: Record<string, string> = {
  활용사례: "bg-blue-50 text-blue-700",
  질문: "bg-amber-50 text-amber-700",
  정보공유: "bg-purple-50 text-purple-700",
  "에이전트 리뷰": "bg-emerald-50 text-emerald-700",
};

const topContributors = [
  { name: "자동화덕후", badge: "⭐ 인플루언서", posts: 142, likes: 4823 },
  { name: "노코드빌더", badge: "⭐ 인플루언서", posts: 98, likes: 3621 },
  { name: "AI엔지니어R", badge: "🤖 AI엔지니어", posts: 76, likes: 2914 },
  { name: "트렌드워처", badge: "📊 데이터분석가", posts: 64, likes: 2487 },
  { name: "마케터김", badge: "🏆 우수활용자", posts: 52, likes: 2103 },
];

export default function CommunityPage() {
  const [tab, setTab] = useState<Tab>("전체");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...posts];
    if (tab !== "전체") list = list.filter((p) => p.category === tab);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tab, search]);

  return (
    <div className="bg-ink-50/30 min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="bg-white border-b border-ink-100">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-2">
                커뮤니티
              </h1>
              <p className="text-ink-500">
                실제 활용 사례, 노하우, 질문과 답변이 오가는 공간이에요
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="검색"
                  className="pl-9 h-11 w-64"
                />
              </div>
              <LoginGate
                action="글쓰기"
                description="활용 사례·리뷰·질문 모두 회원이 작성합니다. 둘러보기와 검색은 회원 없이도 자유롭게 가능해요."
              >
                <span className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-brand text-ink-900 font-semibold hover:bg-brand-400 shadow-sm">
                  <PenSquare className="h-4 w-4 mr-1" />
                  글쓰기
                </span>
              </LoginGate>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide -mb-px">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "shrink-0 px-5 py-3 text-sm font-semibold border-b-2 transition-colors",
                  tab === t
                    ? "text-ink-900 border-ink-900"
                    : "text-ink-500 border-transparent hover:text-ink-900"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Posts List */}
          <div>
            {/* Pinned/Hot indicator */}
            {tab === "전체" && (
              <div className="mb-5 flex items-center gap-2 px-4 py-3 bg-brand-50 rounded-xl">
                <Flame className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-ink-900">
                  지금 핫한 토픽: "AI 비서 도입 후기" 87건
                </span>
              </div>
            )}

            <div className="space-y-3">
              {filtered.map((post) => (
                <Link key={post.id} href={`/community/${post.id}`}>
                  <Card className="p-5 hover:shadow-md hover:border-ink-200 transition-all">
                    <div className="flex gap-4">
                      <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-xl bg-brand-50 items-center justify-center text-3xl">
                        {post.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={cn(
                              "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                              tabColors[post.category] || "bg-ink-50 text-ink-700"
                            )}
                          >
                            {post.category}
                          </span>
                          <span className="text-xs text-ink-400">{post.createdAt}</span>
                        </div>
                        <h3 className="font-bold text-base md:text-lg text-ink-900 leading-snug mb-2 line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-ink-500 line-clamp-2 mb-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium text-ink-700">{post.author}</span>
                            <span className="text-ink-400">{post.authorBadge}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-ink-400">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatCount(post.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {post.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {post.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <Card className="py-20 text-center">
                <div className="text-4xl mb-3">📭</div>
                <div className="font-bold text-ink-900 mb-1">아직 게시글이 없어요</div>
                <p className="text-sm text-ink-500">첫 글의 주인공이 되어보세요</p>
              </Card>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="mt-8 flex items-center justify-center gap-1">
                <button className="px-3 py-2 rounded-lg text-sm text-ink-400 hover:bg-ink-100" disabled>
                  이전
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={cn(
                      "w-9 h-9 rounded-lg text-sm font-semibold transition-colors",
                      p === 1 ? "bg-ink-900 text-white" : "text-ink-700 hover:bg-ink-100"
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button className="px-3 py-2 rounded-lg text-sm text-ink-700 hover:bg-ink-100">
                  다음
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Popular */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <h3 className="font-bold text-ink-900">인기 게시글</h3>
              </div>
              <div className="space-y-3">
                {popularPosts.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/community/${p.id}`}
                    className="flex gap-3 group"
                  >
                    <div className="shrink-0 w-6 h-6 rounded bg-ink-100 text-ink-700 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-ink-800 line-clamp-2 group-hover:text-ink-900 group-hover:underline underline-offset-2 leading-snug">
                        {p.title}
                      </div>
                      <div className="text-xs text-ink-400 mt-1">
                        조회 {formatCount(p.views)} · 댓글 {p.comments}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-4 w-4 text-brand-600" />
                <h3 className="font-bold text-ink-900">이번 달 활약</h3>
              </div>
              <div className="space-y-3">
                {topContributors.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold",
                        i === 0
                          ? "bg-brand text-ink-900"
                          : i === 1
                          ? "bg-ink-300 text-white"
                          : i === 2
                          ? "bg-amber-700 text-white"
                          : "bg-ink-100 text-ink-700"
                      )}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-ink-900 truncate">
                        {c.name}
                      </div>
                      <div className="text-xs text-ink-400 truncate">{c.badge}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-semibold text-ink-700">
                        ♥ {formatCount(c.likes)}
                      </div>
                      <div className="text-[10px] text-ink-400">
                        글 {c.posts}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-5 bg-brand-50 border-0">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-bold text-ink-900 mb-1">처음이세요?</h3>
              <p className="text-xs text-ink-700 mb-4 leading-relaxed">
                커뮤니티 운영 원칙과 글쓰기 팁을 확인해보세요
              </p>
              <div className="space-y-2">
                <Link href="/community/guide" className="block text-xs font-semibold text-ink-900 hover:underline">
                  → 커뮤니티 가이드라인
                </Link>
                <Link href="/community/popular" className="block text-xs font-semibold text-ink-900 hover:underline">
                  → 좋은 글 쓰는 팁
                </Link>
                <Link href="/community/badges" className="block text-xs font-semibold text-ink-900 hover:underline">
                  → 뱃지 시스템 안내
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
