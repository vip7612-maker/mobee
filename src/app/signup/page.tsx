"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BeeMark } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const benefits = [
  "매칭 이력 저장 + AI 추천 정확도 향상",
  "결제·요청서 진행 + 알림 받기",
  "847개 무료 비서 즉시 사용",
  "교육·NGO 50% 할인 신청 가능",
];

const userTypes = [
  { id: "personal", label: "개인 사용자", desc: "내 업무에 맞는 비서를 찾고 싶어요" },
  { id: "team", label: "팀·조직", desc: "팀과 함께 쓸 비서가 필요해요" },
  { id: "creator", label: "제작자", desc: "AI 비서를 만들어 등록·판매하고 싶어요" },
];

export default function SignupPage() {
  const [userType, setUserType] = useState("personal");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="bg-ink-50/40 min-h-[calc(100vh-4rem)] py-10">
      <div className="container max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          홈으로
        </Link>

        <Card className="p-8 md:p-10">
          <div className="flex justify-center mb-6">
            <BeeMark className="h-14 w-14" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900 text-center mb-2">
            Mobee 회원 시작하기
          </h1>
          <p className="text-sm text-ink-500 text-center mb-7">
            가입은 무료. 결제·요청 시에만 회원 정보가 필요해요.
          </p>

          {/* 혜택 */}
          <div className="bg-cream rounded-xl p-4 mb-6">
            <div className="font-bold text-sm text-ink-900 mb-2">🐝 회원이 되면</div>
            <ul className="space-y-1">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-ink-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-700 shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-2">
                어떤 분이세요?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {userTypes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setUserType(t.id)}
                    className={cn(
                      "px-3 py-3 rounded-xl border-2 text-left transition-all",
                      userType === t.id
                        ? "border-ink-900 bg-brand-50"
                        : "border-ink-100 hover:border-ink-300"
                    )}
                  >
                    <div className="text-sm font-bold text-ink-900">{t.label}</div>
                    <div className="text-[11px] text-ink-500 mt-0.5 leading-tight">
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-1.5">이름</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-1.5">이메일</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-1.5">비밀번호</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8자 이상"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-ink-700 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-ink-900"
              />
              <span>
                <strong className="text-ink-900">이용약관</strong> 및{" "}
                <strong className="text-ink-900">개인정보처리방침</strong>에 동의해요. 만 14세 이상이에요.
              </span>
            </label>

            <Button variant="brand" size="lg" className="w-full" disabled={!agreed}>
              무료로 회원가입
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-ink-100" />
            <span className="text-xs text-ink-400">또는 소셜 계정으로</span>
            <div className="flex-1 border-t border-ink-100" />
          </div>

          <div className="space-y-2">
            <Button variant="outline" size="lg" className="w-full justify-start gap-3 h-12" asChild>
              <Link href="/login?provider=kakao">
                <span className="w-6 h-6 rounded-md bg-[#FEE500] inline-flex items-center justify-center text-xs font-extrabold text-ink-900">
                  K
                </span>
                카카오로 1초 가입
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full justify-start gap-3 h-12" asChild>
              <Link href="/login?provider=google">
                <span className="w-6 h-6 inline-flex items-center justify-center text-sm font-extrabold">G</span>
                구글로 가입
              </Link>
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-ink-500">
            이미 회원이세요?{" "}
            <Link href="/login" className="font-semibold text-ink-900 hover:underline">
              로그인
            </Link>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-ink-500 hover:text-ink-900"
          >
            먼저 둘러보고 결정할게요
          </Link>
        </div>
      </div>
    </div>
  );
}
