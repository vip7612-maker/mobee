import Link from "next/link";
import { Star, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatCount } from "@/lib/utils";
import type { Agent } from "@/data/agents";

interface AgentCardProps {
  agent: Agent;
  variant?: "default" | "compact";
}

export function AgentCard({ agent, variant = "default" }: AgentCardProps) {
  return (
    <Link href={`/agents/${agent.id}`}>
      <Card className="group h-full overflow-hidden hover:shadow-lg hover:border-ink-200 transition-all">
        <div className="aspect-[5/3] bg-gradient-to-br from-brand-100 via-brand-50 to-white relative flex items-center justify-center">
          <span className="text-6xl">{agent.thumbnail}</span>
          <div className="absolute top-3 left-3 flex gap-1.5">
            {agent.isHot && <Badge variant="hot">🔥 HOT</Badge>}
            {agent.isNew && <Badge variant="new">NEW</Badge>}
            {agent.isFree && <Badge variant="default">무료</Badge>}
          </div>
          <Badge variant="outline" className="absolute top-3 right-3 bg-white/90">
            {agent.creatorLevel}
          </Badge>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-ink-500">
              <span>{agent.category}</span>
              <span>·</span>
              <span>{agent.creator}</span>
            </div>
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

          <div className="flex items-center justify-between pt-1 border-t border-ink-50">
            <div className="flex items-center gap-3 text-xs">
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
                  <div className="text-[10px] text-ink-400">시작가</div>
                  <div className="font-bold text-base text-ink-900">
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
