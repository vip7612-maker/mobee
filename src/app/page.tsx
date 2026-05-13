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

export default function Home() {
  const hotAgents = getHotAgents().slice(0, 8);
  const recentPosts = posts.slice(0, 4);
  const featuredCategories = categories.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-50 via-brand-50/40 to-white pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-50">
          <div className="absolute top-10 right-10 w-72 h-72 bg-brand-300 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-40" />
        </div>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="brand" className="mb-5 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5" />
              누적 매칭 12만+ 건
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-ink-900 leading-tight tracking-tight text-balance">
              모든 영역에<br />
              <span className="relative inline-block">
                <span className="relative z-10">나만의 AI 비서</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 md:h-4 bg-brand -z-0" />
              </span>
              를
            </h1>
            <p className="mt-5 text-base md:text-lg text-ink-500 leading-relaxed">
              CS, 마케팅, 데이터 분석, 영업까지 — 내 업무에 꼭 맞는<br className="hidden md:block" />
              AI 에이전트를 찾거나 직접 의뢰해보세요.
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2 p-2 bg-white rounded-2xl shadow-lg border border-ink-100">
                <div className="flex items-center gap-2 md:px-3 md:border-r md:border-ink-100">
                  <MapPin className="h-4 w-4 text-ink-400 ml-2 md:ml-0" />
                  <select className="bg-transparent text-sm font-medium text-ink-700 focus:outline-none py-3 pr-6">
                    <option>전국</option>
                    <option>서울</option>
                    <option>경기</option>
                    <option>부산</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center gap-2 px-2">
                  <Search className="h-5 w-5 text-ink-400" />
                  <input
                    type="text"
                    placeholder="어떤 AI 에이전트가 필요하세요?"
                    className="flex-1 bg-transparent text-base placeholder:text-ink-400 focus:outline-none py-3"
                  />
                </div>
                <Button variant="brand" size="lg" className="rounded-xl">
                  AI 에이전트 요청
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
                <span className="text-ink-400">인기 검색:</span>
                {["CS자동응답", "회의록", "콜드메일", "SEO블로그", "이력서스크리닝"].map((kw) => (
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
                <div className="text-xs md:text-sm text-ink-500 mt-1">활동 에이전트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-ink-900">128,500+</div>
                <div className="text-xs md:text-sm text-ink-500 mt-1">매칭 완료</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-ink-900">4.86</div>
                <div className="text-xs md:text-sm text-ink-500 mt-1">평균 만족도</div>
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink-900">
              이런 업무에 AI 비서가 활약하고 있어요
            </h2>
            <p className="mt-2 text-ink-500">실제 현장에서 검증된 활용 시나리오</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                emoji: "🛒",
                title: "쇼핑몰 운영자",
                useCase: "CS 응답 시간 12분 → 1분",
                desc: "매출 3억 셀러도 CS 인력 70% 절감",
                color: "bg-rose-50",
              },
              {
                emoji: "📣",
                title: "1인 마케터",
                useCase: "콘텐츠 생산량 10배",
                desc: "혼자서도 SNS 채널 5개 운영 가능",
                color: "bg-pink-50",
              },
              {
                emoji: "💼",
                title: "스타트업 대표",
                useCase: "회의록 작성 자동화",
                desc: "주 10시간 → 0시간 절감",
                color: "bg-yellow-50",
              },
              {
                emoji: "👥",
                title: "HR 매니저",
                useCase: "채용 기간 40% 단축",
                desc: "이력서 200건도 5분이면 정리 완료",
                color: "bg-cyan-50",
              },
            ].map((item) => (
              <Card key={item.title} className={`${item.color} border-0 p-6 hover:shadow-lg transition-all`}>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className="font-bold text-base text-ink-900 mb-1">{item.title}</div>
                <div className="text-lg font-extrabold text-ink-900 mb-2">{item.useCase}</div>
                <div className="text-sm text-ink-600">{item.desc}</div>
              </Card>
            ))}
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
            {featuredCategories.map((cat) => {
              const catAgents = agents.filter((a) => a.categoryId === cat.id).slice(0, 3);
              return (
                <Card key={cat.id} className="overflow-hidden">
                  <div className={`${cat.color} px-6 py-5 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{cat.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg text-ink-900">{cat.name}</h3>
                        <p className="text-xs text-ink-600 mt-0.5">
                          {formatCount(cat.agentCount)}개 에이전트
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/agents?category=${cat.id}`}
                      className="text-sm font-semibold text-ink-700 hover:text-ink-900 inline-flex items-center gap-1"
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
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand/20 to-transparent" />
            <div className="absolute top-10 right-10 text-9xl opacity-10">🤖</div>
            <div className="relative max-w-2xl">
              <Badge variant="brand" className="mb-5">제작자 모집</Badge>
              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
                AI 에이전트를 만드시나요?<br />
                <span className="text-brand">모두의비서에서 수익화</span>하세요
              </h2>
              <p className="text-ink-200 text-base md:text-lg mb-8 leading-relaxed">
                이미 1,800명의 제작자가 활동 중이에요. 월 평균 240만원 수익을 올리고 있어요.<br />
                별도 마케팅 없이도 자동으로 매칭되어 안정적으로 수익을 만들 수 있어요.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["수수료 12%부터", "구독형/단건 자유롭게", "전담 매니저 지원", "마케팅 무료 노출"].map((b) => (
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
