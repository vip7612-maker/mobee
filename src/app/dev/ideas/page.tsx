"use client";

import { useMemo, useState } from "react";
import { Plus, ThumbsUp, MessageSquare, Lock, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "../workspace-context";
import { ideas as seedIdeas, getMember, getTeam, type Idea } from "@/data/workspace";
import { formatPrice, cn } from "@/lib/utils";

const COLUMNS: { id: Idea["status"]; label: string; hint: string; color: string }[] = [
  { id: "backlog",  label: "백로그",      hint: "새로 발의된 아이디어",  color: "bg-ink-100" },
  { id: "review",   label: "검토 중",     hint: "팀 단위 검토 진행",     color: "bg-brand-100" },
  { id: "assigned", label: "담당자 지정", hint: "곧 프로젝트로 전환",   color: "bg-brand" },
  { id: "rejected", label: "반려",        hint: "정책·범위·윤리 이슈",   color: "bg-ink-50" },
];

export default function IdeasPage() {
  const { currentUser } = useWorkspace();
  const [ideas, setIdeas] = useState<Idea[]>(seedIdeas);

  const grouped = useMemo(() => {
    return COLUMNS.reduce((acc, col) => {
      acc[col.id] = ideas.filter((i) => i.status === col.id);
      return acc;
    }, {} as Record<Idea["status"], Idea[]>);
  }, [ideas]);

  const canCreate = currentUser.permissions.ideas.create;
  const canMove = (idea: Idea) => {
    if (currentUser.permissions.ideas.edit) return true;
    if (currentUser.role === "lead" && idea.teamId === currentUser.teamId) return true;
    return idea.proposerId === currentUser.id;
  };

  function moveIdea(ideaId: string, to: Idea["status"]) {
    setIdeas((prev) => prev.map((i) => (i.id === ideaId ? { ...i, status: to } : i)));
  }

  return (
    <div className="p-6 lg:p-8">
      {/* 헤더 */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-xs font-mono tracking-widest text-ink-400 mb-1">IDEAS · 아이디어 보드</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900">에이전트 아이디어 칸반</h1>
          <p className="text-ink-500 mt-1 text-sm">
            제작자들끼리 새 비서 아이디어를 게시·논의하고, 담당자가 정해지면 프로젝트로 전환됩니다.
          </p>
        </div>
        {canCreate ? (
          <Button variant="brand" size="lg">
            <Plus className="h-4 w-4 mr-1" />
            아이디어 등록
          </Button>
        ) : (
          <div className="text-xs text-ink-400 inline-flex items-center gap-1">
            <Lock className="h-3 w-3" /> 등록 권한이 없어요
          </div>
        )}
      </div>

      {/* 칸반 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map((col) => (
          <div key={col.id} className="flex flex-col min-h-[60vh]">
            {/* 컬럼 헤더 */}
            <div className={cn("px-4 py-3 rounded-t-xl flex items-center justify-between", col.color)}>
              <div>
                <div className="font-extrabold text-sm text-ink-900">{col.label}</div>
                <div className="text-[10px] text-ink-700/70">{col.hint}</div>
              </div>
              <Badge variant="default" className="bg-ink-900 text-white text-[10px]">
                {grouped[col.id].length}
              </Badge>
            </div>
            {/* 카드들 */}
            <div className="bg-white/60 border border-ink-100 border-t-0 rounded-b-xl p-3 flex-1 space-y-3">
              {grouped[col.id].length === 0 && (
                <div className="text-center py-8 text-xs text-ink-400">아이디어 없음</div>
              )}
              {grouped[col.id].map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  canMove={canMove(idea)}
                  onMove={(to) => moveIdea(idea.id, to)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 푸터 안내 */}
      <Card className="mt-8 p-4 bg-ink-50 border-0 flex items-start gap-3">
        <Lock className="h-4 w-4 text-ink-500 mt-0.5 shrink-0" />
        <div className="text-xs text-ink-700 leading-relaxed">
          <strong>권한 안내:</strong> 마스터는 모든 칸반을 편집할 수 있고, 팀장은 자기 팀에 매칭된 아이디어와 자기 팀이 검토 중인 카드만,
          팀원은 자기가 발의한 카드만 옮길 수 있어요. 사이드바에서 사용자를 전환해 권한 차이를 직접 확인해보세요.
        </div>
      </Card>
    </div>
  );
}

function IdeaCard({
  idea,
  canMove,
  onMove,
}: {
  idea: Idea;
  canMove: boolean;
  onMove: (to: Idea["status"]) => void;
}) {
  const proposer = getMember(idea.proposerId);
  const assignee = idea.assigneeId ? getMember(idea.assigneeId) : null;
  const team = idea.teamId ? getTeam(idea.teamId) : null;

  return (
    <Card className="p-3 hover:shadow-md hover:border-ink-300 transition-all">
      <div className="flex items-start gap-2 mb-2">
        <Badge variant="tag" className="text-[10px] shrink-0">
          {idea.category}
        </Badge>
        {team && (
          <Badge variant="brand" className="text-[10px]">
            {team.emoji} {team.name}
          </Badge>
        )}
      </div>
      <h3 className="font-bold text-sm text-ink-900 leading-snug mb-1">{idea.title}</h3>
      <p className="text-xs text-ink-500 line-clamp-2 mb-3">{idea.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {idea.tags.slice(0, 3).map((t) => (
          <span key={t} className="text-[10px] text-ink-400">#{t}</span>
        ))}
      </div>
      {assignee && (
        <div className="text-[10px] text-ink-600 bg-cream rounded px-2 py-1 mb-3 inline-block">
          담당 {assignee.avatar} {assignee.name}
        </div>
      )}
      <div className="flex items-center justify-between text-[11px] text-ink-500 pt-2 border-t border-ink-50">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-0.5">
            <ThumbsUp className="h-3 w-3" /> {idea.upvotes}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <MessageSquare className="h-3 w-3" /> {idea.comments}
          </span>
        </div>
        <div className="text-[10px] text-ink-400">
          {proposer?.avatar} {proposer?.name}
        </div>
      </div>

      {/* 이동 액션 */}
      {canMove ? (
        <div className="mt-3 pt-3 border-t border-ink-50">
          <div className="text-[9px] font-mono uppercase tracking-widest text-ink-400 mb-1.5">Move to</div>
          <div className="flex gap-1">
            {COLUMNS.filter((c) => c.id !== idea.status).map((c) => (
              <button
                key={c.id}
                onClick={() => onMove(c.id)}
                className="flex-1 text-[10px] py-1 rounded bg-ink-50 hover:bg-ink-900 hover:text-white text-ink-700 transition-colors font-medium"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-3 pt-3 border-t border-ink-50 flex items-center gap-1 text-[10px] text-ink-400">
          <Lock className="h-3 w-3" /> 이동 권한 없음
        </div>
      )}

      {/* 예상 정보 */}
      {idea.estimatedBudget > 0 && (
        <div className="mt-2 flex items-center justify-between text-[10px] text-ink-400">
          <span>예상 {idea.estimatedDays}일</span>
          <span>예산 {formatPrice(idea.estimatedBudget)}원</span>
        </div>
      )}
    </Card>
  );
}
