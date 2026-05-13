"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BeeMark } from "@/components/layout/logo";

function LoginInner() {
  const params = useSearchParams();
  const provider = params.get("provider");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-ink-50/40 min-h-[calc(100vh-4rem)] py-10">
      <div className="container max-w-md">
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
            Mobee에 오신 것을 환영합니다
          </h1>
          <p className="text-sm text-ink-500 text-center mb-8">
            나에게 맞는 AI 비서를 만나러 가요
          </p>

          {provider === "kakao" && (
            <div className="bg-[#FEE500] rounded-xl p-4 mb-5 flex items-center gap-3">
              <span className="w-9 h-9 rounded-md bg-ink-900 text-[#FEE500] inline-flex items-center justify-center text-base font-extrabold">
                K
              </span>
              <div className="text-sm">
                <div className="font-bold text-ink-900">카카오로 로그인 중…</div>
                <div className="text-xs text-ink-700">잠시만 기다려주세요 (데모)</div>
              </div>
            </div>
          )}
          {provider === "google" && (
            <div className="bg-white border border-ink-200 rounded-xl p-4 mb-5 flex items-center gap-3">
              <span className="w-9 h-9 rounded-md inline-flex items-center justify-center text-base font-extrabold">
                G
              </span>
              <div className="text-sm">
                <div className="font-bold text-ink-900">구글로 로그인 중…</div>
                <div className="text-xs text-ink-500">잠시만 기다려주세요 (데모)</div>
              </div>
            </div>
          )}

          <div className="space-y-3 mb-5">
            <Button variant="outline" size="lg" className="w-full justify-start gap-3 h-12" asChild>
              <Link href="/login?provider=kakao">
                <span className="w-6 h-6 rounded-md bg-[#FEE500] inline-flex items-center justify-center text-xs font-extrabold text-ink-900">
                  K
                </span>
                카카오로 1초 시작
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full justify-start gap-3 h-12" asChild>
              <Link href="/login?provider=google">
                <span className="w-6 h-6 inline-flex items-center justify-center text-sm font-extrabold">G</span>
                구글로 시작
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-t border-ink-100" />
            <span className="text-xs text-ink-400">또는 이메일로</span>
            <div className="flex-1 border-t border-ink-100" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-ink-900 mb-1.5">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-ink-900">비밀번호</label>
                <Link href="/forgot" className="text-xs text-ink-500 hover:text-ink-900 underline-offset-2 hover:underline">
                  비밀번호 찾기
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button variant="brand" size="lg" className="w-full" type="submit">
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-ink-500">
            아직 회원이 아니세요?{" "}
            <Link href="/signup" className="font-semibold text-ink-900 hover:underline">
              회원가입
            </Link>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-ink-500 hover:text-ink-900 inline-flex items-center gap-1"
          >
            로그인 없이 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center text-ink-500">불러오는 중…</div>}>
      <LoginInner />
    </Suspense>
  );
}
