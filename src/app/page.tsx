import Link from "next/link";
import {
  Search,
  ArrowRight,
  MapPin,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CategoryGrid } from "@/components/category-grid";
import { AgentCard } from "@/components/agent-card";
import { categories } from "@/data/categories";
import { agents, getHotAgents } from "@/data/agents";
import { posts } from "@/data/community";
import { formatCount } from "@/lib/utils";

const Hexagon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 60 52" className={className} aria-hidden>
    <polygon points="30,2 56,17 56,37 30,52 4,37 4,17" />
  </svg>
);

export default function Home() {
  const hotAgents = getHotAgents().slice(0, 8);
  const recentPosts = posts.slice(0, 4);
  const featuredCategories = categories.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white pt-12 pb-16 md:pt-20 md:pb-24 border-b border-ink-100 overflow-hidden">
        {/* 육각형 벌집 패턴 (배경 모티프) */}
        <Hexagon className="absolute top-16 right-[8%] w-28 h-28 fill-brand opacity-90 -z-10" />
        <Hexagon className="absolute top-32 right-[20%] w-14 h-14 fill-brand-200 -z-10 hidden md:block" />
        <Hexagon className="absolute bottom-20 left-[6%] w-20 h-20 fill-ink-900 -z-10 hidden md:block" />
        <Hexagon className="absolute bottom-44 left-[18%] w-10 h-10 fill-ink-900 opacity-20 -z-10 hidden md:block" />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="brand" className="mb-5 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5" />
              모두를 위한 AI 비서 매칭 플랫폼
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-ink-900 leading-tight tracking-tight text-balance">
              나에게 맞는 AI 비서,<br />
              <span className="relative inline-block">
                <span className="relative z-10">Mobee</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 md:h-4 bg-brand -z-0" />
              </span>에서
            </h1>
            <p className="mt-5 text-base md:text-lg text-ink-500 leading-relaxed">
              Mobee는 비서 앱이 아니에요. <strong className="text-ink-900">검증된 AI 비서를 찾고,<br className="hidden md:block" />
              맞춤 제작을 의뢰하고, 바로 구매해 쓰는 매칭 플랫폼</strong>입니다.
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2 p-2 bg-white rounded-2xl shadow-lg border border-ink-100">
                <div className="flex items-center gap-2 md:px-3 md:border-r md:border-ink-100">
                  <MapPin className="h-4 w-4 text-ink-400 ml-2 md:ml-0" />
                  <select className="bg-transparent text-sm font-medium text-ink-700 focus:outline-none py-3 pr-6">
                    <option>분야 전체</option>
                    <option>교육·강의</option>
                    <option>업무·생산성</option>
                    <option>마케팅</option>
                    <option>고객응대</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center gap-2 px-2">
                  <Search className="h-5 w-5 text-ink-400" />
                  <input
                    type="text"
                    placeholder="어떤 일을 맡길 비서를 찾으세요? 예) 수업자료 제작"
                    className="flex-1 bg-transparent text-base placeholder:text-ink-400 focus:outline-none py-3"
                  />
                </div>
                <Button variant="brand" size="lg" className="rounded-xl">
                  비서 찾기
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
                <span className="text-ink-400">인기 검색:</span>
                {["강의자료", "회의록", "수업퀴즈", "공유캘린더", "이력서스크리닝"].map((kw) => (
                  <Link
                    key={kw}
                    href={`/agents?q=${kw}`}
                    className="text-ink-500 hover:text-ink-900 hover:underline underline-offset-4"
                  >
                    #{kw}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 max-w-xl mx-auto gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-ink-900">8,152+</div>
                <div className="text-xs md:text-sm text-ink-500 mt-1">등록된 AI 비서</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-ink-900">1,800+</div>
                <div className="text-xs md:text-sm text-ink-500 mt-1">검증된 제작자</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-ink-900">128,500+</div>
                <div className="text-xs md:text-sm text-ink-500 mt-1">매칭 완료</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">
                어떤 일을 맡기시겠어요?
              </h2>
              <p className="mt-2 text-ink-500">
                12개 카테고리, 8천여 개 에이전트가 준비되어 있어요
              </p>
            </div>
            <Link
              href="/agents"
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-900"
            >
              전체 카테고리 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <CategoryGrid />
        </div>
      </section>

      {/* M.O.B.E.E. 의미 섹션 */}
      <section className="py-16 md:py-20 bg-ink-900 text-white relative overflow-hidden">
        <Hexagon className="absolute -top-10 -right-10 w-48 h-48 fill-brand opacity-90" />
        <Hexagon className="absolute -bottom-16 -left-16 w-56 h-56 fill-brand-200 opacity-10" />
        <div className="container relative">
          <div className="text-center mb-12">
            <Badge variant="brand" className="mb-4">브랜드 의미</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
              왜 <span className="text-brand">Mobee</span>인가요?
            </h2>
            <p className="text-ink-300 max-w-2xl mx-auto">
              다섯 글자에 담긴 다섯 가지 약속.<br />
              Mobee는 비서 앱이 아닌, 모든 비서가 모이는 <strong className="text-white">연결 플랫폼</strong>이에요.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto">
            {[
              { letter: "M", word: "My", korean: "나의", desc: "내 업무·취향에 딱 맞는 비서를 찾아 연결해드려요" },
              { letter: "O", word: "Our", korean: "우리의", desc: "수천 명 제작자가 만든 비서가 한자리에 모이는 마켓" },
              { letter: "B", word: "Bridge", korean: "잇는", desc: "사용자와 제작자, 비서와 일을 매끄럽게 잇는 다리" },
              { letter: "E", word: "Everyone", korean: "모두를", desc: "AI 격차 없이 누구나 부담 없이 쓰는 비서 플랫폼" },
              { letter: "E", word: "Empowerment", korean: "역량 강화", desc: "딱 맞는 비서로 모두가 더 잘 일할 수 있게" },
            ].map((item) => (
              <div key={item.word} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-brand hover:text-ink-900 hover:border-brand transition-colors group">
                <div className="text-5xl font-extrabold text-brand group-hover:text-ink-900 mb-2 leading-none">
                  {item.letter}
                </div>
                <div className="font-bold text-base mb-0.5">{item.word}</div>
                <div className="text-xs text-ink-300 group-hover:text-ink-700 mb-3">· {item.korean}</div>
                <div className="text-xs leading-relaxed text-ink-200 group-hover:text-ink-800">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3가지 핵심 가치 */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="soft" className="mb-3">플랫폼이 작동하는 방식</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">
              Mobee가 비서를 연결하는 세 가지 방법
            </h2>
            <p className="mt-2 text-ink-500">
              찾기·의뢰·구매 — 원하는 방식대로 골라서 비서를 만나보세요
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                emoji: "🔍",
                tag: "Find",
                title: "검증된 비서 찾기",
                color: "bg-brand",
                desc: "8천여 개 AI 비서 중 평점·리뷰·실사용 데이터로 검증된 비서를 카테고리·플랫폼별로 골라보세요. 마음에 들면 즉시 사용.",
                features: ["12개 카테고리 × 8천+ 비서", "평점·리뷰 검증 시스템", "플랫폼별 필터"],
                href: "/agents",
                cta: "비서 찾으러 가기",
              },
              {
                emoji: "🛠️",
                tag: "Build",
                title: "맞춤 비서 의뢰",
                color: "bg-ink-900 text-white",
                desc: "필요한 비서가 없다면 요청서를 올려보세요. 1,800명 검증 제작자가 평균 30분 내 맞춤 제안을 보내드려요.",
                features: ["요청서 4단계 작성", "평균 30분 내 첫 제안", "에스크로 안전 결제"],
                href: "/request",
                cta: "비서 의뢰하기",
              },
              {
                emoji: "🛍️",
                tag: "Buy",
                title: "완성품 즉시 구매",
                color: "bg-cream",
                desc: "완성된 AI 비서를 마켓에서 바로 구매해 쓰세요. 무료·구독·단건까지 — 가격 부담 없이 비서를 곧바로 가동.",
                features: ["847개 무료 비서", "구독·단건 자유 선택", "n8n·GPT·Make 호환"],
                href: "/market",
                cta: "마켓 둘러보기",
              },
            ].map((v) => {
              const isDark = v.color.includes("ink-900");
              return (
                <Link key={v.title} href={v.href} className="group">
                  <Card className={`${v.color} p-7 border-0 hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden h-full`}>
                    <Hexagon className={`absolute -top-4 -right-4 w-24 h-24 ${isDark ? "fill-brand opacity-30" : "fill-ink-900 opacity-5"}`} />
                    <div className="relative flex flex-col h-full">
                      <div className="text-4xl mb-4">{v.emoji}</div>
                      <Badge variant={isDark ? "brand" : "outline"} className={`mb-3 self-start ${!isDark && "bg-white"}`}>
                        {v.tag}
                      </Badge>
                      <h3 className={`text-2xl font-extrabold mb-3 ${isDark ? "text-white" : "text-ink-900"}`}>
                        {v.title}
                      </h3>
                      <p className={`text-sm leading-relaxed mb-5 ${isDark ? "text-ink-200" : "text-ink-700"}`}>
                        {v.desc}
                      </p>
                      <ul className="space-y-1.5 mb-6">
                        {v.features.map((f) => (
                          <li key={f} className={`flex items-center gap-2 text-sm font-medium ${isDark ? "text-white" : "text-ink-900"}`}>
                            <CheckCircle2 className={`h-4 w-4 shrink-0 ${isDark ? "text-brand" : "text-ink-900"}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className={`mt-auto inline-flex items-center gap-1 text-sm font-bold ${isDark ? "text-brand" : "text-ink-900"} group-hover:gap-2 transition-all`}>
                        {v.cta}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hot Agents */}
      <section className="py-16 md:py-20 bg-ink-50/60">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Badge variant="hot" className="mb-3">🔥 지금 가장 핫한</Badge>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">
                이번 주 인기 AI 비서
              </h2>
              <p className="mt-2 text-ink-500">실제 사용자들이 가장 많이 선택한 에이전트예요</p>
            </div>
            <Link
              href="/agents"
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-900"
            >
              전체 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hotAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Banner */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-10">
            <Badge variant="soft" className="mb-3">매칭 사례</Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">
              이렇게 비서를 만났어요
            </h2>
            <p className="mt-2 text-ink-500">Mobee에서 딱 맞는 AI 비서를 찾아 일이 가벼워진 분들</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                emoji: "🎓",
                title: "20년차 교사 김선생",
                useCase: "수업자료 비서 매칭",
                desc: "8개 비서 비교 후 도입 → 야근 50% 감소",
                tone: "white",
              },
              {
                emoji: "🎤",
                title: "1인 강의사업자 박강사",
                useCase: "맞춤 비서 제작 의뢰",
                desc: "30분 만에 5건 제안 → 콘텐츠 운영 통합",
                tone: "brand",
              },
              {
                emoji: "🤝",
                title: "비영리 운영자 이대표",
                useCase: "무료 비서 5종 활용",
                desc: "마켓에서 무료 비서 조합 → 운영비 70% ↓",
                tone: "ink",
              },
              {
                emoji: "🛒",
                title: "쇼핑몰 운영자",
                useCase: "CS 비서 즉시 구매",
                desc: "마켓에서 베스트셀러 도입 → 응답 12분→1분",
                tone: "cream",
              },
            ].map((item) => {
              const toneClass =
                item.tone === "brand"
                  ? "bg-brand text-ink-900 border-transparent"
                  : item.tone === "ink"
                  ? "bg-ink-900 text-white border-transparent"
                  : item.tone === "cream"
                  ? "bg-cream border-transparent"
                  : "bg-white border border-ink-100";
              const descClass = item.tone === "ink" ? "text-ink-200" : "text-ink-600";
              const titleClass = item.tone === "ink" ? "text-white" : "text-ink-900";
              return (
              <Card key={item.title} className={`${toneClass} p-6 hover:shadow-lg transition-all`}>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className={`font-bold text-base mb-1 ${titleClass}`}>{item.title}</div>
                <div className={`text-lg font-extrabold mb-2 ${titleClass}`}>{item.useCase}</div>
                <div className={`text-sm ${descClass}`}>{item.desc}</div>
              </Card>
            );})}
          </div>
        </div>
      </section>

      {/* Featured Categories Deep-Dive */}
      <section className="py-16 md:py-20 bg-ink-50/60">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">
              카테고리별 인기 에이전트
            </h2>
            <p className="mt-2 text-ink-500">분야별로 가장 사랑받는 비서를 만나보세요</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredCategories.map((cat, i) => {
              const catAgents = agents.filter((a) => a.categoryId === cat.id).slice(0, 3);
              const headerTone = i % 2 === 0 ? "bg-brand" : "bg-cream";
              return (
                <Card key={cat.id} className="overflow-hidden">
                  <div className={`${headerTone} px-6 py-5 flex items-center justify-between border-b border-ink-100`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cat.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg text-ink-900">{cat.name}</h3>
                        <p className="text-xs text-ink-700 mt-0.5">
                          {formatCount(cat.agentCount)}개 에이전트
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/agents?category=${cat.id}`}
                      className="text-sm font-semibold text-ink-900 hover:underline inline-flex items-center gap-1"
                    >
                      더보기 <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="p-2">
                    {catAgents.map((agent) => (
                      <Link
                        key={agent.id}
                        href={`/agents/${agent.id}`}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-ink-50 transition-colors"
                      >
                        <span className="text-3xl">{agent.thumbnail}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-ink-900 truncate">
                            {agent.name}
                          </div>
                          <div className="text-xs text-ink-500 flex items-center gap-2 mt-0.5">
                            <span>⭐ {agent.rating}</span>
                            <span>·</span>
                            <span>리뷰 {agent.reviewCount}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[10px] text-ink-400">시작가</div>
                          <div className="font-bold text-sm">
                            {agent.isFree ? "무료" : `${(agent.startPrice / 1000).toFixed(0)}k`}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Creator Recruitment */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Card className="relative overflow-hidden bg-ink-900 text-white p-8 md:p-14 border-0">
            <div className="absolute -top-10 -right-10 w-56 h-56 bg-brand rounded-full opacity-90" />
            <div className="absolute top-20 right-32 w-12 h-12 bg-brand rounded-full opacity-80 hidden md:block" />
            <div className="absolute top-10 right-10 text-9xl opacity-10">🤖</div>
            <div className="relative max-w-2xl">
              <Badge variant="brand" className="mb-5">제작자 모집</Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
                AI 비서를 만드시나요?<br />
                <span className="text-brand">Mobee에 등록하고 수익화</span>하세요
              </h2>
              <p className="text-ink-200 text-base md:text-lg mb-8 leading-relaxed">
                이미 1,800명의 제작자가 Mobee 플랫폼에서 활동 중이에요.<br />
                시장 평균 30~40% 대비 <strong className="text-white">수수료 15~20%</strong>로 더 많이 가져가세요.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["수수료 15~20%", "찾기·의뢰·마켓 동시 노출", "에스크로 안전 정산", "추천 큐레이션 가산점"].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-brand" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="brand" size="xl" asChild>
                  <Link href="/agents/register">
                    제작자 시작하기
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="bg-transparent border-white/30 text-white hover:bg-white/10" asChild>
                  <Link href="/guide">제작자 가이드</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Community Preview */}
      <section className="py-16 md:py-20 bg-ink-50/60">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">
                커뮤니티 최신 글
              </h2>
              <p className="mt-2 text-ink-500">실제 활용 사례와 노하우를 공유해요</p>
            </div>
            <Link
              href="/community"
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-ink-700 hover:text-ink-900"
            >
              커뮤니티 가기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentPosts.map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <Card className="h-full p-5 hover:shadow-md hover:border-ink-200 transition-all">
                  <Badge variant="soft" className="mb-3 text-xs">
                    {post.category}
                  </Badge>
                  <div className="text-3xl mb-3">{post.thumbnail}</div>
                  <h3 className="font-bold text-base leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-ink-400">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-2">
                      <span>조회 {formatCount(post.views)}</span>
                      <span>·</span>
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Why us */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">
              왜 모두의비서일까요?
            </h2>
            <p className="mt-3 text-ink-500">
              검증된 제작자와 안전한 거래 시스템으로 누구나 쉽게 AI를 도입할 수 있어요
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Shield className="h-7 w-7" />,
                title: "검증된 제작자만",
                desc: "포트폴리오·실명·세금정보까지 검증 완료된 제작자만 활동할 수 있어요",
              },
              {
                icon: <Zap className="h-7 w-7" />,
                title: "평균 30분 내 매칭",
                desc: "요청서를 올리면 적합한 제작자들이 자동으로 제안을 보내드려요",
              },
              {
                icon: <TrendingUp className="h-7 w-7" />,
                title: "결과 만족 시 결제",
                desc: "에스크로 시스템으로 결과물이 마음에 들 때 결제가 진행돼요",
              },
            ].map((feat) => (
              <div key={feat.title} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand text-ink-900 mb-5">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-ink-900 mb-2">{feat.title}</h3>
                <p className="text-ink-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
