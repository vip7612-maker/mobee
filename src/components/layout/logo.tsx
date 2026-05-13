import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-ink-900 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M12 2l2.39 4.84L20 8l-4 3.9L16.91 18 12 15.5 7.09 18 8 11.9 4 8l5.61-1.16L12 2z"
            fill="currentColor"
          />
        </svg>
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-ink-900 ring-2 ring-white" />
      </span>
      {showText && (
        <span className="font-extrabold text-xl tracking-tight text-ink-900">
          모두의<span className="text-ink-900">비서</span>
        </span>
      )}
    </Link>
  );
}
