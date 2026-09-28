# [마이링크 (My Link)] 제품 요구사항 및 기능 정의서 (PRD / PBD)

---

## 1. 개요 (Overview)

### 1.1 서비스 정의
- **서비스명**: 마이링크 (My Link)
- **서비스 목적**: 개인 크리에이터 및 일반 사용자가 자신만의 고유한 단일 프로필 페이지를 만들고, 소셜 미디어, 웹사이트 링크, 미디어 콘텐츠를 한곳에 모아 공유할 수 있는 **링크트리(Linktree) 클론 서비스**입니다.
- **구동 환경**: 별도의 서버 구축 없이 브라우저 환경에서 즉시 동작하는 **Mock 데이터 및 로컬 스토리지(LocalStorage) 기반 클라이언트 전용 데모 애플리케이션**입니다.
- **디자인 컨셉**: **shadcn/ui**를 기본 컴포넌트 라이브러리로 채택하고, **토스 디자인 시스템(TDS - Toss Design System)**의 디자인 언어, 컬러 토큰, 타이포그래피, 마이크로 카피(해요체)를 결합하여 정갈하고 완성도 높은 UI/UX를 제공합니다.
- **스타일링 방식**: 모든 UI 스타일은 **CSS 모듈(CSS Modules)을 사용하지 않으며**, **Tailwind CSS 유틸리티 클래스**로만 작성합니다. 재사용 가능한 컴포넌트는 반드시 `src/components/ui/` 경로의 **shadcn/ui 컴포넌트**(`Button`, `Card`, `Avatar`, `Badge`, `Separator` 등)를 조합하여 구성합니다.

### 1.2 핵심 특징
1. **Zustand 전역 상태 관리**: 보일러플레이트가 적고 직관적인 **Zustand** 스토어를 사용하며, `persist` 미들웨어를 통해 `localStorage`와 자동 영속화됩니다.
2. **실시간 라이브 프리뷰**: 좌측 편집 에디터의 변경 사항이 우측 모바일 목업 프리뷰(TDS iOS 베젤)에 즉시 반영됩니다.
3. **드래그 앤 드롭 순서 변경**: 링크 목록을 손쉽게 끌어서 순서를 변경할 수 있습니다.
4. **로컬 스토리지 데이터 영속성**: 브라우저를 새로고침하거나 재방문해도 편집한 내용과 통계 데이터가 유지됩니다.
5. **기본 통계 분석 시각화**: 총 프로필 방문 수, 개별 링크 클릭 수, 최근 7일/30일 추이 차트를 제공합니다.
6. **shadcn/ui & Tailwind CSS 기반 디자인 시스템**: 모든 UI는 **shadcn/ui** 컴포넌트(`Button`, `Card`, `Avatar`, `Badge`, `Separator`)를 기반으로 구현하며, **Tailwind CSS** 유틸리티 클래스로만 스타일을 적용합니다. 토스 블루(`blue-500: #3182F6`), 무채색 Cool Grey 톤, Pretendard 폰트 스택 및 토스 스타일 라운드/컴포넌트 체계를 완벽히 적용합니다.

---

## 2. 아키텍처 및 데이터 모델 명세

### 2.1 데이터 및 상태 관리 구조
- **State Store**: Zustand (`useMyLinkStore`)
- **Persistence**: Zustand `persist` 미들웨어 + Browser `localStorage` (`key: 'my-link-storage'`)
- **초기 로딩**: `localStorage`가 비어있을 경우 토스 크리에이터 컨셉의 샘플 Mock Data를 자동 동기화합니다.

### 2.2 TypeScript 데이터 인터페이스

```typescript
// 프로필 데이터 모델
export interface Profile {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  socialLinks: {
    platform: 'instagram' | 'youtube' | 'twitter' | 'github' | 'email';
    url: string;
  }[];
}

// 링크 항목 데이터 모델
export interface LinkItem {
  id: string;
  type: 'link' | 'youtube' | 'music';
  title: string;
  url: string;
  embedUrl?: string;
  icon?: string;
  isActive: boolean;
  order: number;
  clickCount: number;
}

// 테마 설정 모델
export interface ThemeConfig {
  themeId: 'toss-light' | 'toss-dark' | 'toss-blue' | 'custom';
  backgroundColor: string;
  textColor: string;
  buttonStyle: 'rounded-full' | 'rounded-xl' | 'rounded-lg' | 'outline';
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: string;
}

// 통계 데이터 모델
export interface AnalyticsData {
  totalViews: number;
  dailyStats: {
    date: string; // YYYY-MM-DD
    views: number;
    clicks: number;
  }[];
}

// Zustand 전역 상태 스토어 인터페이스
export interface MyLinkState {
  profile: Profile;
  links: LinkItem[];
  theme: ThemeConfig;
  analytics: AnalyticsData;

  updateProfile: (profile: Partial<Profile>) => void;
  addLink: (link: Omit<LinkItem, 'id' | 'clickCount' | 'order'>) => void;
  updateLink: (id: string, link: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (links: LinkItem[]) => void;
  toggleLinkActive: (id: string) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  recordView: () => void;
  recordClick: (linkId: string) => void;
  resetToDefault: () => void;
}
```

### 2.3 초기 데이터 & Mock Data 명세 (`src/data/mockData.ts`)
애플리케이션 초기 로딩 및 데모 시용을 위해 `src/data/mockData.ts`에 정의된 더미 데이터를 사용합니다.

- **기본 더미 링크 목록 (`initialLinks`)**:
  - `youtube`: 🎬 최신 YouTube 영상 임베드 카드가 포함된 링크
  - `link`: 🚀 GitHub 포트폴리오 웹사이트 바로가기
  - `music`: 🎵 Spotify Lofi Playlist 음악 임베드 링크
  - `link`: ☕ Buy Me a Coffee 후원 링크
  - `link`: 📚 Velog/Tistory 기술 블로그
  - `link`: 🛍️ Naver Smartstore 굿즈 스토어 (비활성화 상태 테스트용)
  - `link`: ✉️ 비즈니스 협업 이메일
- **페르소나별 링크 프리셋 (`linkPresets`)**:
  - `developer`: 개발자/엔지니어 (GitHub, 블로그, 기술 강의, LinkedIn, 커피챗)
  - `designer`: 디자이너/크리에이터 (Behance, Figma UI 키트, Dribbble, 디자인 튜토리얼)
  - `brand`: 브랜드/스타트업 (공식 웹사이트, 앱 다운로드, 소식지, 카카오톡 문의)
- **기본 프로필 및 테마/통계 데이터**: `initialProfile` (김토스 @toss_creator), `initialTheme` (Toss Light), `initialAnalytics` (최근 7일간 트래픽)

---

## 3. 디자인 시스템 (shadcn/ui & Tailwind CSS / Toss Design System 기반) 가이드라인

본 서비스의 모든 UI 컴포넌트는 **shadcn/ui**를 기본 컴포넌트 라이브러리로 활용하며, **토스 디자인 시스템(TDS)**의 컬러 토큰, 타이포그래피 및 라운드 가이드라인을 주입하여 구현합니다.

> **[필수 규칙] 스타일링 정책**
> - **CSS 모듈(`.module.css`)은 사용하지 않습니다.**
> - 모든 스타일은 **Tailwind CSS 유틸리티 클래스**로만 작성합니다.
> - 재사용 가능한 UI 컴포넌트는 반드시 `src/components/ui/` 경로에 위치한 **shadcn/ui 컴포넌트**(`Button`, `Card`, `Avatar`, `Badge`, `Separator` 등)를 기반으로 구성합니다.
> - 커스텀 스타일 오버라이드가 필요한 경우 `cn()` 유틸리티(clsx + tailwind-merge)로 클래스를 병합합니다.


### 3.1 컬러 토큰 (Color Tokens)

#### Brand & Accent Colors
- **Primary Brand (`blue-500`)**: `#3182F6` / `oklch(0.620 0.191 258)` (주요 CTA 버튼 및 핵심 포인트)
- **Brand Pressed (`blue-600`)**: `oklch(0.522 0.176 257)`
- **Brand Weak Background (`blue-50`)**: `#E8F3FF` / `oklch(0.959 0.020 250)` (강조 칩 및 연한 배경)

#### Neutral & Greyscale
- **Text Primary (`grey-900`)**: `#191F28` / `oklch(0.237 0.020 258)` (주요 텍스트, Pure Black 금지)
- **Text Secondary (`grey-700`)**: `#4E5968` / `oklch(0.460 0.028 256)` (보조 설명)
- **Disabled Text / Line Strong (`grey-400`)**: `#B0B8C1`
- **Border / Divider (`grey-200`)**: `#E5E8EB` (기본 구분선 및 입력창 보더)
- **Secondary Surface (`grey-100`)**: `#F2F4F6` (카드 및 입력창 배경)
- **Background (`grey-50`)**: `#F9FAFB` (페이지 전체 배경)
- **White**: `#FFFFFF`

#### Semantic Palette
- **Danger (`red-500`)**: `#F04452`
- **Success (`green-500`)**: `oklch(0.493 0.143 154)`
- **Warning (`orange-500`)**: `oklch(0.748 0.183 56)`

---

### 3.2 타이포그래피 (Typography)
- **Font Stack**: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif`

| 토큰명 | Size | Weight | Line Height | 사용처 |
|---|---|---|---|---|
| **display-1** | 56px | Bold (700) | 1.30 | 통계 주요 지표 수치 |
| **h1** | 28px | Bold (700) | 1.30 | 페이지 타이틀 |
| **h2** | 24px | Bold (700) | 1.30 | 섹션 타이틀 |
| **title-1** | 18px | Semibold (600) | 1.45 | 카드 헤더 및 리스트 타이틀 |
| **body-1** | 17px | Regular (400) | 1.50 | 대형 본문 |
| **body-2** | 15px | Regular (400) | 1.50 | 기본 표준 본문 |
| **label-l** | 17px | Bold (700) | 1.25 | XL/L 주요 버튼 라벨 |
| **label-m** | 15px | Semibold (600) | 1.25 | M 버튼 / 입력창 라벨 |
| **caption** | 12px | Medium (500) | 1.40 | 캡션 / 서브 타이틀 |

> **수치 표기 유틸리티**: 통계 및 랭킹 숫자는 고정폭 `tabular-nums`를 사용하여 가로 정렬을 정교하게 맞춥니다.

---

### 3.3 라운드 및 간격 (Rounded Radii & Spacing)

- **Radius Ladder**:
  - `radius-s`: 8px (태그, 칩)
  - `radius-m`: 12px (M 버튼, 입력창)
  - `radius-l`: 14px (L 버튼, 아바타 모서리)
  - `radius-xl`: 16px (XL 56px 버튼, 대형 카드)
  - `radius-2xl`: 20px (모달, 다이얼로그)
  - `radius-full`: 999px (Pill 캡슐 버튼)
- **Spacing**: 4px 베이스 (`space-2`: 8px, `space-4`: 16px, `space-6`: 24px)

---

### 3.4 톤 앤 매너 & 마이크로 카피
- **해요체 사용**: 모든 UI 카피는 대화형 존댓말인 **"해요체"**를 표준으로 사용합니다. (e.g. "링크를 추가했어요", "변경사항을 저장할까요?")
- **명확한 동작 설명**: 버튼 라벨은 직관적으로 일어날 동작을 표기합니다 (`링크 추가하기`, `테마 적용하기`).

---

## 4. 기능 요구사항 명세 (Functional Requirements)

### F-100. 공개 프로필 페이지 (Public Profile View)
- **F-101 (프로필 헤더)**: 아바타 (`radius-14`), 이름(h2), Bio(body-2 grey-700), SNS 아이콘 스택 노출
- **F-102 (활성화 링크 목록)**: `isActive: true`인 링크 항목을 56px height, `radius-xl` 형태의 TDS 버튼으로 렌더링
- **F-103 (미디어 임베드)**: 유튜브/음악 링크 타입 시 내장 카드로 미리보기 및 재생 지원
- **F-104 (테마 적용)**: 설정된 `ThemeConfig`에 따라 동적으로 스타일링 변경
- **F-105 (클릭/방문 트래킹)**: 페이지 방문 및 링크 클릭 시 LocalStorage 업데이트

### F-200. 대시보드 & 프로필 에디터 (Dashboard & Editor)
- **F-201 (2컬럼 레이아웃)**: 좌측 에디터 탭(링크/프로필/테마/통계) + 우측 390x780pt iOS 베젤 라이브 프리뷰
- **F-202 (링크 CRUD & 토글)**: 링크 생성/수정/삭제 및 공개 여부 Switch 토글
- **F-203 (드래그 앤 드롭)**: 링크 목록 드래그하여 순서 변경 (`@hello-pangea/dnd` 또는 `@dnd-kit`)
- **F-204 (테마 커스텀)**: Toss Light, Toss Dark, Toss Blue 프리셋 선택 및 세부 커스텀

### F-300. 통계 및 분석 대시보드 (Analytics Dashboard)
- **F-301 (요약 지표)**: 총 프로필 방문 수 및 총 링크 클릭 수 TDS 지표 카드 제공
- **F-302 (개별 링크 클릭 수)**: 순위별 링크 클릭 현황 리스트 노출
- **F-303 (추이 차트)**: 최근 7일 및 30일 기간별 방문/클릭 수 Line/Bar 차트 시각화

---

## 5. 사용자 시나리오 (User Scenarios)

### 🎬 시나리오 1: 방문자 '이수진'의 프로필 탐색 및 미디어 감상
- **페르소나**: 인스타그램 및 외부 링크를 통해 크리에이터 프로필을 처음 방문한 사용자
- **사전 조건**: 사용자가 모바일 디바이스에서 공개 프로필 URL(`/@toss_creator`)에 진입함.
- **진행 과정**:
  1. 페이지 진입 시 TDS 아바타, 이름("김토스"), 자필 Bio 및 깔끔한 무채색(`grey-50`) 배경을 확인한다.
  2. 프로필 상단의 인스타그램/유튜브 아이콘을 터치하여 외부 계정을 확인하거나, 중앙의 56px 링크 버튼들을 스크롤한다.
  3. "최신 유튜브 영상 보기" 링크 카드를 클릭한다.
  4. 클릭 즉시 해당 링크의 `clickCount`가 증가하고, 인라인 미디어 임베드 카드가 펼쳐져 재생 가능한 비디오를 감상한다.
- **기대 결과**: 깔끔하고 직관적인 TDS 반응형 인터페이스에서 지연 없이 콘텐츠를 탐색할 수 있다.

---

### 🎬 시나리오 2: 크리에이터 '김토스'의 실시간 링크 추가 및 순서 변경
- **페르소나**: 마이링크 대시보드를 통해 자신의 프로필 링크를 관리하는 크리에이터
- **사전 조건**: 대시보드 에디터(`/admin`)에 접근한 상태.
- **진행 과정**:
  1. 에디터 좌측의 '링크 관리' 탭에서 "새 링크 추가하기" TDS 버튼을 클릭한다.
  2. 입력 폼에 제목("신규 굿즈 출시 안내")과 URL 주소를 입력한다.
  3. 방금 생성된 링크 항목의 핸들 아이콘을 드래그하여 최상단 위치로 끌어올린다.
  4. 우측 모바일 390x780pt 라이브 프리뷰에 해당 링크가 최상단에 실시간으로 표시되는 것을 확인한다.
  5. 공개 전환 토글(Switch)을 클릭하여 해당 링크를 비활성화/활성화 처리해 본다.
- **기대 결과**: 새로고침 없이 즉시 우측 라이브 프리뷰와 LocalStorage(`my-link-storage`)에 데이터가 업데이트된다.

---

### 🎬 시나리오 3: 브랜드 컨셉에 맞는 테마 커스터마이징
- **페르소나**: 시각적 브랜드 이미지를 토스 블루 및 다크 톤으로 변경하려는 인플루언서
- **사전 조건**: 에디터의 '테마 설정' 탭으로 이동한 상태.
- **진행 과정**:
  1. 프리셋 갤러리에서 'Toss Blue' 또는 'Toss Dark' 카드 프리셋을 선택한다.
  2. 세부 커스텀 옵션에서 버튼 모양을 `Pill (rounded-full)`에서 `Rounded (rounded-xl)`로 변경한다.
  3. 우측 라이브 프리뷰의 배경색, Pretendard 글꼴 및 버튼 스타일이 동적으로 일괄 변경되는 모습을 실시간으로 확인한다.
- **기대 결과**: 한 번의 선택으로 프로필 전체의 테마 토큰이 적용되며 LocalStorage에 저장된다.

---

### 🎬 시나리오 4: 통계 대시보드를 통한 링크 성과 분석
- **페르소나**: 프로필 방문자 수와 링크 클릭 성과를 분석하고자 하는 크리에이터
- **사전 조건**: 에디터의 '통계 분석' 탭으로 이동한 상태.
- **진행 과정**:
  1. 대시보드 상단에서 총 프로필 방문 수(Total Views)와 총 클릭 수(Total Clicks) 지표 카드를 확인한다.
  2. 개별 링크 클릭 수 리스트에서 어떤 링크가 가장 높은 클릭을 기록했는지 1위부터 순위를 확인한다.
  3. 최근 7일 / 최근 30일 기간 탭을 전환하며 일자별 방문 트렌드 Line/Bar 차트를 살펴본다.
- **기대 결과**: 직관적인 TDS 차트와 지표를 통해 크리에이터가 마케팅 효과를 한눈에 파악할 수 있다.

---

## 6. 단계별 개발 로드맵 (Roadmap)

1. **1단계 (현재 진행)**: 로컬 스토리지 기반 **공개 프로필 페이지(Profile Page)** 시연 뷰 단독 개발
2. **2단계**: 대시보드 에디터 및 실시간 모바일 프리뷰 2컬럼 레이아웃 구축
3. **3단계**: 링크 드래그 앤 드롭 순서 변경 및 테마 커스터마이저 완성
4. **4단계**: 7일/30일 Analytics 차트 시각화 대시보드 완성
