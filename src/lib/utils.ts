import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export function formatCount(value: number) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}만`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}천`;
  return `${value}`;
}

// AI 로봇 모델 시리얼 (옵티머스 / 모비 시리즈)
// 사람이 아닌 AI 로봇임을 명확히 하기 위해 번호 체계 사용
const SERIALS = [
  "A03", "A07", "A12", "A18", "A21", "A24", "A29", "A36", "A42", "A47",
  "A51", "A58", "A63", "A67", "A74", "A79", "A83", "A88", "A92", "A97",
  "B04", "B11", "B17", "B23", "B28", "B34", "B39", "B45", "B52", "B59",
];

export function getPersonaCode(agentId: string): string {
  const idNum = parseInt(agentId.replace(/\D/g, ""), 10) || 0;
  return SERIALS[idNum % SERIALS.length];
}

export function getPersonaName(agentId: string): string {
  // 카드에 큰 글씨로 들어가는 짧은 호칭
  return `모비 ${getPersonaCode(agentId)}`;
}

export function getPersonaFull(agentId: string): string {
  // 풀네임 (부제)
  return `모두의비서 ${getPersonaCode(agentId)}`;
}

/**
 * 로봇 사진 경로.
 * 사용자가 web/public/personas/A36.jpg 식으로 옵티머스 무드의 로봇 사진을
 * 30장 업로드해두면 그것을 우선 사용. 지금은 자산이 없어 빈 문자열 반환 →
 * AgentCard 등 호출처에서 자체 디자인 placeholder로 렌더링.
 */
export function getPortrait(agentId: string): string {
  return `/personas/${getPersonaCode(agentId)}.jpg`;
}

// 카테고리별 LED 광원 컬러. 모비 유닛은 분야에 따라 페이스 LED 색이 다르다.
const CATEGORY_ACCENT: Record<string, string> = {
  cs: "#FF6B9D",
  marketing: "#FFD200",
  productivity: "#4ECDC4",
  data: "#5C7AEA",
  hr: "#B57BFF",
  dev: "#00E5A0",
  legal: "#FF7F50",
  sales: "#FFA94D",
  ecommerce: "#FF5454",
  finance: "#38C172",
  education: "#6DD5FA",
  etc: "#C9A0DC",
};

export type ShellTone = "silver" | "graphite" | "champagne";

export function getRobotAccent(categoryId: string): string {
  return CATEGORY_ACCENT[categoryId] ?? "#FFD200";
}

// 헬멧 외피 톤. 시리얼 코드에 따라 결정적으로 분포 (대다수 실버, 일부 그라파이트/샴페인).
export function getRobotShellTone(agentId: string): ShellTone {
  const idNum = parseInt(agentId.replace(/\D/g, ""), 10) || 0;
  const r = idNum % 7;
  if (r === 0) return "graphite";
  if (r === 3) return "champagne";
  return "silver";
}
