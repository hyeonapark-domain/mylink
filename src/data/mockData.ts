import { LinkItem, Profile, ThemeConfig, AnalyticsData } from '@/types';

// ==========================================
// 1. 기본 크리에이터 더미 링크 목록 (Default Initial Links)
// ==========================================
export const initialLinks: LinkItem[] = [
  {
    id: 'link-1',
    type: 'youtube',
    title: '유튜브',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    icon: 'Youtube',
    isActive: true,
    order: 0,
    clickCount: 1420,
  },
  {
    id: 'link-2',
    type: 'link',
    title: '포트폴리오 웹사이트',
    url: 'https://github.com',
    icon: 'Globe',
    isActive: true,
    order: 1,
    clickCount: 890,
  },
  {
    id: 'link-3',
    type: 'music',
    title: '음악 플레이리스트',
    url: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
    icon: 'Music',
    isActive: true,
    order: 2,
    clickCount: 654,
  },
  {
    id: 'link-4',
    type: 'link',
    title: '커피 후원하기',
    url: 'https://buymeacoffee.com',
    icon: 'Coffee',
    isActive: true,
    order: 3,
    clickCount: 312,
  },
  {
    id: 'link-5',
    type: 'link',
    title: '기술 블로그',
    url: 'https://velog.io',
    icon: 'BookOpen',
    isActive: true,
    order: 4,
    clickCount: 478,
  },
  {
    id: 'link-6',
    type: 'link',
    title: '굿즈 스토어',
    url: 'https://smartstore.naver.com',
    icon: 'ShoppingBag',
    isActive: false,
    order: 5,
    clickCount: 185,
  },
  {
    id: 'link-7',
    type: 'link',
    title: '비즈니스 이메일',
    url: 'mailto:hyunah@example.com',
    icon: 'Mail',
    isActive: true,
    order: 6,
    clickCount: 240,
  },
];

// ==========================================
// 2. 기본 프로필 정보 (Default Profile)
// ==========================================
export const initialProfile: Profile = {
  username: 'park_hyunah',
  name: '박현아',
  bio: '디자인과 프로그래밍으로 더 나은 사용자 경험을 만드는 크리에이터 박현아입니다 🪄',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com' },
    { platform: 'youtube', url: 'https://youtube.com' },
    { platform: 'github', url: 'https://github.com' },
    { platform: 'twitter', url: 'https://twitter.com' },
    { platform: 'email', url: 'mailto:hyunah@example.com' },
  ],
};

// ==========================================
// 3. 페르소나별 다양한 더미 데이터 세트 (Presets)
// ==========================================
export const linkPresets = {
  // A. 개발자 / 엔지니어 페르소나
  developer: [
    {
      id: 'dev-1',
      type: 'link' as const,
      title: '💻 GitHub 프로필 및 오픈소스 프로젝트',
      url: 'https://github.com',
      icon: 'Github',
      isActive: true,
      order: 0,
      clickCount: 1250,
    },
    {
      id: 'dev-2',
      type: 'link' as const,
      title: '📝 프론트엔드 아키텍처 기술 블로그',
      url: 'https://velog.io',
      icon: 'FileText',
      isActive: true,
      order: 1,
      clickCount: 890,
    },
    {
      id: 'dev-3',
      type: 'youtube' as const,
      title: '🎥 [강의] 10분 만에 끝내는 Next.js 15 라이브',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: 'Youtube',
      isActive: true,
      order: 2,
      clickCount: 640,
    },
    {
      id: 'dev-4',
      type: 'link' as const,
      title: '💼 LinkedIn 경력 및 경력기술서',
      url: 'https://linkedin.com',
      icon: 'Briefcase',
      isActive: true,
      order: 3,
      clickCount: 420,
    },
    {
      id: 'dev-5',
      type: 'link' as const,
      title: '⚡ 개발자 1:1 커리어 커피챗 신청하기',
      url: 'https://calendly.com',
      icon: 'Calendar',
      isActive: true,
      order: 4,
      clickCount: 310,
    },
  ],

  // B. 디자이너 / 크리에이티브 디렉터 페르소나
  designer: [
    {
      id: 'des-1',
      type: 'link' as const,
      title: '🎨 Behance 포트폴리오 쇼케이스',
      url: 'https://behance.net',
      icon: 'Palette',
      isActive: true,
      order: 0,
      clickCount: 1580,
    },
    {
      id: 'des-2',
      type: 'link' as const,
      title: '📐 Figma 커뮤니티 무료 UI 키트 배포',
      url: 'https://figma.com',
      icon: 'Figma',
      isActive: true,
      order: 1,
      clickCount: 1120,
    },
    {
      id: 'des-3',
      type: 'link' as const,
      title: '📸 Dribbble 일러스트 & 3D 아트워크',
      url: 'https://dribbble.com',
      icon: 'Image',
      isActive: true,
      order: 2,
      clickCount: 780,
    },
    {
      id: 'des-4',
      type: 'youtube' as const,
      title: '🎬 [튜토리얼] 토스 스타일 UI 디자인 프로세스',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      icon: 'Youtube',
      isActive: true,
      order: 3,
      clickCount: 930,
    },
  ],

  // C. 브랜드 / 스타트업 페르소나
  brand: [
    {
      id: 'brd-1',
      type: 'link' as const,
      title: '🌐 마이링크 공식 웹사이트 방문하기',
      url: 'https://mylink.hy',
      icon: 'Globe',
      isActive: true,
      order: 0,
      clickCount: 2300,
    },
    {
      id: 'brd-2',
      type: 'link' as const,
      title: '📲 iOS / Android 앱 다운로드',
      url: 'https://apple.com/app-store',
      icon: 'Smartphone',
      isActive: true,
      order: 1,
      clickCount: 1840,
    },
    {
      id: 'brd-3',
      type: 'link' as const,
      title: '📢 2026 신규 제품 출시 및 업데이트 소식',
      url: 'https://medium.com',
      icon: 'Megaphone',
      isActive: true,
      order: 2,
      clickCount: 950,
    },
    {
      id: 'brd-4',
      type: 'link' as const,
      title: '💬 카카오톡 채널 실시간 고객 문의',
      url: 'https://pf.kakao.com',
      icon: 'MessageSquare',
      isActive: true,
      order: 3,
      clickCount: 1200,
    },
  ],
};

// ==========================================
// 4. 초기 테마 설정 (Default Theme)
// ==========================================
export const initialTheme: ThemeConfig = {
  themeId: 'toss-light',
  backgroundColor: '#F9FAFB', // grey-50
  textColor: '#191F28', // grey-900
  buttonStyle: 'rounded-xl',
  buttonColor: '#FFFFFF',
  buttonTextColor: '#191F28',
  fontFamily: 'Pretendard',
};

// ==========================================
// 5. 초기 통계 더미 데이터 (Default Analytics)
// ==========================================
export const initialAnalytics: AnalyticsData = {
  totalViews: 4320,
  dailyStats: [
    { date: '2026-09-22', views: 320, clicks: 180 },
    { date: '2026-09-23', views: 450, clicks: 240 },
    { date: '2026-09-24', views: 510, clicks: 310 },
    { date: '2026-09-25', views: 390, clicks: 200 },
    { date: '2026-09-26', views: 680, clicks: 420 },
    { date: '2026-09-27', views: 820, clicks: 540 },
    { date: '2026-09-28', views: 750, clicks: 490 },
  ],
};
