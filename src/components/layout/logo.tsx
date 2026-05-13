import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function BeeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-44 -44 88 88" className={className} role="img" aria-label="Mobee">
      {/* 왼쪽 날개 */}
      <ellipse cx="-15" cy="-12" rx="14" ry="18" fill="#FFFFFF" stroke="#212121" strokeWidth="1.2" opacity="0.85" transform="rotate(-25 -15 -12)" />
      {/* 오른쪽 날개 */}
      <ellipse cx="15" cy="-12" rx="14" ry="18" fill="#FFFFFF" stroke="#212121" strokeWidth="1.2" opacity="0.85" transform="rotate(25 15 -12)" />
      {/* 몸통 */}
      <ellipse cx="0" cy="0" rx="30" ry="28" fill="#FFC107" stroke="#212121" strokeWidth="1.8" />
      {/* 줄무늬 상단 */}
      <path d="M -25 -5 Q 0 -11 25 -5 L 25 2 Q 0 -3 -25 2 Z" fill="#212121" />
      {/* 줄무늬 하단 */}
      <path d="M -27 10 Q 0 16 27 10 L 27 17 Q 0 23 -27 17 Z" fill="#212121" />
      {/* 눈 */}
      <circle cx="-9" cy="-10" r="3" fill="#212121" />
      <circle cx="9" cy="-10" r="3" fill="#212121" />
      <circle cx="-8" cy="-11" r="1" fill="#FFFFFF" />
      <circle cx="10" cy="-11" r="1" fill="#FFFFFF" />
      {/* 미소 */}
      <path d="M -5 -3 Q 0 1 5 -3" fill="none" stroke="#212121" strokeWidth="1.3" strokeLinecap="round" />
      {/* 더듬이 왼쪽 */}
      <path d="M -7 -26 Q -12 -33 -14 -38" fill="none" stroke="#212121" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="-14" cy="-39" r="2" fill="#212121" />
      {/* 더듬이 오른쪽 */}
      <path d="M 7 -26 Q 12 -33 14 -38" fill="none" stroke="#212121" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="14" cy="-39" r="2" fill="#212121" />
    </svg>
  );
}

export function FullLogo({ className, width = 280, height = 150 }: { className?: string; width?: number; height?: number }) {
  return (
    <Image
      src="/brand/mobee-logo-full.svg"
      alt="Mobee · 모두의 AI 비서"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}

const sizes = {
  sm: { mark: "h-8 w-8", text: "text-base", sub: "text-[10px]" },
  md: { mark: "h-10 w-10", text: "text-xl", sub: "text-[11px]" },
  lg: { mark: "h-14 w-14", text: "text-2xl", sub: "text-xs" },
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const s = sizes[size];
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <BeeMark className={cn(s.mark, "transition-transform group-hover:rotate-[-8deg] shrink-0")} />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={cn("font-extrabold tracking-tight text-ink-900", s.text)}>
            Mobee
          </span>
          <span className={cn("text-ink-500 font-medium tracking-wide", s.sub)}>
            모두의 AI 비서
          </span>
        </div>
      )}
    </Link>
  );
}
