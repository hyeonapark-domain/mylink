'use client';

import React from 'react';
import { LinkItem } from '@/types';
import { Card } from '@/components/ui/card';
import { Play, Music } from 'lucide-react';

interface MediaEmbedCardProps {
  link: LinkItem;
}

export const MediaEmbedCard: React.FC<MediaEmbedCardProps> = ({ link }) => {
  if (!link.embedUrl) return null;

  return (
    <Card className="w-full overflow-hidden p-3 space-y-2 transition-all">
      <div className="flex items-center space-x-2 text-xs font-semibold text-toss-grey-700 px-1">
        {link.type === 'youtube' ? (
          <>
            <Play className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>YouTube 미리보기</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-green-500" />
            <span>음악 오디오 플레이어</span>
          </>
        )}
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-toss-grey-100 border border-toss-grey-200">
        {link.type === 'youtube' ? (
          <iframe
            src={link.embedUrl}
            title={link.title}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <iframe
            src={link.embedUrl}
            title={link.title}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        )}
      </div>
    </Card>
  );
};
