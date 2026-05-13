import { cn } from "@/lib/utils";

interface RobotFaceProps {
  serial: string;
  accent?: string;
  shellTone?: "silver" | "graphite" | "champagne";
  className?: string;
  showSerial?: boolean;
}

const SHELL_TONES: Record<
  NonNullable<RobotFaceProps["shellTone"]>,
  { hi: string; mid: string; lo: string; rim: string; cap: string }
> = {
  silver: {
    hi: "#FAFAFC",
    mid: "#E2E2E6",
    lo: "#A8A8AE",
    rim: "#7C7C82",
    cap: "#CFCFD3",
  },
  graphite: {
    hi: "#3A3A40",
    mid: "#26262B",
    lo: "#0F0F12",
    rim: "#0A0A0C",
    cap: "#1A1A1F",
  },
  champagne: {
    hi: "#FFF3DC",
    mid: "#EBD9B4",
    lo: "#B59A6A",
    rim: "#8A724A",
    cap: "#D6BF8E",
  },
};

export function RobotFace({
  serial,
  accent = "#FFD200",
  shellTone = "silver",
  className,
  showSerial = true,
}: RobotFaceProps) {
  const tone = SHELL_TONES[shellTone];
  const uid = `r-${serial.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("block w-full h-full", className)}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Mobee ${serial}`}
    >
      <defs>
        {/* 배경: 스튜디오 조명 다크 그라데이션 */}
        <radialGradient id={`${uid}-bg`} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#2B2B33" />
          <stop offset="55%" stopColor="#15151A" />
          <stop offset="100%" stopColor="#08080A" />
        </radialGradient>

        {/* 헬멧 외피 메탈 그라데이션 */}
        <linearGradient id={`${uid}-shell`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={tone.hi} />
          <stop offset="38%" stopColor={tone.mid} />
          <stop offset="100%" stopColor={tone.lo} />
        </linearGradient>

        {/* 페이스플레이트 매트 블랙 */}
        <linearGradient id={`${uid}-face`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1B1B20" />
          <stop offset="50%" stopColor="#040406" />
          <stop offset="100%" stopColor="#101014" />
        </linearGradient>

        {/* 페이스플레이트 글로스 하이라이트 */}
        <linearGradient id={`${uid}-gloss`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* LED 글로우 */}
        <radialGradient id={`${uid}-led`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="1" />
          <stop offset="55%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>

        {/* 림 라이트 (외곽 강조) */}
        <linearGradient id={`${uid}-rim`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 배경 */}
      <rect width="400" height="400" fill={`url(#${uid}-bg)`} />

      {/* 바닥 반사광 */}
      <ellipse cx="200" cy="395" rx="170" ry="22" fill={accent} opacity="0.05" />
      <ellipse cx="200" cy="395" rx="110" ry="10" fill={accent} opacity="0.08" />

      {/* 어깨 / 흉부 메탈 */}
      <path
        d="M 50 400 L 60 340 Q 100 305, 200 300 Q 300 305, 340 340 L 350 400 Z"
        fill={`url(#${uid}-shell)`}
        opacity="0.85"
      />
      <path
        d="M 50 400 L 60 340 Q 100 305, 200 300 Q 300 305, 340 340 L 350 400 Z"
        fill="#000"
        opacity="0.25"
      />

      {/* 목 액추에이터 */}
      <rect x="178" y="262" width="44" height="38" rx="4" fill={tone.rim} />
      <rect x="184" y="266" width="32" height="6" rx="2" fill={tone.lo} />
      <rect x="184" y="276" width="32" height="4" rx="2" fill={tone.lo} opacity="0.7" />
      <rect x="184" y="284" width="32" height="4" rx="2" fill={tone.lo} opacity="0.5" />

      {/* 헬멧 본체 (실버 외피) */}
      <path
        d="M 110 100
           Q 110 60, 150 50
           Q 200 38, 250 50
           Q 290 60, 290 100
           L 290 220
           Q 290 260, 250 268
           L 150 268
           Q 110 260, 110 220 Z"
        fill={`url(#${uid}-shell)`}
        stroke={tone.rim}
        strokeWidth="1.2"
      />

      {/* 상단 림 라이트 */}
      <path
        d="M 118 95
           Q 118 65, 152 56
           Q 200 46, 248 56
           Q 282 65, 282 95"
        fill="none"
        stroke={`url(#${uid}-rim)`}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 측면 패널 분할선 (옵티머스 특유의 헬멧 라인) */}
      <path
        d="M 145 95 L 145 250"
        stroke={tone.rim}
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M 255 95 L 255 250"
        stroke={tone.rim}
        strokeWidth="1"
        opacity="0.55"
      />

      {/* 측면 패널 음영 */}
      <path
        d="M 110 110 L 145 110 L 145 245 Q 130 248, 120 240 L 110 220 Z"
        fill="#000"
        opacity="0.08"
      />
      <path
        d="M 290 110 L 255 110 L 255 245 Q 270 248, 280 240 L 290 220 Z"
        fill="#000"
        opacity="0.08"
      />

      {/* 페이스플레이트 (매트 블랙) */}
      <path
        d="M 155 102
           Q 155 90, 167 90
           L 233 90
           Q 245 90, 245 102
           L 245 232
           Q 245 244, 233 244
           L 167 244
           Q 155 244, 155 232 Z"
        fill={`url(#${uid}-face)`}
      />

      {/* 페이스플레이트 글로스 (반사광) */}
      <path
        d="M 155 102
           Q 155 90, 167 90
           L 233 90
           Q 245 90, 245 102
           L 245 165
           L 155 165 Z"
        fill={`url(#${uid}-gloss)`}
      />

      {/* 페이스플레이트 외곽 라인 */}
      <path
        d="M 155 102
           Q 155 90, 167 90
           L 233 90
           Q 245 90, 245 102
           L 245 232
           Q 245 244, 233 244
           L 167 244
           Q 155 244, 155 232 Z"
        fill="none"
        stroke="#000"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* 카메라 센서 슬릿 영역 */}
      <rect x="167" y="148" width="66" height="36" rx="6" fill="#000" opacity="0.65" />

      {/* 좌측 LED 광원 */}
      <circle cx="180" cy="166" r="14" fill={`url(#${uid}-led)`} />
      <circle cx="180" cy="166" r="4.5" fill={accent} />
      <circle cx="180" cy="164.5" r="1.6" fill="#fff" opacity="0.85" />

      {/* 우측 LED 광원 */}
      <circle cx="220" cy="166" r="14" fill={`url(#${uid}-led)`} />
      <circle cx="220" cy="166" r="4.5" fill={accent} />
      <circle cx="220" cy="164.5" r="1.6" fill="#fff" opacity="0.85" />

      {/* 페이스 하부 통풍구 / 마이크 */}
      <g opacity="0.55">
        <rect x="178" y="208" width="44" height="2" rx="1" fill="#555" />
        <rect x="182" y="213" width="36" height="2" rx="1" fill="#555" />
        <rect x="186" y="218" width="28" height="2" rx="1" fill="#555" />
      </g>

      {/* 페이스플레이트 내부 시리얼 (작은 각인) */}
      <text
        x="240"
        y="100"
        textAnchor="end"
        fill={accent}
        fontSize="7"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing="1.2"
        opacity="0.7"
      >
        {serial}
      </text>

      {/* 헬멧 측면 마킹 (브랜드) */}
      <text
        x="128"
        y="175"
        fill={tone.rim}
        fontSize="6"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing="0.8"
        opacity="0.75"
        transform="rotate(-90 128 175)"
      >
        MOBEE
      </text>
      <text
        x="276"
        y="190"
        fill={tone.rim}
        fontSize="6"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing="0.8"
        opacity="0.75"
        transform="rotate(90 276 190)"
      >
        {serial}
      </text>

      {/* 머리 꼭대기 작은 인디케이터 LED */}
      <circle cx="200" cy="58" r="2" fill={accent} opacity="0.9" />
      <circle cx="200" cy="58" r="4" fill={accent} opacity="0.25" />

      {/* 헬멧 상단 볼트 디테일 */}
      <circle cx="135" cy="115" r="2.4" fill={tone.rim} opacity="0.7" />
      <circle cx="265" cy="115" r="2.4" fill={tone.rim} opacity="0.7" />
      <circle cx="135" cy="240" r="2.4" fill={tone.rim} opacity="0.7" />
      <circle cx="265" cy="240" r="2.4" fill={tone.rim} opacity="0.7" />

      {/* 하단 외부 시리얼 라벨 */}
      {showSerial && (
        <g>
          <rect
            x="138"
            y="368"
            width="124"
            height="22"
            rx="3"
            fill="#000"
            opacity="0.55"
          />
          <text
            x="200"
            y="383"
            textAnchor="middle"
            fill="#E5E5E8"
            fontSize="11"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            letterSpacing="2.4"
          >
            MOBEE · {serial}
          </text>
        </g>
      )}
    </svg>
  );
}
