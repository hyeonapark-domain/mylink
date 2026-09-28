'use client';

import React, { useState } from 'react';
import { LinkItem, ThemeConfig } from '@/types';
import { Badge } from '@/components/ui/badge';
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
} from 'lucide-react';
import { MediaEmbedCard } from './MediaEmbedCard';

interface LinkCardProps {
  link: LinkItem;
  theme?: ThemeConfig;
  onLinkClick: (linkId: string) => void;
}

const renderLinkIcon = (iconName?: string, type?: string) => {
  const iconClass = "w-5 h-5 flex-shrink-0";
  switch (iconName?.toLowerCase() || type) {
    case 'youtube':
      return <Youtube className={`${iconClass} text-red-500`} />;
    case 'music':
    case 'spotify':
      return <Music className={`${iconClass} text-green-500`} />;
    case 'coffee':
    case 'buymeacoffee':
      return <Coffee className={`${iconClass} text-amber-600`} />;
    case 'bookopen':
    case 'velog':
      return <BookOpen className={`${iconClass} text-emerald-600`} />;
    case 'shoppingbag':
    case 'smartstore':
      return <ShoppingBag className={`${iconClass} text-indigo-500`} />;
    case 'mail':
    case 'email':
      return <Mail className={`${iconClass} text-blue-500`} />;
    default:
      return <Globe className={`${iconClass} text-toss-grey-700`} />;
  }
};

export const LinkCard: React.FC<LinkCardProps> = ({ link, theme, onLinkClick }) => {
  const [showEmbed, setShowEmbed] = useState(false);

  const handleClick = () => {
    onLinkClick(link.id);
  };

  const hasMediaEmbed = Boolean(link.embedUrl);

  const getButtonStyle = () => {
    switch (theme?.buttonStyle) {
      case 'rounded-full':
        return 'rounded-full';
      case 'rounded-lg':
        return 'rounded-lg';
      case 'outline':
        return 'rounded-2xl border-2 border-toss-blue-500 bg-transparent text-toss-blue-500';
      case 'rounded-xl':
      default:
        return 'rounded-[16px]';
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="relative group">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={`
            flex items-center justify-between w-full h-[56px] px-5
            bg-white border border-toss-grey-200 shadow-2xs
            hover:border-toss-blue-500 hover:shadow-xs active:scale-[0.985]
            transition-all duration-200 cursor-pointer
            ${getButtonStyle()}
          `}
        >
          {/* 좌측: 아이콘 + 제목 */}
          <div className="flex items-center space-x-3.5 min-w-0 pr-2">
            {renderLinkIcon(link.icon, link.type)}
            <span className="text-[15px] font-semibold text-toss-grey-900 truncate">
              {link.title}
            </span>
          </div>

          {/* 우측: 클릭 카운트 / 미디어 토글 / 외부 링크 아이콘 */}
          <div className="flex items-center space-x-2 flex-shrink-0 text-toss-grey-400">
            {link.clickCount > 0 && (
              <Badge variant="secondary" className="font-mono text-xs font-medium">
                {link.clickCount.toLocaleString()}
              </Badge>
            )}

            {hasMediaEmbed ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowEmbed((prev) => !prev);
                }}
                className="p-1 hover:bg-toss-grey-100 rounded-full text-toss-grey-700 transition-colors cursor-pointer"
                title={showEmbed ? "미디어 접기" : "미디어 펼치기"}
              >
                {showEmbed ? (
                  <ChevronUp className="w-4 h-4 text-toss-blue-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-toss-grey-700" />
                )}
              </button>
            ) : (
              <ExternalLink className="w-4 h-4 group-hover:text-toss-blue-500 transition-colors" />
            )}
          </div>
        </a>
      </div>

      {/* 미디어 임베드 아코디언 */}
      {hasMediaEmbed && showEmbed && <MediaEmbedCard link={link} />}
    </div>
  );
};
