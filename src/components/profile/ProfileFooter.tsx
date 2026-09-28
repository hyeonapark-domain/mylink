'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Check, Eye } from 'lucide-react';

interface ProfileFooterProps {
  totalViews: number;
}

export const ProfileFooter: React.FC<ProfileFooterProps> = ({ totalViews }) => {
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
      // ignore copy error
    }
  };

  return (
    <footer className="w-full pt-8 pb-12 flex flex-col items-center justify-center space-y-4">
      {/* 하단 유틸리티 스택: 방문자 수 카운트 & 공유하기 */}
      <div className="flex items-center space-x-3">
        <Badge variant="outline" className="px-3 py-1.5 rounded-full bg-white text-toss-grey-700 space-x-1.5 shadow-2xs">
          <Eye className="w-3.5 h-3.5 text-toss-blue-500" />
          <span>총 방문자 {totalViews.toLocaleString()}회</span>
        </Badge>

        <Button
          size="sm"
          variant="secondary"
          onClick={handleShare}
          className="rounded-full bg-toss-blue-50 text-toss-blue-500 border border-toss-blue-500/20 hover:bg-toss-blue-500 hover:text-white space-x-1.5 shadow-2xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>복사됨!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>공유하기</span>
            </>
          )}
        </Button>
      </div>

      {/* 브랜드 카피 및 디자이너 크레딧 */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center space-x-1.5 text-xs text-toss-grey-400">
          <span>Powered by</span>
          <span className="font-bold text-toss-blue-500">마이링크 (My Link)</span>
        </div>
        <p className="text-[11px] text-toss-grey-400">
          Toss Design System (TDS) based single profile
        </p>
      </div>
    </footer>
  );
};
