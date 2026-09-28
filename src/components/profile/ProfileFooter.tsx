'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Eye, Share2, Check } from 'lucide-react';

interface ProfileFooterProps {
  totalViews: number;
}

export function ProfileFooter({ totalViews }: ProfileFooterProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: '박현아의 마이링크',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  return (
    <footer className="flex flex-col items-center gap-4 px-6 pb-10 pt-6">
      <Separator className="bg-toss-grey-200" />

      {/* 방문자 수 + 공유 버튼 */}
      <div className="flex items-center gap-2.5">
        {/* 방문자 수 뱃지 */}
        <Badge
          variant="outline"
          className="gap-1.5 rounded-full border-toss-grey-200 bg-white px-3 py-1.5 text-xs font-medium text-toss-grey-700 shadow-2xs"
        >
          <Eye className="size-3.5 text-toss-blue-500" />
          총 방문자 {totalViews.toLocaleString()}회
        </Badge>

        {/* 공유하기 버튼 */}
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-full border-toss-blue-500/20 bg-toss-blue-50 px-3 text-xs font-semibold text-toss-blue-500 shadow-2xs hover:bg-toss-blue-500 hover:text-white transition-all"
          onClick={handleShare}
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              복사됨!
            </>
          ) : (
            <>
              <Share2 className="size-3.5" />
              공유하기
            </>
          )}
        </Button>
      </div>

      {/* 브랜드 크레딧 */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs text-toss-grey-400">
          Powered by{' '}
          <span className="font-bold text-toss-blue-500">마이링크 (My Link)</span>
        </p>
        <p className="text-[11px] text-toss-grey-400">
          Toss Design System (TDS) based single profile
        </p>
      </div>
    </footer>
  );
}
