'use client';

import React, { useEffect, useState } from 'react';
import { useMyLinkStore } from '@/store/useMyLinkStore';
import { ProfileHeader } from './ProfileHeader';
import { LinkCard } from './LinkCard';
import { ProfileFooter } from './ProfileFooter';

export const PublicProfileView: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { profile, links, theme, analytics, recordView, recordClick } = useMyLinkStore();

  useEffect(() => {
    setMounted(true);
    recordView();
  }, [recordView]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-toss-grey-50">
        <div className="w-8 h-8 rounded-full border-2 border-toss-blue-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Active links sorted by order
  const activeLinks = links
    .filter((link) => link.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen w-full bg-[#F2F4F6] flex items-center justify-center sm:py-6">
      {/* 모바일 390~430pt 목업 컨테이너 */}
      <main className="w-full max-w-md min-h-screen sm:min-h-[844px] sm:max-h-[920px] sm:rounded-[36px] bg-toss-grey-50 border border-toss-grey-200 shadow-xl flex flex-col justify-between overflow-y-auto relative transition-all">
        
        {/* 상단 프로필 영역 */}
        <div>
          <ProfileHeader profile={profile} />

          {/* 링크 목록 영역 */}
          <section className="px-4 space-y-3 pt-2 pb-6">
            {activeLinks.length > 0 ? (
              activeLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  theme={theme}
                  onLinkClick={recordClick}
                />
              ))
            ) : (
              <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-toss-grey-200 space-y-2">
                <p className="text-sm font-semibold text-toss-grey-700">
                  아직 등록되거나 활성화된 링크가 없어요 🥺
                </p>
                <p className="text-xs text-toss-grey-400">
                  대시보드에서 새로운 링크를 추가해주세요!
                </p>
              </div>
            )}
          </section>
        </div>

        {/* 하단 푸터 영역 */}
        <ProfileFooter totalViews={analytics.totalViews} />
      </main>
    </div>
  );
};
