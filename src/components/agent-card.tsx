import Link from "next/link";
import { Star, MessageCircle, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BeeMark } from "@/components/layout/logo";
import {
  formatPrice,
  formatCount,
  getPersonaName,
  getPersonaFull,
  getPersonaCode,
  getRobotAccent,
  getRobotShellTone,
} from "@/lib/utils";
import type { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  variant?: "default" | "compact";
}

const SHELL_STYLES: Record<
  ReturnType<typeof getRobotShellTone>,
  { bg: string; code: string; sub: string; grid: string; bee: string; label: string }
> = {
  silver: {
    bg: "bg-ink-100",
    code: "text-ink-900",
    sub: "text-ink-500",
    grid: "rgba(33,33,33,0.05)",
    bee: "opacity-60",
    label: "MOBEE · SILVER",
  },
  graphite: {
    bg: "bg-ink-900",
    code: "text-white",
    sub: "text-white/40",
    grid: "rgba(255,255,255,0.05)",
    bee: "opacity-40",
    label: "MOBEE · GRAPHITE",
  },
  champagne: {
    bg: "bg-cream",
    code: "text-ink-900",
    sub: "text-ink-700",
    grid: "rgba(33,33,33,0.05)",
    bee: "opacity-50",
    label: "MOBEE · CHAMPAGNE",
  },
};

export function AgentCard({ agent, variant = "default" }: AgentCardProps) {
  const persona = getPersonaName(agent.id);
  const full = getPersonaFull(agent.id);
  const code = getPersonaCode(agent.id);
  const accent = getRobotAccent(agent.categoryId);
  const shell = SHELL_STYLES[getRobotShellTone(agent.id)];

  return (
    <Link href={`/agents/${agent.id}`}>
      <Card className="group h-full overflow-hidden hover:shadow-xl hover:border-ink-300 transition-all bg-white">
        {/* 로봇 모델 placeholder */}
        <div className={`relative aspect-[4/3] ${shell.bg} overflow-hidden`}>
          {/* 격자 무늬 */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `linear-gradient(${shell.grid} 1px, transparent 1px), linear-gradient(90deg, ${shell.grid} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          {/* 상단 뱃지 */}
          <div className="absolute inset-x-0 top-0 z-10 p-3 flex items-start justify-between gap-2">
            <div className="flex gap-1.5">
              {agent.isHot && <Badge variant="hot">🔥 HOT</Badge>}
              {agent.isNew && <Badge variant="new">NEW</Badge>}
              {agent.isFree && <Badge variant="default">무료</Badge>}
            </div>
            <Badge variant="outline" className="bg-white/95 backdrop-blur-sm">
              {agent.creatorLevel}
            </Badge>
          </div>

          {/* 가운데 시리얼 영역 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:scale-[1.04] transition-transform duration-500">
            <BeeMark className={`h-8 w-8 mb-2 ${shell.bee}`} />
            <div className={`text-[9px] font-mono tracking-[0.3em] uppercase ${shell.sub}`}>
              {shell.label}
            </div>
            <div className={`font-extrabold text-5xl md:text-6xl tracking-tight ${shell.code} mt-1`}>
              {code}
            </div>
            {/* LED + 모델 메타 */}
            <div className={`mt-2 flex items-center gap-1.5 text-[10px] font-mono ${shell.sub}`}>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
                aria-hidden
              />
              <Cpu className="h-2.5 w-2.5" />
              <span>{agent.platforms[0] || "GPT-4"}</span>
            </div>
          </div>

          {/* 좌하단 LED 상태등 */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 z-10">
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
              aria-hidden
            />
            <span className={`text-[9px] font-mono tracking-widest ${shell.sub}`}>ONLINE</span>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-base text-ink-900">{persona}</span>
              <span className="text-[11px] text-ink-400">({full})</span>
            </div>
            <div className="text-xs text-ink-500">{agent.category}</div>
          </div>

          <div>
            <h3 className="font-bold text-sm leading-snug line-clamp-2 text-ink-800">
              {agent.name}
            </h3>
            {variant === "default" && (
              <p className="mt-1 text-xs text-ink-500 line-clamp-2">{agent.description}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {agent.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="tag" className="text-[10px]">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-ink-50">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="flex items-center gap-1 text-ink-900 font-semibold">
                <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                {agent.rating.toFixed(1)}
              </span>
              <span className="text-ink-400">({agent.reviewCount})</span>
              <span className="flex items-center gap-1 text-ink-500">
                <MessageCircle className="h-3.5 w-3.5" />
                {formatCount(agent.orderCount)}
              </span>
            </div>
            <div className="text-right">
              {agent.isFree ? (
                <span className="font-bold text-base text-ink-900">무료</span>
              ) : (
                <>
                  <div className="text-[10px] text-ink-400">월</div>
                  <div className="font-extrabold text-base text-ink-900">
                    {formatPrice(agent.startPrice)}원
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
