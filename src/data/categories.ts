export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  popularServices: string[];
  agentCount: number;
}

export const categories: Category[] = [
  {
    id: "productivity",
    name: "업무/생산성",
    emoji: "💼",
    description: "일정관리, 이메일, 회의록까지 업무 효율을 극대화",
    color: "bg-yellow-50",
    popularServices: ["일정관리 비서", "이메일 자동분류", "회의록 작성", "할일 정리", "문서 요약"],
    agentCount: 1284,
  },
  {
    id: "marketing",
    name: "마케팅/콘텐츠",
    emoji: "📣",
    description: "블로그, SNS, 광고 카피까지 콘텐츠 자동 생성",
    color: "bg-pink-50",
    popularServices: ["블로그 포스팅 비서", "광고 카피 생성", "SNS 스케줄링", "이메일 마케팅", "키워드 분석"],
    agentCount: 962,
  },
  {
    id: "cs",
    name: "고객응대/CS",
    emoji: "💬",
    description: "챗봇, 자동응답, 컴플레인 처리까지 한 번에",
    color: "bg-blue-50",
    popularServices: ["챗봇 상담원", "FAQ 자동응답", "불만 처리 비서", "리뷰 모니터링", "CS 통계 분석"],
    agentCount: 754,
  },
  {
    id: "data",
    name: "데이터/분석",
    emoji: "📊",
    description: "리포트, 트렌드, 경쟁사 분석까지 데이터 인사이트",
    color: "bg-purple-50",
    popularServices: ["리포트 자동생성", "경쟁사 모니터링", "트렌드 분석", "데이터 정제", "대시보드 구축"],
    agentCount: 538,
  },
  {
    id: "legal",
    name: "법률/세무",
    emoji: "⚖️",
    description: "계약서, 세무, 법률 자문까지 전문가 수준 도우미",
    color: "bg-green-50",
    popularServices: ["계약서 검토", "세무 신고 도우미", "법률 자문", "약관 분석", "특허 검색"],
    agentCount: 312,
  },
  {
    id: "sales",
    name: "영업/CRM",
    emoji: "🎯",
    description: "리드, 미팅, 영업 자동화까지 매출을 끌어올리는 비서",
    color: "bg-orange-50",
    popularServices: ["리드 발굴", "콜드메일 자동화", "CRM 자동입력", "영업 파이프라인", "고객 인사이트"],
    agentCount: 687,
  },
  {
    id: "ecommerce",
    name: "쇼핑몰/이커머스",
    emoji: "🛍️",
    description: "상품 등록부터 CS, 재고 관리까지 셀러를 위한 비서",
    color: "bg-rose-50",
    popularServices: ["상품 등록 자동화", "재고 알림", "리뷰 분석", "가격 모니터링", "주문 처리"],
    agentCount: 824,
  },
  {
    id: "education",
    name: "교육/코칭",
    emoji: "🎓",
    description: "강의 자료, 학습 코칭, 시험 대비까지 학습 동반자",
    color: "bg-indigo-50",
    popularServices: ["학습 코치", "강의 자료 제작", "시험 문제 생성", "튜터링 비서", "독서 코칭"],
    agentCount: 421,
  },
  {
    id: "dev",
    name: "개발/IT",
    emoji: "💻",
    description: "코드 리뷰, 문서화, 배포 자동화까지 개발자 페어",
    color: "bg-slate-50",
    popularServices: ["코드 리뷰", "API 문서화", "버그 트래커", "테스트 자동생성", "배포 자동화"],
    agentCount: 1138,
  },
  {
    id: "finance",
    name: "재무/회계",
    emoji: "💰",
    description: "장부 정리, 세금계산서, 자금 흐름까지 회계 도우미",
    color: "bg-emerald-50",
    popularServices: ["장부 자동정리", "세금계산서 발행", "현금흐름 분석", "지출 분류", "재무 리포트"],
    agentCount: 296,
  },
  {
    id: "hr",
    name: "HR/채용",
    emoji: "👥",
    description: "이력서 스크리닝부터 온보딩까지 HR 자동화",
    color: "bg-cyan-50",
    popularServices: ["이력서 스크리닝", "면접 일정 조율", "온보딩 자동화", "근태 관리", "조직 분석"],
    agentCount: 384,
  },
  {
    id: "etc",
    name: "기타",
    emoji: "✨",
    description: "취미부터 라이프스타일까지 다양한 영역의 비서",
    color: "bg-amber-50",
    popularServices: ["여행 플래너", "식단 추천", "운동 코치", "독서 큐레이션", "가계부 비서"],
    agentCount: 512,
  },
];
