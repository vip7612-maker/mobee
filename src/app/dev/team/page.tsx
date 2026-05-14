"use client";

import { useMemo, useState } from "react";
import { Crown, Shield, User, Lock, Check, X, UserPlus, Settings, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "../workspace-context";
import {
  members as seedMembers,
  teams,
  canManage,
  MASTER_EMAIL,
  type Member,
  type PermissionMap,
  type Role,
} from "@/data/workspace";
import { cn } from "@/lib/utils";

const ROLE_LABEL: Record<Role, string> = {
  master: "마스터",
  lead: "팀장",
  member: "팀원",
};

const ROLE_ICON: Record<Role, React.ComponentType<{ className?: string }>> = {
  master: Crown,
  lead: Shield,
  member: User,
};

// 권한 카테고리·행동 메타
const PERMISSION_GROUPS: {
  key: keyof PermissionMap;
  label: string;
  actions: { key: string; label: string }[];
}[] = [
  { key: "ideas",    label: "💡 아이디어 보드", actions: [{ key: "view", label: "조회" }, { key: "create", label: "등록" }, { key: "edit", label: "수정" }, { key: "delete", label: "삭제" }] },
  { key: "projects", label: "🛠️ 프로젝트",      actions: [{ key: "view", label: "조회" }, { key: "create", label: "생성" }, { key: "edit", label: "편집" }, { key: "assign", label: "담당자 지정" }] },
  { key: "products", label: "🚀 판매 제품",      actions: [{ key: "view", label: "조회" }, { key: "edit", label: "편집" }, { key: "publish", label: "출시·중지" }, { key: "revenue", label: "매출 열람" }] },
  { key: "team",     label: "👥 팀",             actions: [{ key: "viewAll", label: "전체 조회" }, { key: "manageRoles", label: "역할 변경" }, { key: "managePermissions", label: "권한 설정" }] },
];

export default function TeamPage() {
  const { currentUser } = useWorkspace();
  const [members, setMembers] = useState<Member[]>(seedMembers);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingTarget = editingId ? members.find((m) => m.id === editingId) : null;
  const editable = editingTarget ? canManage(currentUser, editingTarget) : false;

  function togglePermission(memberId: string, group: keyof PermissionMap, action: string) {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;
        const next = { ...m.permissions };
        const grp = { ...(next[group] as Record<string, boolean>) };
        grp[action] = !grp[action];
        (next as Record<string, unknown>)[group] = grp;
        return { ...m, permissions: next };
      })
    );
  }

  function changeRole(memberId: string, role: Role) {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, role } : m)));
  }

  return (
    <div className="p-6 lg:p-8">
      {/* 헤더 */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-xs font-mono tracking-widest text-ink-400 mb-1">TEAM · 팀·권한 관리</div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900">팀과 권한</h1>
          <p className="text-ink-500 mt-1 text-sm">
            마스터 ({MASTER_EMAIL})는 모든 멤버의 역할·권한을 수정할 수 있고,
            팀장은 자기 팀원의 권한만 수정할 수 있어요.
          </p>
        </div>
        {currentUser.role === "master" ? (
          <Button variant="brand" size="lg">
            <UserPlus className="h-4 w-4 mr-1" />
            멤버 초대
          </Button>
        ) : (
          <span className="text-xs text-ink-400 inline-flex items-center gap-1">
            <Lock className="h-3 w-3" /> 멤버 초대는 마스터만 가능
          </span>
        )}
      </div>

      {/* 팀별 멤버 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          {/* 마스터 카드 별도 */}
          <MasterCard master={members.find((m) => m.role === "master")!} />

          {teams.map((team) => {
            const lead = members.find((m) => m.id === team.leadId);
            const teamMembers = members.filter((m) => team.memberIds.includes(m.id));
            return (
              <Card key={team.id} className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{team.emoji}</span>
                    <div>
                      <h2 className="font-bold text-ink-900">{team.name}</h2>
                      <p className="text-xs text-ink-500">{team.focus}</p>
                    </div>
                  </div>
                  <Badge variant="soft">{teamMembers.length + 1}명</Badge>
                </div>
                {lead && (
                  <MemberRow
                    member={lead}
                    currentUser={currentUser}
                    onEdit={() => setEditingId(lead.id)}
                    onRoleChange={(role) => changeRole(lead.id, role)}
                    isEditing={editingId === lead.id}
                  />
                )}
                <div className="mt-2 space-y-1">
                  {teamMembers.map((m) => (
                    <MemberRow
                      key={m.id}
                      member={m}
                      currentUser={currentUser}
                      onEdit={() => setEditingId(m.id)}
                      onRoleChange={(role) => changeRole(m.id, role)}
                      isEditing={editingId === m.id}
                    />
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* 우측: 권한 편집 패널 */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Settings className="h-4 w-4 text-ink-700" />
              <h3 className="font-bold text-ink-900">권한 설정 패널</h3>
            </div>
            {!editingTarget ? (
              <p className="text-xs text-ink-500 mt-2">
                좌측에서 멤버를 클릭하면 권한을 편집할 수 있어요.
              </p>
            ) : (
              <>
                <div className="mt-3 p-3 rounded-lg bg-ink-50 flex items-center gap-3">
                  <span className="text-2xl">{editingTarget.avatar}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-ink-900 text-sm truncate">{editingTarget.name}</div>
                    <div className="text-[11px] text-ink-500 truncate">{editingTarget.email}</div>
                  </div>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-ink-400 hover:text-ink-700"
                    aria-label="닫기"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {!editable ? (
                  <div className="mt-3 p-3 bg-amber-50 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                    <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <div>
                      <strong>편집 권한이 없어요.</strong>
                      <br />마스터는 모두를, 팀장은 자기 팀원만 수정할 수 있어요.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* 역할 변경 (마스터만) */}
                    {currentUser.role === "master" && editingTarget.role !== "master" && (
                      <div className="mt-4">
                        <div className="text-[10px] font-mono tracking-widest text-ink-400 mb-1.5">ROLE</div>
                        <div className="flex gap-1.5">
                          {(["lead", "member"] as Role[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => changeRole(editingTarget.id, r)}
                              className={cn(
                                "flex-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                                editingTarget.role === r
                                  ? "bg-ink-900 text-white"
                                  : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                              )}
                            >
                              {ROLE_LABEL[r]}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 권한 그룹 */}
                    <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                      {PERMISSION_GROUPS.map((group) => (
                        <div key={group.key}>
                          <div className="text-xs font-bold text-ink-900 mb-1.5">{group.label}</div>
                          <div className="space-y-1">
                            {group.actions.map((act) => {
                              const enabled = (editingTarget.permissions[group.key] as Record<string, boolean>)[act.key];
                              return (
                                <button
                                  key={act.key}
                                  onClick={() => togglePermission(editingTarget.id, group.key, act.key)}
                                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs hover:bg-ink-50 transition-colors"
                                >
                                  <span className="text-ink-700">{act.label}</span>
                                  <span className={cn(
                                    "inline-flex items-center justify-center h-5 w-9 rounded-full transition-colors",
                                    enabled ? "bg-brand" : "bg-ink-200"
                                  )}>
                                    <span className={cn(
                                      "inline-block h-3 w-3 rounded-full bg-white shadow transition-transform",
                                      enabled ? "translate-x-2" : "-translate-x-2"
                                    )} />
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </Card>

          {/* 권한 위계 가이드 */}
          <Card className="mt-4 p-4 bg-ink-900 text-white border-0">
            <div className="text-[10px] font-mono tracking-widest text-brand mb-2">RBAC HIERARCHY</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Crown className="h-3.5 w-3.5 text-brand mt-0.5 shrink-0" />
                <span><strong>마스터</strong> — 모든 권한, 역할·권한 변경, 팀 생성</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-3.5 w-3.5 text-brand mt-0.5 shrink-0" />
                <span><strong>팀장</strong> — 자기 팀 모든 작업 + 자기 팀원 권한만 변경</span>
              </div>
              <div className="flex items-start gap-2">
                <User className="h-3.5 w-3.5 text-brand mt-0.5 shrink-0" />
                <span><strong>팀원</strong> — 권한 설정에 따른 조회·작성. 권한 변경 불가</span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function MasterCard({ master }: { master: Member }) {
  return (
    <Card className="p-5 bg-ink-900 text-white border-0 relative overflow-hidden">
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand rounded-full opacity-90" />
      <div className="relative">
        <Badge variant="brand" className="mb-3">
          <Crown className="h-3 w-3 mr-1" /> MASTER
        </Badge>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{master.avatar}</span>
          <div>
            <div className="font-bold text-xl">{master.name}</div>
            <div className="text-sm text-white/70 inline-flex items-center gap-1">
              <Mail className="h-3 w-3" /> {master.email}
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-white/70 max-w-md">
          마스터는 워크스페이스 최상위 권한자입니다. 모든 팀의 자료를 열람·편집할 수 있고,
          팀장 임명·권한 변경·멤버 초대까지 모두 가능해요.
        </p>
      </div>
    </Card>
  );
}

function MemberRow({
  member,
  currentUser,
  onEdit,
  onRoleChange,
  isEditing,
}: {
  member: Member;
  currentUser: Member;
  onEdit: () => void;
  onRoleChange: (role: Role) => void;
  isEditing: boolean;
}) {
  const Icon = ROLE_ICON[member.role];
  const editable = canManage(currentUser, member);
  return (
    <button
      onClick={onEdit}
      disabled={!editable && currentUser.role !== "master"}
      className={cn(
        "w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors",
        isEditing ? "bg-brand-50 ring-2 ring-ink-900" : "hover:bg-ink-50",
        !editable && currentUser.role !== "master" && "opacity-60 cursor-not-allowed"
      )}
    >
      <span className="text-2xl">{member.avatar}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-ink-900 truncate">{member.name}</span>
          <span className={cn(
            "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold",
            member.role === "lead" ? "bg-ink-900 text-brand" : "bg-ink-100 text-ink-700"
          )}>
            <Icon className="h-2.5 w-2.5" />
            {ROLE_LABEL[member.role]}
          </span>
          {member.status !== "active" && (
            <Badge variant="soft" className="text-[9px]">
              {member.status === "invited" ? "초대됨" : "정지"}
            </Badge>
          )}
        </div>
        <div className="text-[11px] text-ink-500 truncate">{member.email}</div>
      </div>
      <div className="text-[10px] text-ink-400 text-right shrink-0">
        {editable ? <Settings className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
      </div>
    </button>
  );
}
