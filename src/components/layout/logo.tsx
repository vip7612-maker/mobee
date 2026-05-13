import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function BeeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-90 -90 180 180" className={className} aria-label="Mobee">
      {/* 날개 */}
      <ellipse cx="-30" cy="-25" rx="22" ry="28" fill="#FFFFFF" stroke="#212121" strokeWidth="2.5" opacity="0.9" transform="rotate(-25 -30 -25)" />
      <ellipse cx="30" cy="-25" rx="22" ry="28" fill="#FFFFFF" stroke="#212121" strokeWidth="2.5" opacity="0.9" transform="rotate(25 30 -25)" />
      {/* 몸통 */}
      <ellipse cx="0" cy="0" rx="50" ry="46" fill="#FFC107" stroke="#212121" strokeWidth="3" />
      {/* 줄무늬 */}
      <path d="M -40 -10 Q 0 -18 40 -10 L 40 2 Q 0 -6 -40 2 Z" fill="#212121" />
      <path d="M -44 18 Q 0 26 44 18 L 44 30 Q 0 38 -44 30 Z" fill="#212121" />
      {/* 눈 */}
      <circle cx="-14" cy="-18" r="5" fill="#212121" />
      <circle cx="-12" cy="-20" r="1.6" fill="#FFFFFF" />
      <circle cx="14" cy="-18" r="5" fill="#212121" />
      <circle cx="16" cy="-20" r="1.6" fill="#FFFFFF" />
      {/* 미소 */}
      <path d="M -8 -6 Q 0 1 8 -6" fill="none" stroke="#212121" strokeWidth="2.2" strokeLinecap="round" />
      {/* 더듬이 */}
      <path d="M -12 -42 Q -20 -56 -22 -64" fill="none" stroke="#212121" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="-22" cy="-66" r="3.2" fill="#212121" />
      <path d="M 12 -42 Q 20 -56 22 -64" fill="none" stroke="#212121" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="22" cy="-66" r="3.2" fill="#212121" />
    </svg>
  );
}

const sizes = {
  sm: { mark: "h-7 w-7", text: "text-base", sub: "text-[10px]" },
  md: { mark: "h-9 w-9", text: "text-xl", sub: "text-[11px]" },
  lg: { mark: "h-12 w-12", text: "text-2xl", sub: "text-xs" },
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const s = sizes[size];
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
      <BeeMark className={cn(s.mark, "transition-transform group-hover:rotate-[-6deg]")} />
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={cn("font-extrabold tracking-tight text-ink-900", s.text)}>
            Mobee
          </span>
          <span className={cn("text-ink-500 font-medium tracking-wider", s.sub)}>
            모두의 AI 비서
          </span>
        </div>
      )}
    </Link>
  );
}
