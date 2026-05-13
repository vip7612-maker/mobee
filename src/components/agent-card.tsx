import Link from "next/link";
import Image from "next/image";
import { Star, MessageCircle, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatCount, getPortrait, getPersonaName } from "@/lib/utils";
import type { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  variant?: "default" | "compact";
}

export function AgentCard({ agent, variant = "default" }: AgentCardProps) {
  const portrait = getPortrait(agent.id);
  const persona = getPersonaName(agent.id);

  return (
    <Link href={`/agents/${agent.id}`}>
      <Card className="group h-full overflow-hidden hover:shadow-xl hover:border-ink-300 transition-all bg-white">
        {/* 프로필 사진 영역 */}
        <div className="relative aspect-[4/3] bg-ink-50 overflow-hidden">
          <Image
            src={portrait}
            alt={persona}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover grayscale-[0.05] group-hover:scale-[1.04] transition-transform duration-500"
          />
          {/* 사진 위 오버레이 */}
          <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between gap-2">
            <div className="flex gap-1.5">
              {agent.isHot && <Badge variant="hot">🔥 HOT</Badge>}
              {agent.isNew && <Badge variant="new">NEW</Badge>}
              {agent.isFree && <Badge variant="default">무료</Badge>}
            </div>
            <Badge variant="outline" className="bg-white/95 backdrop-blur-sm">
              {agent.creatorLevel}
            </Badge>
          </div>
          {/* 사진 하단 그라데이션 + 이름 */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent p-3 pt-12">
            <div className="text-[11px] text-white/80 flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {agent.category}
            </div>
            <div className="font-bold text-white text-base mt-0.5 leading-tight">
              {persona}
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-ink-600">
              {agent.name}
            </h3>
            {variant === "default" && (
              <p className="text-sm text-ink-500 line-clamp-2">{agent.description}</p>
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
