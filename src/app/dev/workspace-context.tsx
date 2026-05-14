"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { members, getMember, type Member } from "@/data/workspace";

interface WorkspaceContextValue {
  currentUserId: string;
  setCurrentUserId: (id: string) => void;
  currentUser: Member;
}

const Ctx = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  // 기본 시뮬레이션 사용자: 마스터
  const [currentUserId, setCurrentUserId] = useState<string>("u-master");
  const currentUser = getMember(currentUserId) ?? members[0];

  return (
    <Ctx.Provider value={{ currentUserId, setCurrentUserId, currentUser }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWorkspace must be used within <WorkspaceProvider>");
  return ctx;
}
