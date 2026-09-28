'use client';

import React from 'react';
import { LinkItem } from '@/types';
import { Play, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MediaEmbedCardProps {
  link: LinkItem;
}

export function MediaEmbedCard({ link }: MediaEmbedCardProps) {
  if (!link.embedUrl) return null;

  const isYoutube = link.type === 'youtube';

  return (
    <Card className="w-full gap-3 rounded-2xl border-toss-grey-200 bg-white py-4 shadow-xs">
      <CardContent className="px-4">
        {/* 타입 표시 배지 */}
        <Badge
          variant="secondary"
          className="mb-3 gap-1.5 rounded-full bg-toss-grey-100 text-toss-grey-700 font-medium"
        >
          {isYoutube ? (
            <>
              <Play className="size-3 fill-red-500 text-red-500" />
              YouTube 미리보기
            </>
          ) : (
            <>
              <Music className="size-3 text-green-500" />
              음악 오디오 플레이어
            </>
          )}
        </Badge>

        {/* iframe 임베드 영역 */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-toss-grey-200 bg-toss-grey-100">
          <iframe
            src={link.embedUrl}
            title={link.title}
            className="absolute inset-0 size-full border-0"
            allow={
              isYoutube
                ? 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                : 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            }
            allowFullScreen
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  );
}
