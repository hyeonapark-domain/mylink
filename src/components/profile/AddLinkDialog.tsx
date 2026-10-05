'use client';

import React, { useState } from 'react';
import { useMyLinkStore } from '@/store/useMyLinkStore';
import { LinkType } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Globe,
  Youtube,
  Music,
  Coffee,
  BookOpen,
  ShoppingBag,
  Mail,
  Github,
  Briefcase,
  MessageSquare,
  Calendar,
  Plus,
  Sparkles,
} from 'lucide-react';

interface AddLinkDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const AVAILABLE_ICONS = [
  { id: 'Globe', label: '웹사이트', icon: Globe },
  { id: 'Github', label: '깃허브', icon: Github },
  { id: 'BookOpen', label: '블로그', icon: BookOpen },
  { id: 'Briefcase', label: '경력/포폴', icon: Briefcase },
  { id: 'Coffee', label: '커피/후원', icon: Coffee },
  { id: 'ShoppingBag', label: '스토어', icon: ShoppingBag },
  { id: 'Mail', label: '이메일', icon: Mail },
  { id: 'MessageSquare', label: '메시지', icon: MessageSquare },
  { id: 'Calendar', label: '일정/예약', icon: Calendar },
];

function extractYoutubeEmbed(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      if (parsed.pathname.startsWith('/shorts/')) {
        const id = parsed.pathname.split('/shorts/')[1]?.split('/')[0];
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (parsed.pathname.startsWith('/embed/')) {
        return url;
      }
    } else if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('?')[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

function extractSpotifyEmbed(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('spotify.com')) {
      if (!parsed.pathname.startsWith('/embed/')) {
        return `https://open.spotify.com/embed${parsed.pathname}`;
      }
      return url;
    }
  } catch {
    return null;
  }
  return null;
}

export function AddLinkDialog({ open, onOpenChange, trigger }: AddLinkDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = (value: boolean) => {
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  const { addLink } = useMyLinkStore();

  const [type, setType] = useState<LinkType>('link');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Globe');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setType('link');
    setTitle('');
    setUrl('');
    setEmbedUrl('');
    setSelectedIcon('Globe');
    setIsActive(true);
    setError(null);
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setError(null);

    // 자동 임베드 주소 추출
    if (type === 'youtube') {
      const yt = extractYoutubeEmbed(value);
      if (yt) setEmbedUrl(yt);
    } else if (type === 'music') {
      const sp = extractSpotifyEmbed(value);
      if (sp) setEmbedUrl(sp);
    }
  };

  const handleTypeChange = (newType: LinkType) => {
    setType(newType);
    setError(null);

    if (newType === 'youtube') {
      setSelectedIcon('Youtube');
      if (url) {
        const yt = extractYoutubeEmbed(url);
        if (yt) setEmbedUrl(yt);
      }
    } else if (newType === 'music') {
      setSelectedIcon('Music');
      if (url) {
        const sp = extractSpotifyEmbed(url);
        if (sp) setEmbedUrl(sp);
      }
    } else {
      setSelectedIcon('Globe');
      setEmbedUrl('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('링크 제목을 입력해주세요.');
      return;
    }

    let finalUrl = url.trim();
    if (!finalUrl) {
      setError('링크 URL을 입력해주세요.');
      return;
    }

    // http 또는 https 프로토콜 자동 보정
    if (!/^https?:\/\//i.test(finalUrl) && !/^mailto:/i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    let finalEmbedUrl = embedUrl.trim() || undefined;
    if (type === 'youtube' && !finalEmbedUrl) {
      const extracted = extractYoutubeEmbed(finalUrl);
      if (extracted) finalEmbedUrl = extracted;
    } else if (type === 'music' && !finalEmbedUrl) {
      const extracted = extractSpotifyEmbed(finalUrl);
      if (extracted) finalEmbedUrl = extracted;
    }

    addLink({
      type,
      title: title.trim(),
      url: finalUrl,
      embedUrl: finalEmbedUrl,
      icon: selectedIcon,
      isActive,
    });

    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="h-12 w-full gap-2 rounded-[16px] bg-toss-blue-500 font-semibold text-white shadow-sm hover:bg-toss-blue-600 active:scale-[0.99] transition-all">
            <Plus className="size-4" />
            새 링크 추가하기
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="max-w-md sm:rounded-[24px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-toss-blue-50 text-toss-blue-500">
              <Sparkles className="size-4" />
            </div>
            <DialogTitle className="text-xl font-bold text-toss-grey-900">
              새 링크 추가하기
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-toss-grey-700">
            프로필에 노출할 링크 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4.5 pt-1">
          {/* 에러 메시지 */}
          {error && (
            <div className="rounded-xl bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-toss-red-500">
              {error}
            </div>
          )}

          {/* 링크 유형 선택 */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium text-toss-grey-700">링크 유형</Label>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-toss-grey-100 p-1">
              <button
                type="button"
                onClick={() => handleTypeChange('link')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                  type === 'link'
                    ? 'bg-white text-toss-grey-900 shadow-xs'
                    : 'text-toss-grey-700 hover:text-toss-grey-900'
                }`}
              >
                <Globe className="size-3.5 text-toss-grey-700" />
                일반 링크
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('youtube')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                  type === 'youtube'
                    ? 'bg-white text-toss-grey-900 shadow-xs'
                    : 'text-toss-grey-700 hover:text-toss-grey-900'
                }`}
              >
                <Youtube className="size-3.5 text-red-500" />
                유튜브
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('music')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                  type === 'music'
                    ? 'bg-white text-toss-grey-900 shadow-xs'
                    : 'text-toss-grey-700 hover:text-toss-grey-900'
                }`}
              >
                <Music className="size-3.5 text-green-500" />
                음악
              </button>
            </div>
          </div>

          {/* 링크 제목 입력 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="link-title" className="text-xs font-medium text-toss-grey-700">
              링크 제목 <span className="text-toss-red-500">*</span>
            </Label>
            <Input
              id="link-title"
              placeholder={
                type === 'youtube'
                  ? '예) YouTube'
                  : type === 'music'
                  ? '예) Spotify'
                  : '예) GitHub, Blog, Website 등'
              }
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(null);
              }}
              className="h-11 rounded-xl"
            />
          </div>

          {/* 링크 URL 입력 */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="link-url" className="text-xs font-medium text-toss-grey-700">
              링크 URL <span className="text-toss-red-500">*</span>
            </Label>
            <Input
              id="link-url"
              type="text"
              placeholder={
                type === 'youtube'
                  ? 'https://www.youtube.com/watch?v=...'
                  : type === 'music'
                  ? 'https://open.spotify.com/playlist/...'
                  : 'https://example.com'
              }
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          {/* 미디어 임베드 URL (유튜브 or 음악 선택 시) */}
          {(type === 'youtube' || type === 'music') && (
            <div className="flex flex-col gap-1.5 rounded-xl border border-toss-grey-200 bg-toss-grey-50 p-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="link-embed" className="text-xs font-medium text-toss-grey-700">
                  미디어 임베드 URL (선택)
                </Label>
                <span className="text-[11px] text-toss-blue-500 font-medium">자동 생성 지원</span>
              </div>
              <Input
                id="link-embed"
                placeholder={
                  type === 'youtube'
                    ? 'https://www.youtube.com/embed/...'
                    : 'https://open.spotify.com/embed/playlist/...'
                }
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                className="h-10 bg-white text-xs"
              />
              <p className="text-[11px] text-toss-grey-400">
                {type === 'youtube'
                  ? '유튜브 주소를 입력하면 자동으로 임베드 플레이어가 연동돼요.'
                  : '스포티파이 등의 임베드 플레이어 링크를 지원해요.'}
              </p>
            </div>
          )}

          {/* 일반 링크 시 아이콘 선택 */}
          {type === 'link' && (
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-medium text-toss-grey-700">아이콘 선택</Label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_ICONS.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedIcon.toLowerCase() === item.id.toLowerCase();
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedIcon(item.id)}
                      className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-all ${
                        isSelected
                          ? 'border-toss-blue-500 bg-toss-blue-50 font-semibold text-toss-blue-500 ring-1 ring-toss-blue-500'
                          : 'border-toss-grey-200 bg-white text-toss-grey-700 hover:border-toss-grey-400'
                      }`}
                    >
                      <IconComp className="size-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 즉시 활성화 토글 Switch */}
          <div className="flex items-center justify-between rounded-xl border border-toss-grey-200 bg-white p-3">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-toss-grey-900">프로필에 바로 공개하기</span>
              <span className="text-[11px] text-toss-grey-400">
                켜두면 프로필 목록에 즉시 노출돼요.
              </span>
            </div>
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>

          <DialogFooter className="mt-2 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
              className="h-11 flex-1 rounded-xl border-toss-grey-200 font-medium text-toss-grey-700 hover:bg-toss-grey-100"
            >
              취소
            </Button>
            <Button
              type="submit"
              className="h-11 flex-1 rounded-xl bg-toss-blue-500 font-semibold text-white hover:bg-toss-blue-600 active:scale-[0.98] transition-all"
            >
              링크 추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
