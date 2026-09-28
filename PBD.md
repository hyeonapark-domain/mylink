# [마이링크 (My Link)] 제품 기능 정의서 (PBD - Product Backlog Document)

---

## 1. 문서 개요 (Overview)

### 1.1 서비스 개요
- **서비스명**: 마이링크 (My Link)
- **서비스 정의**: 개인 크리에이터 및 일반 사용자가 자신만의 고유한 단일 프로필 페이지를 만들고, 소셜 미디어, 웹사이트 링크, 미디어 콘텐츠를 한곳에 모아 공유할 수 있는 **링크트리(Linktree) 클론 서비스**입니다.
- **핵심 목표**: 별도의 서버 구축 없이 브라우저 환경에서 즉시 동작하는 **Mock 데이터 및 로컬 스토리지(LocalStorage) 기반 클라이언트 전용 데모 애플리케이션**을 제공합니다.
- **디자인 컨셉**: **shadcn/ui**를 기본 컴포넌트 라이브러리로 채택하고, **토스 디자인 시스템(TDS - Toss Design System)**의 디자인 언어, 컬러 토큰, 타이포그래피, 마이크로 카피(해요체)를 적용하여 정갈하고 완성도 높은 UI/UX를 제공합니다.

### 1.2 주요 특징
1. **Zustand 전역 상태 관리**: 보일러플레이트가 적고 직관적인 **Zustand** 스토어를 사용하며, `persist` 미들웨어를 통해 `localStorage`와 자동 동기화됩니다.
2. **실시간 라이브 프리뷰**: 좌측 편집 에디터의 변경 사항이 우측 모바일 목업 프리뷰(TDS iOS 베젤)에 즉시 반영됩니다.
3. **드래그 앤 드롭 순서 변경**: 링크 목록을 손쉽게 끌어서 순서를 변경할 수 있습니다.
4. **로컬 스토리지 데이터 영속성**: 브라우저를 새로고침하거나 재방문해도 편집한 내용과 통계 데이터가 유지됩니다.
5. **기본 통계 분석 시각화**: 총 프로필 방문 수, 개별 링크 클릭 수, 최근 7일/30일 추이 차트를 제공합니다.
6. **shadcn/ui & TDS 기반 디자인 시스템**: **shadcn/ui** 기반 컴포넌트 체계에 토스 블루(`blue-500: #3182F6`), 무채색 Cool Grey 톤, Pretendard 폰트 스택 및 토스 스타일 라운드/컴포넌트 체계를 완벽히 적용합니다.

---

## 2. 시스템 아키텍처 및 데이터 명세

### 2.1 데이터 및 상태 관리 아키텍처
- **State Store**: **Zustand (`useMyLinkStore`)**
- **Persistence**: Zustand `persist` 미들웨어 + Browser `localStorage` (`name: 'my-link-storage'`)
- **초기 로딩 동작**: `localStorage`가 비어있을 경우 기본 샘플 Mock Data를 자동 로드합니다.
- **상태 반응성**: 에디터에서 링크 CRUD, 프로필 수정, 테마 변경 시 Zustand 스토어 액션이 트리거되어 우측 모바일 프리뷰 및 공개 프로필에 즉각 반영됩니다.

### 2.2 Zustand 스토어 구조 예시 (TypeScript)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface ThemeConfig {
  themeId: 'toss-light' | 'toss-dark' | 'toss-blue' | 'custom';
  backgroundColor: string;
  textColor: string;
  buttonStyle: 'rounded-full' | 'rounded-xl' | 'rounded-lg' | 'outline';
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: string;
}

export interface AnalyticsData {
  totalViews: number;
  dailyStats: {
    date: string;
    views: number;
    clicks: number;
  }[];
}

interface MyLinkState {
  profile: Profile;
  links: LinkItem[];
  theme: ThemeConfig;
  analytics: AnalyticsData;

  // Actions
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

export const useMyLinkStore = create<MyLinkState>()(
  persist(
    (set, get) => ({
      // 초기 state 및 액션 구체 구현...
    }),
    {
      name: 'my-link-storage',
    }
  )
);
```

---

## 3. 디자인 시스템 및 UI/UX 가이드라인 (shadcn/ui 및 Toss Design System 기반)

본 서비스는 **shadcn/ui** 컴포넌트 라이브러리를 기본 골격으로 사용하며, **TDS (Toss Design System)**의 토큰과 디자인 가이드라인을 주입하여 제작됩니다.

### 3.1 컬러 팔레트 (Color Tokens)

#### Brand & Accent Colors
- **Primary Brand (`blue-500`)**: `#3182F6` / `oklch(0.620 0.191 258)` (화면당 하나의 주요 CTA 버튼 및 포인트에 적용)
- **Brand Pressed (`blue-600`)**: `oklch(0.522 0.176 257)` (버튼 눌림 상태)
- **Brand Weak Background (`blue-50`)**: `#E8F3FF` / `oklch(0.959 0.020 250)` (강조 칩 및 연한 배경)

#### Neutral & Greyscale (Cool-blue tinted neutrals)
- **Text Primary (`grey-900`)**: `#191F28` / `oklch(0.237 0.020 258)` (주요 텍스트, 절대 Pure Black 사용 금지)
- **Text Secondary (`grey-700`)**: `#4E5968` / `oklch(0.460 0.028 256)` (보조 설명 텍스트)
- **Disabled Text / Line Strong (`grey-400`)**: `#B0B8C1` / `oklch(0.779 0.016 251)`
- **Border / Divider (`grey-200`)**: `#E5E8EB` / `oklch(0.930 0.005 248)` (기본 구분선 및 입력창 보더)
- **Secondary Surface (`grey-100`)**: `#F2F4F6` / `oklch(0.966 0.003 248)` (카드/입력창 기본 배경)
- **Background (`grey-50`)**: `#F9FAFB` / `oklch(0.985 0.002 248)` (페이지 전체 배경)
- **White**: `#FFFFFF` / `oklch(1.000 0.000 0)`

#### Semantic Palette
- **Danger / Error (`red-500`)**: `#F04452` / `oklch(0.641 0.208 21)`
- **Success (`green-500`)**: `oklch(0.493 0.143 154)`
- **Warning (`orange-500`)**: `oklch(0.748 0.183 56)`

---

### 3.2 타이포그래피 (Typography)
서체 스택: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", "Apple SD Gothic Neo", sans-serif`

| 토큰명 | Size | Weight | Line Height | Letter Spacing | 사용처 |
|---|---|---|---|---|---|
| **display-1** | 56px | Bold (700) | 1.30 | -0.005em | 통계 수치 강조 display |
| **h1** | 28px | Bold (700) | 1.30 | -0.020em | 페이지/모달 메인 타이틀 |
| **h2** | 24px | Bold (700) | 1.30 | -0.020em | 섹션 헤딩 |
| **title-1** | 18px | Semibold (600) | 1.45 | -0.010em | 카드/리스트 타이틀 |
| **body-1** | 17px | Regular (400) | 1.50 | -0.005em | 본문 텍스트 (L) |
| **body-2** | 15px | Regular (400) | 1.50 | -0.005em | 본문 텍스트 (M - 표준) |
| **label-l** | 17px | Bold (700) | 1.25 | -0.005em | XL/L 버튼 라벨 |
| **label-m** | 15px | Semibold (600) | 1.25 | -0.005em | M 버튼/입력 라벨 |
| **caption** | 12px | Medium (500) | 1.40 | 0em | 캡션/서브노트 |

> **숫자 표기 규칙**: 실시간 수치 및 통계 데이터는 `tabular-nums` 고정폭 숫자를 적용하여 정렬을 유지하며, 일반 산문 및 강조용 수치는 `proportional-nums`를 적용합니다.

---

### 3.3 간격 및 둥글기 (Spacing & Rounded Tokens)

#### Spacing Ladder
- `space-1`: 4px | `space-2`: 8px (밀접 요소 간격) | `space-3`: 12px | `space-4`: 16px (기본 컴포넌트 패딩) | `space-6`: 24px (화면 외각 패딩) | `space-8`: 32px | `space-12`: 48px

#### Rounded Radius
- `radius-s`: 8px (태그, 칩)
- `radius-m`: 12px (M 버튼, 입력 폼)
- `radius-l`: 14px (L 버튼, 리스트 아이템)
- `radius-xl`: 16px (XL 버튼 56px, 대형 카드)
- `radius-2xl`: 20px (모달, 다이얼로그, 바텀시트)
- `radius-3xl`: 24px (섹션 카드)
- `radius-full`: 999px (Pill 버튼, 캡슐 칩)

---

### 3.4 TDS 핵심 컴포넌트 규격

1. **Button**
   - **XL (56px)**: `radius-xl` (16px), 17px Bold 라벨. 화면 주요 CTA 적용 (`BottomCTA` 및 기본 제출 버튼).
   - **L (48px)**: `radius-l` (14px), 17px Bold 라벨.
   - **M (40px)**: `radius-m` (12px), 15px Semibold 라벨.
   - **Variant**: `Primary` (`fill-brand: #3182F6` + 흰 텍스트), `Secondary` (`fill-secondary: #F2F4F6` + grey-900 텍스트), `Ghost` (투명 배경 + blue-500 텍스트).
2. **ListRow**
   - 좌우 패딩 24px, 높이 최소 56px~64px.
   - 44px 아바타/아이콘 + 타이틀/서브타이틀 스택 + 우측 액션/드래그 핸들 슬롯.
3. **TextField**
   - 높이 48px, `radius-m` (12px), 기본 배경 `grey-100`, Focus 시 흰 배경 + 1.5px `blue-500` 보더.
4. **Toast & Dialog**
   - `grey-900` 표면의 토스트 모달, 20px 라운드의 TDS 스타일 다이얼로그.

---

### 3.5 톤 앤 매너 & 마이크로카피 (Voice & Tone)
- **해요체 사용**: 모든 UI 카피는 격식체(~합니다)가 아닌 대화형 존댓말 **"해요체"**를 표준으로 사용합니다.
  - *예시*: "링크를 추가했어요", "변경사항을 저장할까요?", "삭제된 링크는 복구할 수 없어요"
- **직관적 액션 라벨**: 버튼 라벨은 "여기를 누르세요" 형태가 아닌 **일어날 동작을 명확히 설명**합니다 (`송금하기`, `링크 추가하기`, `테마 변경하기`).
- **단일 강조색 지침**: 화면당 가장 중요한 1개 액션에만 `blue-500`을 사용하고, 나머지 보조 액션은 `grey-100` 배경을 사용합니다.

---

## 4. 기능 요구사항 명세 (Functional Requirements)

### F-100. 공개 프로필 페이지 (Public Profile View)

| 기능 ID | 기능명 | 상세 설명 | 우선순위 |
|---|---|---|---|
| **F-101** | 프로필 상단 정보 노출 | TDS 아바타(radius 14), 사용자 이름(h2/title-1), Bio(body-2 grey-700) 노출 | Must |
| **F-102** | SNS 아이콘 링크 | 인스타그램, 유튜브, X, GitHub 등 TDS 스펙 기반 Lucide/TDS 아이콘 버튼 | Must |
| **F-103** | 활성화 링크 목록 노출 | `isActive: true`인 링크를 TDS 스타일 버튼(48~56px, radius-xl)으로 렌더링 | Must |
| **F-104** | 미디어 임베드 렌더링 | 유튜브 비디오 또는 음악 스트리밍 플레이어를 카드형 내장 컴포넌트로 노출 | Should |
| **F-105** | 테마 커스텀 스타일 적용 | TDS 프리셋(Toss Light, Toss Dark, Toss Blue) 및 사용자 커스텀 컬러/라운드 동적 적용 | Must |
| **F-106** | 방문 및 클릭 수 트래킹 | 공개 프로필 방문 및 링크 클릭 시 LocalStorage 업데이트 (`useMyLinkStore.recordClick`) | Must |

---

### F-200. 대시보드 & 프로필 에디터 (Dashboard & Editor)

| 기능 ID | 기능명 | 상세 설명 | 우선순위 |
|---|---|---|---|
| **F-201** | 2컬럼 레이아웃 | - **좌측**: 에디터 (링크 관리 / 프로필 / 테마 / 통계 탭)<br>- **우측**: 모바일 390x780pt iOS 프레임 내 실시간 라이브 프리뷰 | Must |
| **F-202** | 링크 추가/수정/삭제 | TDS TextField 및 Button 적용 링크 CRUD (Zustand 스토어 액션 연동) | Must |
| **F-203** | 링크 활성화 토글 | TDS 스위치(Switch) 컴포넌트로 공개 노출 여부 토글 | Must |
| **F-204** | 드래그 앤 드롭 순서 변경 | 핸들 아이콘 드래그로 순서 변경 (`@hello-pangea/dnd` 또는 `@dnd-kit`) -> Zustand `reorderLinks` 스토어 반영 | Must |
| **F-205** | 프로필 기본 정보 편집 | 아바타 URL, 이름, Bio, SNS 링크 수정을 TDS TextField 입력창으로 제공 | Must |
| **F-206** | 테마 설정 & 커스텀 | TDS 프리셋 갤러리 (Toss Light, Dark, Blue) 및 개별 버튼/배경/폰트 커스텀 | Must |

---

### F-300. 통계 및 분석 대시보드 (Analytics Dashboard)

| 기능 ID | 기능명 | 상세 설명 | 우선순위 |
|---|---|---|---|
| **F-301** | 주요 요약 지표 카운트 | 총 프로필 방문 수 및 링크 클릭 수 TDS 지표 카드(display-1/h1) 제공 | Must |
| **F-302** | 링크별 클릭 수 현황 | TDS ListRow 스타일의 링크별 클릭 수 순위 목록 | Must |
| **F-303** | 일별 추이 차트 | **최근 7일 및 최근 30일** 기간 필터와 함께 일자별 방문/클릭 수 Line/Bar 차트 (TDS blue-500 하이라이트 적용) | Must |

---

### F-400. 데이터 및 시스템 유틸리티 (Data & System Utilities)

| 기능 ID | 기능명 | 상세 설명 | 우선순위 |
|---|---|---|---|
| **F-401** | 샘플 데이터 자동 세팅 | 최초 접속 시 토스 컨셉의 기본 샘플 프로필 및 링크 데이터를 자동 세팅 | Must |
| **F-402** | 데이터 초기화 (Reset) | "샘플 데이터로 리셋하기" 버튼을 통해 Zustand `resetToDefault` 액션 수행 | Should |

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

## 6. 비기능 요구사항 (Non-Functional Requirements)

1. **Zustand 기반 중앙 관리**: 모든 상태는 단일 Zustand 스토어에서 직관적으로 관리되며 리렌더링 최적화 제공.
2. **클라이언트 전용 실행 환경**: 별도 서버 없이 브라우저 `localStorage` 단독으로 완벽히 동작.
3. **반응형 Web & Mobile View**: 데스크톱 2컬럼 레이아웃, 모바일 프리뷰 지원.
4. **성능 및 실시간 반응성**: 에디터 입력 시 딜레이 없는 프리뷰 업데이트.
5. **디자인 일관성**: TDS 디자인 토큰과 규격을 100% 준수하여 일관된 핀테크/크리에이터 서비스 경험 제공.

---

## 7. 개발 로드맵 및 단계별 계획 (Development Roadmap)

- **Phase 1: Zustand 스토어 및 Mock Storage 구축**
  - Zustand 설치 (`npm install zustand`) 및 `persist` 미들웨어를 활용한 `useMyLinkStore` 생성
- **Phase 2: TDS 토큰 및 UI 컴포넌트 라이브러리 제작**
  - Tailwind CSS에 TDS 토큰 설정 및 `TButton`, `TextField`, `ListRow`, `Switch`, `Toast` 구현
- **Phase 3: 대시보드 에디터 & 실시간 모바일 프리뷰 구현**
  - 링크 CRUD, 드래그앤드롭, 프로필/테마 에디터 및 Zustand 상태 동기화
- **Phase 4: 공개 프로필 뷰 & 통계 차트 시각화 완성**
  - 공개 프로필 렌더링, 클릭/방문 트래킹, 7일/30일 Analytics 차트 시각화
