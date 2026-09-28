# 마이링크 (My Link) 디자인 가이드

> **토스 디자인 시스템(TDS)** 기반의 shadcn/ui + Tailwind CSS 컴포넌트 가이드입니다.
> 모든 UI는 이 문서의 토큰과 컴포넌트 규칙을 따라 구현합니다.

---

## 1. 스타일링 원칙

| 규칙 | 내용 |
|---|---|
| **스타일 방식** | Tailwind CSS 유틸리티 클래스만 사용 (`.module.css` 금지) |
| **컴포넌트 베이스** | `src/components/ui/`의 shadcn/ui 컴포넌트 재사용 |
| **클래스 병합** | `cn()` 유틸리티 (clsx + tailwind-merge) 사용 |
| **폰트** | Pretendard Variable (CDN 로드) |
| **단위** | `px` 기준 4px 베이스 그리드 (Tailwind spacing scale) |

---

## 2. 컬러 토큰 (Color Tokens)

TDS 컬러는 `src/app/globals.css`의 `@theme` 블록에 CSS 변수로 정의되며, Tailwind 클래스(`text-toss-blue-500`, `bg-toss-grey-100` 등)로 사용합니다.

### 2.1 Brand / Accent

| 토큰명 | Tailwind 클래스 | HEX / OKLCH | 사용처 |
|---|---|---|---|
| **Blue 500** | `toss-blue-500` | `#3182F6` | Primary CTA 버튼, 링크 포인트 |
| **Blue 600** | `toss-blue-600` | `oklch(0.522 0.176 257)` | 버튼 Pressed 상태 |
| **Blue 50** | `toss-blue-50` | `#E8F3FF` | 강조 칩, 연한 배경 |

### 2.2 Neutral / Greyscale (Cool Grey)

| 토큰명 | Tailwind 클래스 | HEX | 사용처 |
|---|---|---|---|
| **Grey 900** | `toss-grey-900` | `#191F28` | 주요 텍스트 (Pure Black 금지) |
| **Grey 700** | `toss-grey-700` | `#4E5968` | 보조 설명, 아이콘 |
| **Grey 400** | `toss-grey-400` | `#B0B8C1` | 비활성 텍스트, 서브 라벨 |
| **Grey 200** | `toss-grey-200` | `#E5E8EB` | 보더, 구분선 |
| **Grey 100** | `toss-grey-100` | `#F2F4F6` | 카드 배경, 입력창 배경 |
| **Grey 50** | `toss-grey-50` | `#F9FAFB` | 전체 페이지 배경 |

### 2.3 Semantic

| 토큰명 | Tailwind 클래스 | HEX / OKLCH | 사용처 |
|---|---|---|---|
| **Red 500** | `toss-red-500` | `#F04452` | 에러, 삭제, Danger |
| **Green 500** | `toss-green-500` | `oklch(0.493 0.143 154)` | 성공, 완료 |
| **Orange 500** | `toss-orange-500` | `oklch(0.748 0.183 56)` | 경고 |

### 2.4 shadcn/ui CSS 변수 매핑 (Light / Dark)

| CSS 변수 | Light | Dark |
|---|---|---|
| `--primary` | `#3182F6` | `#3182F6` |
| `--background` | `#F9FAFB` | `#191F28` |
| `--foreground` | `#191F28` | `#F9FAFB` |
| `--card` | `#FFFFFF` | `#242D39` |
| `--secondary` | `#F2F4F6` | `#2C3544` |
| `--muted-foreground` | `#4E5968` | `#B0B8C1` |
| `--border` | `#E5E8EB` | `#333D4B` |
| `--accent` | `#E8F3FF` | `#2C3544` |
| `--destructive` | `#F04452` | `#F04452` |

---

## 3. 타이포그래피 (Typography)

**폰트 스택**: `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif`

> CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`

| 토큰명 | Size | Weight | Line Height | Tailwind 조합 | 사용처 |
|---|---|---|---|---|---|
| **display-1** | 56px | 700 Bold | 1.30 | `text-[56px] font-bold leading-[1.30]` | 통계 주요 수치 |
| **h1** | 28px | 700 Bold | 1.30 | `text-[28px] font-bold leading-[1.30]` | 페이지 타이틀 |
| **h2** | 24px | 700 Bold | 1.30 | `text-2xl font-bold leading-[1.30]` | 섹션 타이틀, 이름 |
| **title-1** | 18px | 600 Semibold | 1.45 | `text-lg font-semibold leading-[1.45]` | 카드 헤더 |
| **body-1** | 17px | 400 Regular | 1.50 | `text-[17px] leading-relaxed` | 대형 본문 |
| **body-2** | 15px | 400 Regular | 1.50 | `text-[15px] leading-relaxed` | 표준 본문, 링크 제목 |
| **label-l** | 17px | 700 Bold | 1.25 | `text-[17px] font-bold leading-[1.25]` | XL/L 버튼 라벨 |
| **label-m** | 15px | 600 Semibold | 1.25 | `text-[15px] font-semibold leading-[1.25]` | M 버튼 / 입력 라벨 |
| **caption** | 12px | 500 Medium | 1.40 | `text-xs font-medium leading-[1.40]` | 캡션, 서브 라벨 |

> **수치 표기**: 통계·클릭 수 등 숫자는 `tabular-nums` 클래스로 고정폭 적용

---

## 4. 라운드 / 간격 (Radius & Spacing)

### 4.1 Radius Ladder

| 토큰명 | 값 | CSS 변수 | Tailwind 클래스 | 사용처 |
|---|---|---|---|---|
| **radius-s** | 8px | `--radius-s` | `rounded-lg` | 태그, 칩, 뱃지 |
| **radius-m** | 12px | `--radius-m` | `rounded-xl` | M 버튼, 입력창 |
| **radius-l** | 14px | `--radius-l` | `rounded-[14px]` | L 버튼, 아바타 |
| **radius-xl** | 16px | `--radius-xl` | `rounded-[16px]` | XL 버튼(링크 카드), 대형 카드 |
| **radius-2xl** | 20px | `--radius-2xl` | `rounded-[20px]` | 모달, 다이얼로그 |
| **radius-full** | 999px | `--radius-full` | `rounded-full` | Pill 버튼, 아이콘 버튼 |

### 4.2 Spacing (4px 베이스 그리드)

| 토큰 | px | Tailwind |
|---|---|---|
| space-1 | 4px | `p-1` / `gap-1` |
| space-2 | 8px | `p-2` / `gap-2` |
| space-3 | 12px | `p-3` / `gap-3` |
| space-4 | 16px | `p-4` / `gap-4` |
| space-5 | 20px | `p-5` / `gap-5` |
| space-6 | 24px | `p-6` / `gap-6` |

---

## 5. 컴포넌트 가이드 (shadcn/ui 기반)

모든 컴포넌트는 `src/components/ui/`에 위치하며, TDS 토큰으로 오버라이드합니다.

### 5.1 Button

```tsx
import { Button } from '@/components/ui/button';

// Primary CTA — TDS h-14(56px), rounded-[16px]
<Button className="h-14 w-full rounded-[16px] bg-toss-blue-500 text-white font-semibold text-[15px] hover:bg-toss-blue-600">
  링크 추가하기
</Button>

// Outline — 소셜 아이콘 버튼
<Button variant="outline" size="icon" className="size-9 rounded-full border-toss-grey-200">
  <Instagram className="size-4" />
</Button>

// Ghost — 인라인 토글
<Button variant="ghost" size="icon" className="size-8 rounded-full hover:bg-toss-grey-100">
  <ChevronDown className="size-4" />
</Button>
```

**Variant 정의**

| Variant | 기본 스타일 | TDS 오버라이드 예시 |
|---|---|---|
| `default` | Primary blue CTA | `bg-toss-blue-500 text-white` |
| `outline` | 테두리 버튼 | `border-toss-grey-200 hover:border-toss-blue-500` |
| `secondary` | 연한 배경 | `bg-toss-grey-100 text-toss-grey-900` |
| `ghost` | 배경 없음 | `hover:bg-toss-grey-100` |
| `destructive` | 위험/삭제 | `bg-toss-red-500` |

**Size 정의**

| Size | Height | 사용처 |
|---|---|---|
| `default` | h-9 (36px) | 일반 버튼 |
| `sm` | h-8 (32px) | 소형 버튼 |
| `lg` | h-10 (40px) | 대형 버튼 |
| `icon` | size-9 (36px) | 아이콘 버튼 |
| *(커스텀)* | h-14 (56px) | TDS XL 링크 카드 버튼 |

---

### 5.2 Card

```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 기본 카드 — 미디어 임베드, 통계 카드
<Card className="rounded-2xl border-toss-grey-200 bg-white shadow-xs">
  <CardContent className="px-4">
    {/* 내용 */}
  </CardContent>
</Card>
```

**사용 규칙**
- 링크 카드(LinkCard)는 `Button asChild`로 구현 — `Card`가 아닌 `Button` 사용
- 미디어 임베드, 통계 위젯 등 컨테이너 역할에 `Card` 사용
- 모서리는 최소 `rounded-xl`(12px) 이상 적용

---

### 5.3 Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// 프로필 아바타 — 96×96, TDS radius-l(14px)
<Avatar className="size-24 rounded-[14px] ring-4 ring-white shadow-sm">
  <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
  <AvatarFallback className="rounded-[14px] bg-toss-grey-100 text-toss-grey-700 font-bold">
    {name.slice(0, 2)}
  </AvatarFallback>
</Avatar>
```

**사용 규칙**
- 프로필 아바타: `size-24 rounded-[14px]` (TDS radius-l)
- 소형 아바타 (댓글, 리스트): `size-8 rounded-full` (기본 원형)
- 항상 `AvatarFallback`으로 이름 이니셜 대체 텍스트 제공

---

### 5.4 Badge

```tsx
import { Badge } from '@/components/ui/badge';

// 클릭 수 뱃지 — 숫자 카운트
<Badge variant="secondary" className="rounded-full bg-toss-grey-100 font-mono text-xs text-toss-grey-700 tabular-nums">
  {clickCount.toLocaleString()}
</Badge>

// 타입 표시 뱃지
<Badge variant="secondary" className="gap-1.5 rounded-full bg-toss-grey-100 text-toss-grey-700">
  <Play className="size-3 text-red-500" />
  YouTube 미리보기
</Badge>

// 방문자 수 뱃지
<Badge variant="outline" className="rounded-full border-toss-grey-200 bg-white px-3 py-1.5 text-xs text-toss-grey-700">
  <Eye className="size-3.5 text-toss-blue-500" />
  총 방문자 4,320회
</Badge>
```

**Variant 정의**

| Variant | 배경 | 사용처 |
|---|---|---|
| `default` | `bg-primary` (blue) | 강조 상태 표시 |
| `secondary` | `bg-toss-grey-100` | 클릭 수, 타입 라벨 |
| `outline` | 테두리만 | 방문자 수, 상태 표시 |
| `destructive` | `bg-toss-red-500` | 에러, 경고 |

---

### 5.5 Separator

```tsx
import { Separator } from '@/components/ui/separator';

// 섹션 구분선
<Separator className="bg-toss-grey-200" />
```

---

## 6. 페이지 레이아웃

### 6.1 공개 프로필 페이지 (`/`)

```
[전체 배경: bg-toss-grey-100]
  └─ [모바일 목업 컨테이너: max-w-md, bg-toss-grey-50]
       ├─ ProfileHeader
       │    ├─ Avatar (size-24, rounded-[14px])
       │    ├─ 이름 (text-2xl font-bold)
       │    ├─ @username (text-xs text-toss-grey-400)
       │    ├─ Bio (text-[15px] text-toss-grey-700)
       │    └─ 소셜 아이콘 스택 (Button outline, rounded-full)
       ├─ LinkCard × N
       │    ├─ Button (h-14, rounded-[16px], outline)
       │    │    ├─ 아이콘 (size-[18px])
       │    │    ├─ 제목 (text-[15px] font-semibold truncate)
       │    │    └─ 클릭 수 Badge
       │    └─ [미디어 토글 시] MediaEmbedCard (Card, aspect-video iframe)
       └─ ProfileFooter
            ├─ Separator
            ├─ 방문자 수 Badge (outline)
            ├─ 공유 Button (outline, rounded-full)
            └─ 브랜드 크레딧
```

---

## 7. 톤 앤 매너 (Tone & Manner)

| 항목 | 규칙 |
|---|---|
| **언어 스타일** | **해요체** 사용 ("링크를 추가했어요", "변경사항을 저장할까요?") |
| **버튼 라벨** | 동작 명시 ("링크 추가하기", "테마 적용하기") |
| **빈 상태(Empty State)** | 친근한 이모지 + 안내 문구 ("아직 활성화된 링크가 없어요 🥺") |
| **에러 메시지** | 원인 + 해결 방법 함께 안내 |
| **숫자 표기** | `toLocaleString()` + `tabular-nums` 클래스로 고정폭 정렬 |

---

## 8. 컴포넌트 파일 구조

```
src/
├── app/
│   ├── globals.css          ← TDS 컬러 토큰 (@theme), shadcn CSS 변수 정의
│   ├── layout.tsx           ← Pretendard 폰트 CDN 로드
│   └── page.tsx             ← PublicProfileView 렌더링
├── components/
│   ├── ui/                  ← shadcn/ui 기본 컴포넌트 (직접 수정 금지)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   └── profile/             ← 마이링크 도메인 컴포넌트 (TDS + shadcn/ui 조합)
│       ├── PublicProfileView.tsx
│       ├── ProfileHeader.tsx
│       ├── LinkCard.tsx
│       ├── MediaEmbedCard.tsx
│       └── ProfileFooter.tsx
├── store/
│   └── useMyLinkStore.ts    ← Zustand + persist (localStorage)
├── data/
│   └── mockData.ts          ← 초기 Mock 데이터
├── types/
│   └── index.ts             ← TypeScript 인터페이스
└── lib/
    └── utils.ts             ← cn() 유틸리티
```

> **[규칙]** `src/components/ui/` 파일은 shadcn/ui CLI로 관리하며 직접 수정하지 않습니다.
> TDS 커스터마이즈는 `globals.css`의 CSS 변수와 컴포넌트 호출 시 `className` 오버라이드로 처리합니다.
