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

// 30~50대 비중을 높인 portrait 시드 (randomuser.me)
// 사용자가 보기에 직장인·전문가 인상으로 보이는 ID들로 큐레이션
const PORTRAITS = [
  "men/32", "women/41", "men/45", "women/52", "men/68",
  "women/65", "men/55", "women/49", "men/71", "women/38",
  "men/47", "women/71", "men/35", "women/55", "men/52",
  "women/46", "men/64", "women/58", "men/41", "women/42",
  "men/56", "women/61", "men/38", "women/35", "men/62",
  "women/53", "men/48", "women/68", "men/59", "women/45",
];

const NAMES = [
  "김수정 (38)", "박지영 (42)", "이준호 (35)", "최은지 (45)", "정태경 (52)",
  "한미경 (48)", "오재석 (41)", "윤소영 (39)", "강현우 (54)", "임수민 (36)",
  "신호철 (47)", "백지현 (43)", "조성훈 (38)", "권유진 (46)", "장민규 (51)",
  "노혜경 (44)", "서대원 (49)", "황지연 (40)", "남기홍 (37)", "문선아 (42)",
  "유경수 (53)", "전미라 (45)", "차상현 (39)", "안지수 (36)", "구본진 (50)",
  "송예린 (43)", "배준영 (46)", "홍서윤 (48)", "양태우 (52)", "양혜정 (41)",
];

export function getPortrait(agentId: string): string {
  const idNum = parseInt(agentId.replace(/\D/g, ""), 10) || 0;
  const seed = PORTRAITS[idNum % PORTRAITS.length];
  return `https://randomuser.me/api/portraits/${seed}.jpg`;
}

export function getPersonaName(agentId: string): string {
  const idNum = parseInt(agentId.replace(/\D/g, ""), 10) || 0;
  return NAMES[idNum % NAMES.length];
}
