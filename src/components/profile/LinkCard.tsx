'use client';

import React, { useState } from 'react';
import { LinkItem } from '@/types';
import {
  Youtube,
  Globe,
  Music,
  Coffee,
  BookOpen,
  ShoppingBag,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Github,
  Briefcase,
  MessageSquare,
  Calendar,
  FileText,
  Palette,
  Figma,
  Smartphone,
  Megaphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MediaEmbedCard } from './MediaEmbedCard';

interface LinkCardProps {
  link: LinkItem;
  buttonStyle?: string; // TDS buttonStyle token
  onLinkClick: (linkId: string) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  youtube: <Youtube className="size-[18px] flex-shrink-0 text-red-500" />,
  music: <Music className="size-[18px] flex-shrink-0 text-green-500" />,
  coffee: <Coffee className="size-[18px] flex-shrink-0 text-amber-600" />,
  bookopen: <BookOpen className="size-[18px] flex-shrink-0 text-emerald-600" />,
  shoppingbag: <ShoppingBag className="size-[18px] flex-shrink-0 text-indigo-500" />,
  mail: <Mail className="size-[18px] flex-shrink-0 text-toss-blue-500" />,
  globe: <Globe className="size-[18px] flex-shrink-0 text-toss-grey-700" />,
  github: <Github className="size-[18px] flex-shrink-0 text-toss-grey-900" />,
  briefcase: <Briefcase className="size-[18px] flex-shrink-0 text-blue-600" />,
  messagesquare: <MessageSquare className="size-[18px] flex-shrink-0 text-yellow-500" />,
  calendar: <Calendar className="size-[18px] flex-shrink-0 text-orange-500" />,
  filetext: <FileText className="size-[18px] flex-shrink-0 text-teal-600" />,
  palette: <Palette className="size-[18px] flex-shrink-0 text-purple-500" />,
  figma: <Figma className="size-[18px] flex-shrink-0 text-pink-500" />,
  smartphone: <Smartphone className="size-[18px] flex-shrink-0 text-cyan-600" />,
  megaphone: <Megaphone className="size-[18px] flex-shrink-0 text-amber-500" />,
};

function getLinkIcon(icon?: string, type?: string): React.ReactNode {
  const key = (icon ?? type ?? '').toLowerCase();
  return ICON_MAP[key] ?? ICON_MAP['globe'];
}

const BUTTON_RADIUS_MAP: Record<string, string> = {
  'rounded-full': 'rounded-full',
  'rounded-xl': 'rounded-[16px]',
  'rounded-lg': 'rounded-xl',
  outline: 'rounded-[16px] border-2 border-toss-blue-500 bg-transparent text-toss-blue-500 hover:bg-toss-blue-50',
};

export function LinkCard({ link, buttonStyle = 'rounded-xl', onLinkClick }: LinkCardProps) {
  const [showEmbed, setShowEmbed] = useState(false);
  const hasEmbed = Boolean(link.embedUrl);
  const radiusCls = BUTTON_RADIUS_MAP[buttonStyle] ?? 'rounded-[16px]';

  const handleClick = () => {
    onLinkClick(link.id);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {/* 메인 링크 버튼 — 56px 높이, TDS 스타일 */}
      <div className="group relative flex w-full items-center">
        {/* 링크 본문 (전체 너비) */}
        <Button
          variant="outline"
          className={`
            h-14 w-full flex-1 justify-start gap-3.5 border-toss-grey-200/80 bg-white
            px-4 ${hasEmbed ? 'pr-12' : 'pr-4'} text-toss-grey-900 shadow-2xs
            hover:border-toss-blue-500 hover:bg-white hover:shadow-xs
            active:scale-[0.985] transition-all duration-150
            ${radiusCls}
          `}
          asChild
          onClick={handleClick}
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-toss-grey-100/70 group-hover:bg-toss-blue-50 transition-colors">
              {getLinkIcon(link.icon, link.type)}
            </div>

            <span className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight text-toss-grey-900 group-hover:text-toss-blue-600 transition-colors">
              {link.title}
            </span>

            {/* 클릭 수 뱃지 */}
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              {link.clickCount > 0 && (
                <Badge
                  variant="secondary"
                  className="rounded-full bg-toss-grey-100 font-mono text-[11px] text-toss-grey-700 tabular-nums px-2 py-0.5"
                >
                  {link.clickCount.toLocaleString()}
                </Badge>
              )}

              {!hasEmbed && (
                <ExternalLink className="size-4 shrink-0 text-toss-grey-400 group-hover:text-toss-blue-500 transition-colors" />
              )}
            </div>
          </a>
        </Button>


        {/* 미디어 토글 버튼 — 카드 우측에 absolute 배치 */}
        {hasEmbed && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 size-8 shrink-0 rounded-full text-toss-grey-400 hover:bg-toss-grey-100 hover:text-toss-blue-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowEmbed((prev) => !prev);
            }}
            aria-label={showEmbed ? '미디어 접기' : '미디어 펼치기'}
          >
            {showEmbed ? (
              <ChevronUp className="size-4 text-toss-blue-500" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        )}
      </div>

      {/* 미디어 임베드 아코디언 */}
      {hasEmbed && showEmbed && <MediaEmbedCard link={link} />}
    </div>
  );
}
