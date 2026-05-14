"use client";

import { useMemo, useState } from "react";
import { Calendar, GitBranch, CheckCircle2, Circle, Lock, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "../workspace-context";
import { projects, teams, getMember, getTeam, type Project } from "@/data/workspace";
import { cn } from "@/lib/utils";

const STAGE_LABEL: Record<Project["stage"], { label: string; color: string }> = {
  design:      { label: "🎨 디자인",   color: "bg-blue-50 text-blue-700" },
  development: { label: "🛠️ 개발",    color: "bg-brand-100 text-ink-900" },
  testing:     { label: "🧪 테스트",   color: "bg-emerald-50 text-emerald-700" },
  review:      { label: "🚀 출시 직전", color: "bg-ink-900 text-brand" },
};

export default function ProjectsPage() {
  const { currentUser } = useWorkspace();
  const [stageFilter, setStageFilter] = useState<Project["stage"] | "all">("all");
  const [teamFilter, setTeamFilter] = useState<string | "all">("all");

  const visibleProjects = useMemo(() => {
    let list = [...projects];
    // 마스터는 전체, 팀장은 자기 팀 + 다른 팀(보기), 팀원은 자기 팀만
    if (currentUser.role === "member" && currentUser.teamId) {
      list = list.filter((p) => p.teamId === currentUser.teamId);
    }
    if (stageFilter !== "all") list = list.filter((p) => p.stage === stageFilter);
    if (teamFilter !== "all") list = list.filter((p) => p.teamId === teamFilter);
    return list;
  }, [currentUser, stageFilter, teamFilter]);

  const canCreate = currentUser.permissions.projects.create;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-xs font-mono tracking-widest text-ink-400 mb-1">PROJECTS · 개발 중</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900">진행 중인 비서 프로젝트</h1>
          <p className="text-ink-500 mt-1 text-sm">
            담당자가 정해져 개발이 진행 중인 에이전트들이에요. 단계·진행률·마일스톤을 추적해보세요.
          </p>
        </div>
        {canCreate ? (
          <Button variant="brand" size="lg">
            <Plus className="h-4 w-4 mr-1" />
            새 프로젝트
          </Button>
        ) : (
          <span className="text-xs text-ink-400 inline-flex items-center gap-1">
            <Lock className="h-3 w-3" /> 생성 권한 없음
          </span>
        )}
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="text-xs font-semibold text-ink-700 mr-1">단계:</span>
        {(["all", "design", "development", "testing", "review"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStageFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
              stageFilter === s ? "bg-ink-900 text-white" : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400"
            )}
          >
            {s === "all" ? "전체" : STAGE_LABEL[s as Project["stage"]].label}
          </button>
        ))}
        <span className="text-xs font-semibold text-ink-700 ml-3 mr-1">팀:</span>
        <button
          onClick={() => setTeamFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
            teamFilter === "all" ? "bg-ink-900 text-white" : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400"
          )}
        >
          전체
        </button>
        {teams.map((t) => (
          <button
            key={t.id}
            onClick={() => setTeamFilter(t.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
              teamFilter === t.id ? "bg-ink-900 text-white" : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400"
            )}
          >
            {t.emoji} {t.name}
          </button>
        ))}
      </div>

      {visibleProjects.length === 0 ? (
        <Card className="py-20 text-center text-ink-500">
          <div className="text-3xl mb-2">🤖</div>
          조건에 맞는 프로젝트가 없어요
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visibleProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const team = getTeam(project.teamId);
  const lead = getMember(project.leadId);
  const stage = STAGE_LABEL[project.stage];
  const doneMilestones = project.milestones.filter((m) => m.done).length;

  return (
    <Card className="p-5 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", stage.color)}>
              {stage.label}
            </span>
            {team && <Badge variant="tag" className="text-[10px]">{team.emoji} {team.name}</Badge>}
          </div>
          <h3 className="font-bold text-base text-ink-900 leading-snug">{project.name}</h3>
          <p className="text-xs text-ink-500 mt-1 line-clamp-2">{project.description}</p>
        </div>
      </div>

      {/* 진행률 */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[11px] mb-1">
          <span className="font-mono uppercase tracking-widest text-ink-500">PROGRESS</span>
          <span className="font-extrabold text-ink-900">{project.progress}%</span>
        </div>
        <div className="h-2 bg-ink-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand rounded-full transition-all"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* 마일스톤 */}
      <div className="mb-4 space-y-1">
        {project.milestones.slice(0, 5).map((m, i) => (
          <div key={i} className={cn("flex items-center gap-2 text-xs", m.done ? "text-ink-900" : "text-ink-400")}>
            {m.done ? <CheckCircle2 className="h-3.5 w-3.5 text-brand-700 shrink-0" /> : <Circle className="h-3.5 w-3.5 shrink-0" />}
            <span className={m.done ? "" : "line-through-none"}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* 푸터: 일정·팀 */}
      <div className="flex items-center justify-between pt-3 border-t border-ink-50 text-[11px]">
        <div className="flex items-center gap-1 text-ink-500">
          <Calendar className="h-3 w-3" />
          {project.startedAt} → <strong className="text-ink-900">{project.targetLaunch}</strong>
        </div>
        <div className="flex -space-x-1.5">
          {[lead, ...project.memberIds.map(getMember)].filter(Boolean).slice(0, 4).map((m) => (
            <span
              key={m!.id}
              title={`${m!.name} (${m!.role === "lead" ? "팀장" : "팀원"})`}
              className={cn(
                "inline-flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white text-[10px] font-bold",
                m!.role === "lead" ? "bg-brand text-ink-900" : "bg-ink-100 text-ink-700"
              )}
            >
              {m!.avatar}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 text-[10px] text-ink-400">
        <GitBranch className="inline h-3 w-3 mr-1" />
        {doneMilestones}/{project.milestones.length} 마일스톤 · 팀장 {lead?.name}
      </div>
    </Card>
  );
}
