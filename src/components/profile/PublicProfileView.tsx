'use client';

import React, { useEffect, useState } from 'react';
import { useMyLinkStore } from '@/store/useMyLinkStore';
import { ProfileHeader } from './ProfileHeader';
import { LinkCard } from './LinkCard';
import { ProfileFooter } from './ProfileFooter';

export function PublicProfileView() {
  const [mounted, setMounted] = useState(false);
  const { profile, links, theme, analytics, recordView, recordClick } =
    useMyLinkStore();

  useEffect(() => {
    setMounted(true);
    recordView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* SSR hydration 방지 — 로딩 스켈레톤 */
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-toss-grey-100">
        <div className="size-8 animate-spin rounded-full border-2 border-toss-blue-500 border-t-transparent" />
      </div>
    );
  }

  const activeLinks = [...links]
    .filter((l) => l.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    /* 전체 배경 — 데스크톱에서 중앙 배치 */
    <div className="min-h-screen w-full bg-toss-grey-100 sm:flex sm:items-center sm:justify-center sm:py-8">
      {/* 모바일 목업 컨테이너 — max-w-md, 모바일에서 전체 화면 */}
      <main className="flex w-full max-w-md flex-col overflow-y-auto bg-toss-grey-50 sm:min-h-[844px] sm:rounded-[36px] sm:border sm:border-toss-grey-200 sm:shadow-2xl">
        {/* 프로필 헤더 */}
        <ProfileHeader profile={profile} />

        {/* 링크 목록 */}
        <section className="flex flex-col gap-3 px-5 pb-4">
          {activeLinks.length > 0 ? (
            activeLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                buttonStyle={theme.buttonStyle}
                onLinkClick={recordClick}
              />
            ))
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-toss-grey-200 bg-white px-6 py-12 text-center">
              <p className="text-sm font-semibold text-toss-grey-700">
                아직 활성화된 링크가 없어요 🥺
              </p>
              <p className="text-xs text-toss-grey-400">
                대시보드에서 새로운 링크를 추가해주세요!
              </p>
            </div>
          )}
        </section>

        {/* 푸터 */}
        <div className="mt-auto">
          <ProfileFooter totalViews={analytics.totalViews} />
        </div>
      </main>
    </div>
  );
}
