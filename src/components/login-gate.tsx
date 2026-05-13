"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { Lock, X, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface LoginGateProps {
  children: ReactNode;
  action?: string;
  description?: string;
  className?: string;
}

/**
 * 자식을 감싸 클릭 시 로그인 안내 모달을 띄움.
 * 로그인 필요한 액션(구매·요청 제출·등록 등)에 사용.
 */
export function LoginGate({ children, action = "이 작업", description, className }: LoginGateProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={className}
      >
        {children}
      </button>
      {open && (
        <LoginModal
          action={action}
          description={description}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function LoginModal({
  action,
  description,
  onClose,
}: {
  action: string;
  description?: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md p-7 md:p-9 shadow-2xl border-0"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-ink-50 transition-colors"
          aria-label="닫기"
        >
          <X className="h-4 w-4 text-ink-500" />
        </button>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand mb-5">
          <Lock className="h-6 w-6 text-ink-900" strokeWidth={2.5} />
        </div>

        <h2 className="text-2xl font-extrabold text-ink-900 mb-2">
          {action}은 회원만 가능해요
        </h2>
        <p className="text-sm text-ink-500 leading-relaxed mb-6">
          {description ||
            "Mobee에 로그인하면 매칭 이력 저장, 알림 받기, 결제·요청 진행이 모두 가능해요. 둘러보기는 로그인 없이 자유롭게 가능합니다."}
        </p>

        <div className="space-y-2 mb-5">
          <Button variant="brand" size="lg" className="w-full" asChild>
            <Link href="/login">
              <Mail className="h-4 w-4 mr-2" />
              이메일로 시작하기
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link href="/login?provider=kakao">
              <span className="w-5 h-5 rounded-sm bg-[#FEE500] inline-flex items-center justify-center mr-2 text-[10px] font-extrabold text-ink-900">
                K
              </span>
              카카오로 1초 시작
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link href="/login?provider=google">
              <span className="w-5 h-5 inline-flex items-center justify-center mr-2 text-sm font-extrabold">
                G
              </span>
              구글로 시작
            </Link>
          </Button>
        </div>

        <div className="text-center text-xs text-ink-500">
          아직 회원이 아니세요?{" "}
          <Link href="/signup" className="font-semibold text-ink-900 hover:underline">
            회원가입
          </Link>
        </div>

        <div className="mt-5 pt-5 border-t border-ink-100 flex items-center justify-between">
          <span className="text-xs text-ink-400">로그인 없이도</span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-ink-700 hover:text-ink-900 inline-flex items-center gap-1"
          >
            계속 둘러보기 <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </Card>
    </div>
  );
}
