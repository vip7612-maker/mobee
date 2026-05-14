/**
 * 개발자 워크스페이스 더미 데이터 + 권한 모델
 *
 * 실제 인증/DB 연결은 다음 단계. 지금은 RBAC 시뮬레이션용.
 *
 * 권한 모델
 *  - master : 최상위. 마스터 이메일(vip7612@gmail.com)만 가짐.
 *             모든 멤버 권한 임의 수정, 팀 생성/삭제, 모든 자료 열람·편집.
 *  - lead   : 팀장. 자기 팀에 한해 모든 작업 + 팀원 권한 수정.
 *             다른 팀 자료는 보기만.
 *  - member : 팀원. 권한 설정에 따라 보기/작성/수정 가능.
 *             기본은 보기 + 자기 작성물만 편집.
 */

export const MASTER_EMAIL = "vip7612@gmail.com";

export type Role = "master" | "lead" | "member";
export type WorkspaceTab = "ideas" | "projects" | "products" | "team";
export type ActionKey = "view" | "create" | "edit" | "delete" | "assign" | "publish";

export interface PermissionMap {
  ideas:    { view: boolean; create: boolean; edit: boolean; delete: boolean };
  projects: { view: boolean; create: boolean; edit: boolean; assign: boolean };
  products: { view: boolean; edit: boolean; publish: boolean; revenue: boolean };
  team:     { viewAll: boolean; manageRoles: boolean; managePermissions: boolean };
}

export interface Member {
  id: string;
  email: string;
  name: string;
  role: Role;
  teamId: string | null;
  managedBy: string | null;  // 팀원이면 자기 lead의 id
  avatar: string;
  joinedAt: string;
  permissions: PermissionMap;
  status: "active" | "invited" | "suspended";
}

export interface Team {
  id: string;
  name: string;
  emoji: string;
  leadId: string;
  memberIds: string[];
  focus: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  proposerId: string;
  category: string;
  status: "backlog" | "review" | "assigned" | "rejected";
  upvotes: number;
  comments: number;
  assigneeId: string | null;
  teamId: string | null;
  createdAt: string;
  estimatedDays: number;
  estimatedBudget: number;
  tags: string[];
}

export interface Project {
  id: string;
  ideaId?: string;
  name: string;
  description: string;
  teamId: string;
  leadId: string;
  memberIds: string[];
  progress: number; // 0~100
  stage: "design" | "development" | "testing" | "review";
  startedAt: string;
  targetLaunch: string;
  milestones: { label: string; done: boolean }[];
}

export interface Product {
  id: string;
  agentId: string;    // 기존 agents.ts의 id (ag-001 …)
  teamId: string;
  leadId: string;
  monthlyRevenue: number;
  totalRevenue: number;
  subscribers: number;
  rating: number;
  publishedAt: string;
  status: "live" | "paused" | "deprecated";
}

// ===== 권한 기본 프리셋 =====
const fullPermissions: PermissionMap = {
  ideas:    { view: true, create: true, edit: true, delete: true },
  projects: { view: true, create: true, edit: true, assign: true },
  products: { view: true, edit: true, publish: true, revenue: true },
  team:     { viewAll: true, manageRoles: true, managePermissions: true },
};

const leadPermissions: PermissionMap = {
  ideas:    { view: true, create: true, edit: true, delete: true },
  projects: { view: true, create: true, edit: true, assign: true },
  products: { view: true, edit: true, publish: true, revenue: true },
  team:     { viewAll: true, manageRoles: false, managePermissions: true },
};

const memberDefaultPermissions: PermissionMap = {
  ideas:    { view: true, create: true, edit: false, delete: false },
  projects: { view: true, create: false, edit: false, assign: false },
  products: { view: true, edit: false, publish: false, revenue: false },
  team:     { viewAll: false, manageRoles: false, managePermissions: false },
};

// ===== 팀 =====
export const teams: Team[] = [
  { id: "t-cs",     name: "CS·고객응대 팀",  emoji: "💬", leadId: "u-lead-01", memberIds: ["u-m-01", "u-m-02", "u-m-03"], focus: "쇼핑몰·서비스 CS 자동화 비서" },
  { id: "t-dev",    name: "개발·자동화 팀",  emoji: "💻", leadId: "u-lead-02", memberIds: ["u-m-04", "u-m-05", "u-m-06"], focus: "코드 리뷰·DevOps·QA 비서" },
  { id: "t-data",   name: "데이터·인사이트 팀", emoji: "📊", leadId: "u-lead-03", memberIds: ["u-m-07", "u-m-08"],         focus: "분석·리포트·트렌드 비서" },
  { id: "t-growth", name: "그로스·마케팅 팀", emoji: "📣", leadId: "u-lead-04", memberIds: ["u-m-09", "u-m-10"],         focus: "콘텐츠·세일즈·SNS 비서" },
];

// ===== 멤버 =====
export const members: Member[] = [
  // 마스터 1
  {
    id: "u-master", email: MASTER_EMAIL, name: "김에이아이 (마스터)",
    role: "master", teamId: null, managedBy: null, avatar: "👑",
    joinedAt: "2025-01-01", permissions: fullPermissions, status: "active",
  },
  // 팀장 4
  { id: "u-lead-01", email: "jung@mobee.kr", name: "정유진",  role: "lead", teamId: "t-cs",     managedBy: "u-master", avatar: "🎯", joinedAt: "2025-02-12", permissions: leadPermissions, status: "active" },
  { id: "u-lead-02", email: "park@mobee.kr", name: "박민호",  role: "lead", teamId: "t-dev",    managedBy: "u-master", avatar: "🛠️", joinedAt: "2025-02-20", permissions: leadPermissions, status: "active" },
  { id: "u-lead-03", email: "lee@mobee.kr",  name: "이수민",  role: "lead", teamId: "t-data",   managedBy: "u-master", avatar: "📐", joinedAt: "2025-03-04", permissions: leadPermissions, status: "active" },
  { id: "u-lead-04", email: "han@mobee.kr",  name: "한지원",  role: "lead", teamId: "t-growth", managedBy: "u-master", avatar: "🚀", joinedAt: "2025-03-18", permissions: leadPermissions, status: "active" },
  // 팀원 10
  { id: "u-m-01", email: "kim01@mobee.kr", name: "김선영", role: "member", teamId: "t-cs",     managedBy: "u-lead-01", avatar: "🐝", joinedAt: "2025-04-01", permissions: { ...memberDefaultPermissions, ideas: { ...memberDefaultPermissions.ideas, edit: true } }, status: "active" },
  { id: "u-m-02", email: "oh02@mobee.kr",  name: "오태진", role: "member", teamId: "t-cs",     managedBy: "u-lead-01", avatar: "🐝", joinedAt: "2025-04-05", permissions: memberDefaultPermissions, status: "active" },
  { id: "u-m-03", email: "yoon03@mobee.kr",name: "윤혜리", role: "member", teamId: "t-cs",     managedBy: "u-lead-01", avatar: "🐝", joinedAt: "2025-04-09", permissions: memberDefaultPermissions, status: "invited" },
  { id: "u-m-04", email: "cho04@mobee.kr", name: "조준상", role: "member", teamId: "t-dev",    managedBy: "u-lead-02", avatar: "🐝", joinedAt: "2025-04-12", permissions: { ...memberDefaultPermissions, projects: { ...memberDefaultPermissions.projects, edit: true } }, status: "active" },
  { id: "u-m-05", email: "shin05@mobee.kr",name: "신예은", role: "member", teamId: "t-dev",    managedBy: "u-lead-02", avatar: "🐝", joinedAt: "2025-04-16", permissions: memberDefaultPermissions, status: "active" },
  { id: "u-m-06", email: "kang06@mobee.kr",name: "강도훈", role: "member", teamId: "t-dev",    managedBy: "u-lead-02", avatar: "🐝", joinedAt: "2025-04-20", permissions: memberDefaultPermissions, status: "active" },
  { id: "u-m-07", email: "nam07@mobee.kr", name: "남지호", role: "member", teamId: "t-data",   managedBy: "u-lead-03", avatar: "🐝", joinedAt: "2025-04-24", permissions: memberDefaultPermissions, status: "active" },
  { id: "u-m-08", email: "ryu08@mobee.kr", name: "류수아", role: "member", teamId: "t-data",   managedBy: "u-lead-03", avatar: "🐝", joinedAt: "2025-04-28", permissions: memberDefaultPermissions, status: "active" },
  { id: "u-m-09", email: "baek09@mobee.kr",name: "백서윤", role: "member", teamId: "t-growth", managedBy: "u-lead-04", avatar: "🐝", joinedAt: "2025-05-02", permissions: memberDefaultPermissions, status: "active" },
  { id: "u-m-10", email: "moon10@mobee.kr",name: "문태우", role: "member", teamId: "t-growth", managedBy: "u-lead-04", avatar: "🐝", joinedAt: "2025-05-05", permissions: memberDefaultPermissions, status: "suspended" },
];

// ===== 아이디어 (칸반 16개) =====
export const ideas: Idea[] = [
  // backlog
  { id: "i-01", title: "유튜브 댓글 자동 응답 비서",       description: "악성 댓글 필터링 + 우호 댓글 자동 답글로 채널 운영 부담을 줄이는 비서.", proposerId: "u-m-09", category: "마케팅/콘텐츠", status: "backlog", upvotes: 12, comments: 4, assigneeId: null, teamId: null, createdAt: "2일 전", estimatedDays: 12, estimatedBudget: 1500000, tags: ["유튜브", "댓글", "자동응답"] },
  { id: "i-02", title: "쇼핑몰 출고지연 알림 비서",       description: "택배사 API + 주문 데이터를 합쳐 지연 발생 시 고객에게 선제적 알림.", proposerId: "u-m-01", category: "고객응대/CS", status: "backlog", upvotes: 24, comments: 8, assigneeId: null, teamId: null, createdAt: "3일 전", estimatedDays: 18, estimatedBudget: 2800000, tags: ["배송", "알림", "이커머스"] },
  { id: "i-03", title: "프롬프트 비용 분석 비서",         description: "조직의 LLM API 호출 로그를 모아 모델별·기능별 비용 리포트.", proposerId: "u-m-04", category: "데이터/분석", status: "backlog", upvotes: 18, comments: 6, assigneeId: null, teamId: null, createdAt: "4일 전", estimatedDays: 14, estimatedBudget: 2200000, tags: ["LLM", "비용", "데이터"] },
  { id: "i-04", title: "출퇴근 GPS 자동 출근부",         description: "사업장 100m 진입 시 자동 출근 처리 + 위치 로그 기록.", proposerId: "u-m-05", category: "HR/채용", status: "backlog", upvotes: 9, comments: 2, assigneeId: null, teamId: null, createdAt: "5일 전", estimatedDays: 10, estimatedBudget: 1800000, tags: ["HR", "출퇴근", "GPS"] },

  // review
  { id: "i-05", title: "사장님 카톡 응대 어시스턴트",    description: "음식점·소상공인 대상 카카오톡 채널을 모비가 1차 응대 → 사장님 호출.", proposerId: "u-m-02", category: "고객응대/CS", status: "review", upvotes: 31, comments: 12, assigneeId: null, teamId: "t-cs",    createdAt: "1주 전", estimatedDays: 21, estimatedBudget: 3500000, tags: ["카카오톡", "사장님", "응대"] },
  { id: "i-06", title: "주문 데이터 → 사장 일일 보고서", description: "전일 매출·인기메뉴·환불 건수를 정리해 매일 아침 9시 카톡 발송.", proposerId: "u-m-08", category: "데이터/분석", status: "review", upvotes: 27, comments: 9, assigneeId: null, teamId: "t-data",  createdAt: "1주 전", estimatedDays: 16, estimatedBudget: 2600000, tags: ["리포트", "F&B", "일일보고"] },
  { id: "i-07", title: "콘텐츠 톤 검사 비서",            description: "브랜드 가이드 업로드 시 새 카피가 톤·금지어 가이드를 어겼는지 검사.", proposerId: "u-m-09", category: "마케팅/콘텐츠", status: "review", upvotes: 21, comments: 5, assigneeId: null, teamId: "t-growth",createdAt: "1주 전", estimatedDays: 12, estimatedBudget: 2000000, tags: ["브랜드", "톤", "QA"] },

  // assigned (개발 시작 직전)
  { id: "i-08", title: "메모 자동 분류·통합 비서 v2",  description: "노션·옵시디언·구글킵을 한 곳에서 분류·태깅·검색.",                     proposerId: "u-m-04", category: "업무/생산성", status: "assigned", upvotes: 42, comments: 18, assigneeId: "u-lead-02", teamId: "t-dev",   createdAt: "2주 전", estimatedDays: 24, estimatedBudget: 4200000, tags: ["메모", "Notion", "Obsidian"] },
  { id: "i-09", title: "회의록 자동 영문 번역 비서",   description: "회의록 한국어 → 영문 자동 번역 + 글로벌 팀 채널 자동 게시.",            proposerId: "u-m-07", category: "업무/생산성", status: "assigned", upvotes: 36, comments: 14, assigneeId: "u-lead-03", teamId: "t-data",  createdAt: "2주 전", estimatedDays: 14, estimatedBudget: 2400000, tags: ["회의록", "번역", "글로벌"] },
  { id: "i-10", title: "PR 자동 라벨링 비서",          description: "GitHub PR을 분석해 자동으로 area / size / risk 라벨 부여.",            proposerId: "u-m-05", category: "개발/IT",   status: "assigned", upvotes: 29, comments: 7, assigneeId: "u-lead-02", teamId: "t-dev",   createdAt: "3주 전", estimatedDays: 9,  estimatedBudget: 1800000, tags: ["GitHub", "PR", "라벨링"] },

  // rejected
  { id: "i-11", title: "직장 동료 험담 분석 비서",     description: "사내 채팅 로그를 분석해 부정 발언자 식별.", proposerId: "u-m-10", category: "HR/채용", status: "rejected", upvotes: 2, comments: 24, assigneeId: null, teamId: null, createdAt: "1개월 전", estimatedDays: 0, estimatedBudget: 0, tags: ["반려", "윤리", "프라이버시"] },
  { id: "i-12", title: "신용카드 명세서 크롤링 비서", description: "사용자 카드사 로그인 정보로 명세서 자동 수집 후 가계부.", proposerId: "u-m-06", category: "재무/회계", status: "rejected", upvotes: 4, comments: 19, assigneeId: null, teamId: null, createdAt: "1개월 전", estimatedDays: 0, estimatedBudget: 0, tags: ["반려", "약관위반", "보안"] },
];

// ===== 개발 중 프로젝트 8개 =====
export const projects: Project[] = [
  { id: "p-01", ideaId: "i-08", name: "메모 자동 정리 비서 v2", description: "노션·옵시디언·구글킵 통합 매니저 비서.",                teamId: "t-dev",    leadId: "u-lead-02", memberIds: ["u-m-04", "u-m-05"],            progress: 72, stage: "development", startedAt: "2026-04-15", targetLaunch: "2026-06-10", milestones: [{ label: "DB 설계", done: true }, { label: "노션 API", done: true }, { label: "옵시디언 어댑터", done: true }, { label: "검색 인덱스", done: false }, { label: "베타 출시", done: false }] },
  { id: "p-02", ideaId: "i-09", name: "회의록 영문 번역 비서", description: "한국어 회의록을 글로벌 팀 채널에 자동 영문 번역 게시.", teamId: "t-data",   leadId: "u-lead-03", memberIds: ["u-m-07", "u-m-08"],            progress: 55, stage: "development", startedAt: "2026-04-22", targetLaunch: "2026-06-04", milestones: [{ label: "Whisper 파이프라인", done: true }, { label: "DeepL 통합", done: true }, { label: "Slack/Discord 게시", done: false }, { label: "용어집 학습", done: false }] },
  { id: "p-03", ideaId: "i-10", name: "PR 자동 라벨링 비서",   description: "GitHub PR을 분석해 area/size/risk 라벨 자동 부여.",      teamId: "t-dev",    leadId: "u-lead-02", memberIds: ["u-m-06"],                        progress: 88, stage: "testing",     startedAt: "2026-04-01", targetLaunch: "2026-05-22", milestones: [{ label: "PR 메타 수집", done: true }, { label: "분류 모델", done: true }, { label: "라벨 자동 부여", done: true }, { label: "QA 사이클", done: false }] },
  { id: "p-04",                  name: "쇼핑몰 CS 응답 비서 v3", description: "v2 → v3 톤 학습 모듈 + 다국어 지원 확장.",            teamId: "t-cs",     leadId: "u-lead-01", memberIds: ["u-m-01", "u-m-02"],            progress: 33, stage: "design",      startedAt: "2026-05-01", targetLaunch: "2026-07-15", milestones: [{ label: "v2 사용자 인터뷰", done: true }, { label: "톤 가이드 정의", done: false }, { label: "다국어 모델", done: false }, { label: "베타", done: false }] },
  { id: "p-05",                  name: "콜드메일 시퀀스 비서",  description: "리드 그룹별 시퀀스 + 답장률 분석 통합 자동화.",        teamId: "t-growth", leadId: "u-lead-04", memberIds: ["u-m-09"],                        progress: 41, stage: "development", startedAt: "2026-04-25", targetLaunch: "2026-06-20", milestones: [{ label: "리드 임포트", done: true }, { label: "시퀀스 빌더", done: true }, { label: "분석 대시보드", done: false }] },
  { id: "p-06",                  name: "트렌드 모니터링 v2",    description: "네이버·구글·X 트렌드 + 산업별 키워드 알림.",          teamId: "t-data",   leadId: "u-lead-03", memberIds: ["u-m-07"],                        progress: 18, stage: "design",      startedAt: "2026-05-08", targetLaunch: "2026-07-30", milestones: [{ label: "데이터 소스 정의", done: true }, { label: "임베딩 파이프라인", done: false }] },
  { id: "p-07",                  name: "리뷰 톤 검수 비서",     description: "스토어 리뷰 응답 카피의 톤·금지어 자동 검수.",         teamId: "t-growth", leadId: "u-lead-04", memberIds: ["u-m-09", "u-m-10"],            progress: 64, stage: "testing",     startedAt: "2026-04-10", targetLaunch: "2026-05-30", milestones: [{ label: "금지어 사전", done: true }, { label: "톤 분류기", done: true }, { label: "QA 사이클", done: false }] },
  { id: "p-08",                  name: "고객 상담 인사이트 비서", description: "CS 채팅 로그에서 자주 묻는 문의·이슈 자동 클러스터링.", teamId: "t-cs",     leadId: "u-lead-01", memberIds: ["u-m-03"],                        progress: 9,  stage: "design",      startedAt: "2026-05-11", targetLaunch: "2026-08-10", milestones: [{ label: "데이터 동의 정책", done: false }, { label: "클러스터링 PoC", done: false }] },
];

// ===== 판매 중 제품 12개 (기존 agents.ts와 연결) =====
export const products: Product[] = [
  { id: "pr-01", agentId: "ag-001", teamId: "t-cs",     leadId: "u-lead-01", monthlyRevenue:  6_120_000, totalRevenue:  73_440_000, subscribers: 432,  rating: 4.9, publishedAt: "2025-08-01", status: "live" },
  { id: "pr-02", agentId: "ag-002", teamId: "t-growth", leadId: "u-lead-04", monthlyRevenue:  2_840_000, totalRevenue:  34_080_000, subscribers: 215,  rating: 4.8, publishedAt: "2025-08-22", status: "live" },
  { id: "pr-03", agentId: "ag-003", teamId: "t-dev",    leadId: "u-lead-02", monthlyRevenue:  8_512_000, totalRevenue: 102_144_000, subscribers: 891,  rating: 4.9, publishedAt: "2025-09-10", status: "live" },
  { id: "pr-04", agentId: "ag-006", teamId: "t-data",   leadId: "u-lead-03", monthlyRevenue:  5_724_000, totalRevenue:  68_688_000, subscribers: 187,  rating: 4.9, publishedAt: "2025-09-18", status: "live" },
  { id: "pr-05", agentId: "ag-008", teamId: "t-dev",    leadId: "u-lead-02", monthlyRevenue: 10_320_000, totalRevenue: 123_840_000, subscribers: 521,  rating: 4.9, publishedAt: "2025-10-05", status: "live" },
  { id: "pr-06", agentId: "ag-010", teamId: "t-dev",    leadId: "u-lead-02", monthlyRevenue:          0, totalRevenue:  4_200_000,  subscribers: 1842, rating: 4.9, publishedAt: "2025-10-22", status: "live" },
  { id: "pr-07", agentId: "ag-012", teamId: "t-growth", leadId: "u-lead-04", monthlyRevenue: 14_280_000, totalRevenue: 142_800_000, subscribers: 287,  rating: 4.8, publishedAt: "2025-11-12", status: "live" },
  { id: "pr-08", agentId: "ag-014", teamId: "t-data",   leadId: "u-lead-03", monthlyRevenue:  6_840_000, totalRevenue:  61_560_000, subscribers: 423,  rating: 4.9, publishedAt: "2025-12-01", status: "live" },
  { id: "pr-09", agentId: "ag-016", teamId: "t-data",   leadId: "u-lead-03", monthlyRevenue:  3_180_000, totalRevenue:  28_620_000, subscribers: 678,  rating: 4.9, publishedAt: "2025-12-15", status: "live" },
  { id: "pr-10", agentId: "ag-019", teamId: "t-growth", leadId: "u-lead-04", monthlyRevenue:  4_960_000, totalRevenue:  39_680_000, subscribers: 432,  rating: 4.8, publishedAt: "2026-01-08", status: "live" },
  { id: "pr-11", agentId: "ag-023", teamId: "t-cs",     leadId: "u-lead-01", monthlyRevenue:  2_420_000, totalRevenue:  21_780_000, subscribers: 312,  rating: 4.6, publishedAt: "2026-01-22", status: "paused" },
  { id: "pr-12", agentId: "ag-028", teamId: "t-dev",    leadId: "u-lead-02", monthlyRevenue:  3_220_000, totalRevenue:  19_320_000, subscribers: 234,  rating: 4.8, publishedAt: "2026-02-14", status: "live" },
];

// ===== 헬퍼 =====
export function getMember(memberId: string) {
  return members.find((m) => m.id === memberId);
}
export function getTeam(teamId: string | null | undefined) {
  return teams.find((t) => t.id === teamId);
}
export function getTeamLead(teamId: string) {
  const team = getTeam(teamId);
  return team ? getMember(team.leadId) : undefined;
}

/**
 * 두 멤버 간 권한 위계 — actor가 target의 권한/역할을 수정할 수 있는가?
 * 마스터는 모두 가능. 팀장은 자기 팀원만 가능. 팀원은 불가능.
 */
export function canManage(actor: Member, target: Member): boolean {
  if (actor.role === "master") return true;
  if (actor.role === "lead" && target.role === "member" && target.managedBy === actor.id) return true;
  return false;
}

export function isMaster(member?: Member) { return member?.role === "master"; }
export function isLead(member?: Member)   { return member?.role === "lead"; }
export function isMember(member?: Member) { return member?.role === "member"; }
