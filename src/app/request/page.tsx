"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowLeft, ArrowRight, Sparkles, Clock, Users, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LoginGate } from "@/components/login-gate";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const budgetOptions = [
  { value: "free", label: "비용 결정 전", desc: "예산을 아직 정하지 못했어요" },
  { value: "under-30", label: "30만원 이하", desc: "간단한 자동화 정도면 충분" },
  { value: "30-100", label: "30~100만원", desc: "어느 정도 복잡한 워크플로우" },
  { value: "100-300", label: "100~300만원", desc: "본격적인 비즈니스 도입" },
  { value: "over-300", label: "300만원 이상", desc: "대규모 시스템 구축" },
  { value: "monthly", label: "월 구독형", desc: "월별 정기 결제 선호" },
];

const timeOptions = [
  { value: "asap", label: "최대한 빠르게", desc: "1주 이내" },
  { value: "1-2w", label: "1~2주 내", desc: "여유롭게" },
  { value: "1m", label: "1개월 내", desc: "충분한 검토 후" },
  { value: "flexible", label: "유연하게", desc: "좋은 제작자라면 OK" },
];

export default function RequestPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    category: "",
    title: "",
    description: "",
    budget: "",
    timeline: "",
    name: "",
    contact: "",
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const updateData = (key: string, value: string) => {
    setData((p) => ({ ...p, [key]: value }));
  };

  const canNext = () => {
    if (step === 1) return !!data.category;
    if (step === 2) return data.title.length > 2 && data.description.length > 10;
    if (step === 3) return !!data.budget && !!data.timeline;
    if (step === 4) return data.name.length > 0 && data.contact.length > 0;
    return false;
  };

  if (step > totalSteps) {
    return (
      <div className="container py-20">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-brand flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-ink-900" strokeWidth={3} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            요청이 등록되었어요!
          </h1>
          <p className="text-ink-500 mb-2">
            매칭된 에이전트 제작자들이 곧 제안을 보내드려요.
          </p>
          <p className="text-ink-500 mb-10">
            평균 <strong className="text-ink-900">30분 이내</strong>에 첫 제안이 도착해요.
          </p>

          <Card className="text-left p-6 mb-8 bg-ink-50/60 border-0">
            <div className="text-sm font-semibold text-ink-700 mb-3">요청 요약</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-500">카테고리</span>
                <span className="font-semibold text-ink-900">
                  {categories.find((c) => c.id === data.category)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">제목</span>
                <span className="font-semibold text-ink-900 max-w-[60%] truncate text-right">
                  {data.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">예산</span>
                <span className="font-semibold text-ink-900">
                  {budgetOptions.find((b) => b.value === data.budget)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">희망 일정</span>
                <span className="font-semibold text-ink-900">
                  {timeOptions.find((t) => t.value === data.timeline)?.label}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="brand" size="lg" asChild>
              <Link href="/agents">에이전트 둘러보기</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/">홈으로</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink-50/40 min-h-[calc(100vh-4rem)] py-10">
      <div className="container max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            홈으로
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900">
            AI 에이전트 요청서 작성
          </h1>
          <p className="text-ink-500 mt-1">
            요청만 남겨주시면 제작자들이 제안을 보내드려요
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-semibold text-ink-900">Step {step}/{totalSteps}</span>
            <span className="text-ink-500">
              {step === 1 && "카테고리 선택"}
              {step === 2 && "업무 설명"}
              {step === 3 && "예산 & 일정"}
              {step === 4 && "연락처"}
            </span>
          </div>
          <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="p-6 md:p-10">
          {/* Step 1: Category */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-ink-900 mb-1">
                어떤 영역의 비서가 필요하세요?
              </h2>
              <p className="text-sm text-ink-500 mb-6">가장 가까운 카테고리를 선택해주세요</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateData("category", cat.id)}
                    className={cn(
                      "flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all",
                      data.category === cat.id
                        ? "border-ink-900 bg-brand-50 -translate-y-0.5 shadow-md"
                        : "border-ink-100 hover:border-ink-300"
                    )}
                  >
                    <span className="text-3xl mb-2">{cat.emoji}</span>
                    <span className="font-semibold text-sm">{cat.name}</span>
                    <span className="text-xs text-ink-400 mt-1 line-clamp-1">
                      {cat.popularServices[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-ink-900 mb-1">
                어떤 업무를 자동화하고 싶으세요?
              </h2>
              <p className="text-sm text-ink-500 mb-6">자세히 적을수록 더 좋은 제안을 받을 수 있어요</p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-ink-900 mb-2">
                    요청 제목
                  </label>
                  <Input
                    value={data.title}
                    onChange={(e) => updateData("title", e.target.value)}
                    placeholder="예) 우리 회사 CS 응대 자동화 비서 만들고 싶어요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-ink-900 mb-2">
                    업무 상세 설명
                  </label>
                  <textarea
                    value={data.description}
                    onChange={(e) => updateData("description", e.target.value)}
                    rows={8}
                    className="w-full rounded-lg border border-ink-200 bg-white p-4 text-base text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-ink-900"
                    placeholder={`예시:\n- 스마트스토어 CS 문의를 자동으로 응대하고 싶어요\n- 하루 평균 200건 정도 들어오고, 환불/배송/사이즈 문의가 80%\n- 카톡 상담 채널도 함께 연결되면 좋겠어요\n- 가능하면 어려운 케이스만 사람에게 넘기는 방식으로`}
                  />
                  <div className="mt-2 flex items-center gap-1 text-xs text-ink-400">
                    <Sparkles className="h-3 w-3" />
                    <span>구체적일수록 매칭 정확도가 올라가요</span>
                  </div>
                </div>

                <div className="rounded-lg bg-brand-50 p-4 text-sm">
                  <div className="font-semibold text-ink-900 mb-1">💡 이런 정보가 있으면 좋아요</div>
                  <ul className="text-ink-700 space-y-1 list-disc list-inside text-sm">
                    <li>현재 사용 중인 툴 (예: 스마트스토어, 노션, 카톡채널)</li>
                    <li>일일/월간 처리 건수</li>
                    <li>특별히 중요한 요구사항이나 제약사항</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-ink-900 mb-1">예산과 일정을 알려주세요</h2>
              <p className="text-sm text-ink-500 mb-6">제작자가 적합한 제안을 만들 수 있어요</p>

              <div className="mb-7">
                <div className="text-sm font-semibold text-ink-900 mb-3">예산 범위</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateData("budget", opt.value)}
                      className={cn(
                        "flex flex-col text-left p-4 rounded-xl border-2 transition-all",
                        data.budget === opt.value
                          ? "border-ink-900 bg-brand-50"
                          : "border-ink-100 hover:border-ink-300"
                      )}
                    >
                      <span className="font-bold text-sm text-ink-900">{opt.label}</span>
                      <span className="text-xs text-ink-500 mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-ink-900 mb-3">희망 일정</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateData("timeline", opt.value)}
                      className={cn(
                        "flex flex-col text-left p-4 rounded-xl border-2 transition-all",
                        data.timeline === opt.value
                          ? "border-ink-900 bg-brand-50"
                          : "border-ink-100 hover:border-ink-300"
                      )}
                    >
                      <span className="font-bold text-sm text-ink-900">{opt.label}</span>
                      <span className="text-xs text-ink-500 mt-1">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-ink-900 mb-1">마지막으로 연락처를 알려주세요</h2>
              <p className="text-sm text-ink-500 mb-6">제안이 도착하면 알림으로 알려드려요</p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-ink-900 mb-2">이름</label>
                  <Input
                    value={data.name}
                    onChange={(e) => updateData("name", e.target.value)}
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink-900 mb-2">
                    연락처 (전화번호 또는 이메일)
                  </label>
                  <Input
                    value={data.contact}
                    onChange={(e) => updateData("contact", e.target.value)}
                    placeholder="010-1234-5678 또는 hello@example.com"
                  />
                </div>
              </div>

              <Card className="bg-brand-50 border-0 p-4 mb-5 flex items-start gap-3">
                <Lock className="h-5 w-5 text-ink-900 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-bold text-ink-900 mb-0.5">최종 등록은 회원만 가능해요</div>
                  <div className="text-ink-700">
                    제안을 받고 매칭을 진행하려면 알림·메시지 채널이 필요해 회원가입이 필요해요. 둘러보기·요청서 작성은 자유롭게 가능합니다.
                  </div>
                </div>
              </Card>

              <Card className="bg-ink-50/60 border-0 p-5">
                <div className="text-sm font-semibold text-ink-900 mb-3">요청서를 등록하면</div>
                <div className="space-y-2">
                  {[
                    "평균 30분 내 첫 제안 도착",
                    "보통 5~8개의 제안을 받게 돼요",
                    "마음에 드는 제안만 골라서 진행하세요",
                    "결과물이 마음에 들 때 결제 (에스크로)",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-ink-700">
                      <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-10 pt-6 border-t border-ink-100 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              이전
            </Button>
            {step === totalSteps ? (
              canNext() ? (
                <LoginGate
                  action="요청 등록"
                  description="요청서를 등록하면 제작자들이 제안을 보내드리는데, 제안 수신과 매칭 진행은 회원 채널이 필요해요."
                  className="inline-flex"
                >
                  <span className="inline-flex items-center justify-center h-12 px-7 rounded-lg bg-brand text-ink-900 font-semibold text-base hover:bg-brand-400 shadow-sm">
                    <Lock className="h-4 w-4 mr-2" />
                    회원으로 요청 등록
                  </span>
                </LoginGate>
              ) : (
                <Button variant="brand" size="lg" disabled>
                  <Lock className="h-4 w-4 mr-2" />
                  회원으로 요청 등록
                </Button>
              )
            ) : (
              <Button
                variant="brand"
                size="lg"
                onClick={() => setStep(step + 1)}
                disabled={!canNext()}
              >
                다음 단계
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </Card>

        {/* Trust signal */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: <Users className="h-5 w-5" />, value: "1,800+", label: "검증된 제작자" },
            { icon: <Clock className="h-5 w-5" />, value: "30분", label: "평균 첫 제안 시간" },
            { icon: <CheckCircle2 className="h-5 w-5" />, value: "98%", label: "매칭 성공률" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <div className="text-ink-400">{s.icon}</div>
              <div className="font-extrabold text-lg text-ink-900">{s.value}</div>
              <div className="text-xs text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
