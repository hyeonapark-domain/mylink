'use client';

import React from 'react';
import Image from 'next/image';
import { Profile, SocialLink } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Instagram, Youtube, Github, Twitter, Mail } from 'lucide-react';

interface ProfileHeaderProps {
  profile: Profile;
}

const SOCIAL_ICON_MAP: Record<
  SocialLink['platform'],
  { icon: React.ReactNode; label: string }
> = {
  instagram: {
    icon: <Instagram className="size-4" />,
    label: '인스타그램',
  },
  youtube: {
    icon: <Youtube className="size-4" />,
    label: '유튜브',
  },
  github: {
    icon: <Github className="size-4" />,
    label: '깃허브',
  },
  twitter: {
    icon: <Twitter className="size-4" />,
    label: '트위터',
  },
  email: {
    icon: <Mail className="size-4" />,
    label: '이메일',
  },
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-4 px-6 pt-10 pb-6 text-center">
      {/* 아바타 — 96×96, TDS radius-l(14px) */}
      <Avatar className="size-24 rounded-[14px] ring-4 ring-white shadow-sm">
        <AvatarImage
          src={profile.avatarUrl}
          alt={profile.name}
          className="object-cover"
          asChild
        >
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            sizes="96px"
            priority
            unoptimized
          />
        </AvatarImage>
        <AvatarFallback className="rounded-[14px] bg-toss-grey-100 text-toss-grey-700 text-lg font-bold">
          {profile.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      {/* 이름 + 아이디 */}
      <div className="flex flex-col items-center gap-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-toss-grey-900">
          {profile.name}
        </h1>
        {profile.username && (
          <p className="text-xs font-medium text-toss-grey-400">
            @{profile.username}
          </p>
        )}
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="max-w-xs text-[15px] leading-relaxed text-toss-grey-700">
          {profile.bio}
        </p>
      )}

      {/* 소셜 아이콘 스택 */}
      {profile.socialLinks.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {profile.socialLinks.map((social) => {
            const meta = SOCIAL_ICON_MAP[social.platform];
            return (
              <Button
                key={social.platform}
                variant="outline"
                size="icon"
                className="size-9 rounded-full border-toss-grey-200 bg-white text-toss-grey-700 shadow-xs hover:scale-105 hover:border-toss-blue-500 hover:text-toss-blue-500 transition-all"
                asChild
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={meta?.label ?? social.platform}
                >
                  {meta?.icon}
                </a>
              </Button>
            );
          })}
        </div>
      )}
    </header>
  );
}
