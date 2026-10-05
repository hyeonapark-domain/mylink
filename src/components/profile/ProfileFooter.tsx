'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Share2, Check } from 'lucide-react';

interface ProfileFooterProps {
  totalViews?: number;
}

export function ProfileFooter({}: ProfileFooterProps) {
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
    <footer className="flex flex-col items-center gap-5 px-6 pb-10 pt-6">
      <Separator className="bg-toss-grey-200" />

      {/* 공유하기 버튼 (방문자 수는 전면에 노출하지 않음) */}
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-full border-toss-blue-500/20 bg-toss-blue-50 px-4 py-2 text-xs font-semibold text-toss-blue-500 shadow-2xs hover:bg-toss-blue-500 hover:text-white transition-all"
          onClick={handleShare}
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              링크가 복사되었어요!
            </>
          ) : (
            <>
              <Share2 className="size-3.5" />
              프로필 공유하기
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
