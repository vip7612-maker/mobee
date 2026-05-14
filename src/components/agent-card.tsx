import Link from "next/link";
import { Star, MessageCircle, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RobotFace } from "@/components/robot-face";
import {
  formatPrice,
  formatCount,
  getPersonaName,
  getPersonaFull,
  getPersonaCode,
  getRobotAccent,
  getRobotShellTone,
  type ShellTone,
} from "@/lib/utils";
import type { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  variant?: "default" | "compact";
}

const TONE_LABEL: Record<ShellTone, string> = {
  silver: "MOBEE · SILVER",
  graphite: "MOBEE · GRAPHITE",
  champagne: "MOBEE · CHAMPAGNE",
};

export function AgentCard({ agent, variant = "default" }: AgentCardProps) {
  const persona = getPersonaName(agent.id);
  const full = getPersonaFull(agent.id);
  const code = getPersonaCode(agent.id);
  const accent = getRobotAccent(agent.categoryId);
  const tone = getRobotShellTone(agent.id);

  return (
    <Link href={`/agents/${agent.id}`}>
      <Card className="group h-full overflow-hidden hover:shadow-xl hover:border-ink-300 transition-all bg-white">
        {/* 실물 로봇 페이스 (옵티머스 스타일 SVG) */}
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
            <RobotFace serial={code} accent={accent} shellTone={tone} showSerial={false} />
          </div>

          {/* 상단 뱃지 */}
          <div className="absolute inset-x-0 top-0 z-10 p-3 flex items-start justify-between gap-2">
            <div className="flex gap-1.5">
              {agent.isHot && <Badge variant="hot">🔥 HOT</Badge>}
              {agent.isNew && <Badge variant="new">NEW</Badge>}
              {agent.isFree && <Badge variant="default">무료</Badge>}
            </div>
            <Badge
              variant="outline"
              className="bg-black/55 backdrop-blur-sm text-white border-white/25"
            >
              {agent.creatorLevel}
            </Badge>
          </div>

          {/* 좌하단 ONLINE 상태등 */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
              aria-hidden
            />
            <span className="text-[9px] font-mono tracking-widest text-white/75">
              ONLINE
            </span>
          </div>

          {/* 우하단 시리얼 라벨 */}
          <div className="absolute bottom-3 right-3 z-10 text-right">
            <div
              className="text-[8px] font-mono tracking-[0.3em] uppercase"
              style={{ color: accent, opacity: 0.85 }}
            >
              {TONE_LABEL[tone]}
            </div>
            <div className="font-extrabold text-xl text-white tracking-tight leading-none mt-0.5">
              {code}
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-extrabold text-base text-ink-900">{persona}</span>
              <span className="text-[11px] text-ink-400">({full})</span>
            </div>
            <div className="text-xs text-ink-500">{agent.category}</div>
          </div>

          <div>
            <h3 className="font-bold text-sm leading-snug line-clamp-2 text-ink-800 group-hover:text-ink-600">
              {agent.name}
            </h3>
            {variant === "default" && (
              <p className="mt-1 text-xs text-ink-500 line-clamp-2">{agent.description}</p>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-ink-400">
            <Cpu className="h-2.5 w-2.5" />
            <span className="tracking-wide">
              RUNTIME · {agent.platforms[0] || "GPT-4"}
            </span>
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
