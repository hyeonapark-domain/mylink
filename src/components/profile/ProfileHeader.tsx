'use client';

import React from 'react';
import { Profile, SocialLink } from '@/types';
import { Avatar } from '@/components/ui/avatar';
import { Instagram, Youtube, Github, Twitter, Mail, Link as LinkIcon } from 'lucide-react';

interface ProfileHeaderProps {
  profile: Profile;
  textColor?: string;
}

const getSocialIcon = (platform: SocialLink['platform']) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className="w-5 h-5 text-pink-600" />;
    case 'youtube':
      return <Youtube className="w-5 h-5 text-red-600" />;
    case 'github':
      return <Github className="w-5 h-5 text-gray-800" />;
    case 'twitter':
      return <Twitter className="w-5 h-5 text-sky-500" />;
    case 'email':
      return <Mail className="w-5 h-5 text-blue-500" />;
    default:
      return <LinkIcon className="w-5 h-5 text-gray-600" />;
  }
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, textColor }) => {
  return (
    <header className="flex flex-col items-center text-center pt-8 pb-6 px-4 space-y-4">
      {/* shadcn/ui Avatar 컴포넌트 사용 */}
      <Avatar
        src={profile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
        alt={profile.name}
        fallback={profile.name ? profile.name.slice(0, 1) : '박'}
      />

      {/* 사용자 이름 및 아이디 */}
      <div className="space-y-1">
        <h1
          className="text-[24px] font-bold tracking-tight text-toss-grey-900"
          style={{ color: textColor }}
        >
          {profile.name}
        </h1>
        {profile.username && (
          <p className="text-xs text-toss-grey-400 font-medium">@{profile.username}</p>
        )}
      </div>

      {/* 자기소개 (Bio) */}
      {profile.bio && (
        <p
          className="text-[15px] leading-relaxed text-toss-grey-700 max-w-xs font-normal"
          style={{ color: textColor ? `${textColor}CC` : undefined }}
        >
          {profile.bio}
        </p>
      )}

      {/* 소셜 미디어 아이콘 스택 */}
      {profile.socialLinks && profile.socialLinks.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2.5 pt-1">
          {profile.socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white border border-toss-grey-200 hover:bg-toss-grey-100 hover:scale-105 transition-all shadow-2xs"
              aria-label={social.platform}
            >
              {getSocialIcon(social.platform)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
