'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
  AlertCircle,
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

function isValidUrl(val: string): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  // 공백이 포함된 일반 문장은 URL이 아님
  if (trimmed.includes(' ') || trimmed.includes('\t') || trimmed.includes('\n')) return false;

  // mailto 링크 지원
  if (/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(trimmed)) return true;

  // 프로토콜이 생략된 경우 https:// 추가하여 검사
  const toTest = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(toTest);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    const hostname = parsed.hostname;
    if (!hostname) return false;

    // 로컬호스트 및 IPv4 허용
    if (hostname === 'localhost' || /^127\.\d+\.\d+\.\d+$/.test(hostname)) return true;

    // 도메인은 최소 1개의 점(.)과 2글자 이상의 영문 TLD를 포함해야 함 (예: google.com, velog.io, toss.co.kr)
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return domainRegex.test(hostname);
  } catch {
    return false;
  }
}

// ==========================================
// Zod 검증 스키마 정의
// ==========================================
const addLinkSchema = z
  .object({
    type: z.enum(['link', 'youtube', 'music']),
    title: z
      .string()
      .trim()
      .min(1, '링크 제목을 입력해주세요.')
      .max(50, '링크 제목은 최대 50자까지 입력할 수 있어요.'),
    url: z
      .string()
      .trim()
      .min(1, '링크 URL을 입력해주세요.')
      .refine(isValidUrl, {
        message: '올바른 링크 주소(예: https://example.com 또는 naver.com)를 입력해주세요.',
      }),
    embedUrl: z.string().trim().optional(),
    icon: z.string(),
    isActive: z.boolean(),
  })
  .superRefine((data, ctx) => {
    // YouTube 타입일 때 유튜브 도메인 형식 안내
    if (data.type === 'youtube' && data.url && isValidUrl(data.url)) {
      const isYt = /youtube\.com|youtu\.be/i.test(data.url);
      if (!isYt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '유효한 YouTube 링크 주소(youtube.com 또는 youtu.be)를 입력해주세요.',
          path: ['url'],
        });
      }
    }
  });

type AddLinkFormValues = z.infer<typeof addLinkSchema>;

export function AddLinkDialog({ open, onOpenChange, trigger }: AddLinkDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = (value: boolean) => {
    if (!value) {
      reset();
    }
    if (isControlled) {
      onOpenChange?.(value);
    } else {
      setInternalOpen(value);
    }
  };

  const { addLink } = useMyLinkStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddLinkFormValues>({
    resolver: zodResolver(addLinkSchema),
    defaultValues: {
      type: 'link',
      title: '',
      url: '',
      embedUrl: '',
      icon: 'Globe',
      isActive: true,
    },
    mode: 'onChange',
  });

  const currentType = watch('type');
  const currentUrl = watch('url');
  const selectedIcon = watch('icon');
  const currentEmbedUrl = watch('embedUrl');

  const urlRegister = register('url');

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    urlRegister.onChange(e);
    const val = e.target.value;

    // 자동 임베드 주소 추출
    if (currentType === 'youtube') {
      const yt = extractYoutubeEmbed(val);
      if (yt) setValue('embedUrl', yt, { shouldValidate: true });
    } else if (currentType === 'music') {
      const sp = extractSpotifyEmbed(val);
      if (sp) setValue('embedUrl', sp, { shouldValidate: true });
    }
  };

  const handleTypeChange = (newType: LinkType) => {
    setValue('type', newType, { shouldValidate: true });

    if (newType === 'youtube') {
      setValue('icon', 'Youtube');
      if (currentUrl) {
        const yt = extractYoutubeEmbed(currentUrl);
        if (yt) setValue('embedUrl', yt);
      }
    } else if (newType === 'music') {
      setValue('icon', 'Music');
      if (currentUrl) {
        const sp = extractSpotifyEmbed(currentUrl);
        if (sp) setValue('embedUrl', sp);
      }
    } else {
      setValue('icon', 'Globe');
      setValue('embedUrl', '');
    }
  };

  const onSubmit = (data: AddLinkFormValues) => {
    let finalUrl = data.url.trim();
    if (!/^https?:\/\//i.test(finalUrl) && !/^mailto:/i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    let finalEmbedUrl = data.embedUrl?.trim() || undefined;
    if (data.type === 'youtube' && !finalEmbedUrl) {
      const extracted = extractYoutubeEmbed(finalUrl);
      if (extracted) finalEmbedUrl = extracted;
    } else if (data.type === 'music' && !finalEmbedUrl) {
      const extracted = extractSpotifyEmbed(finalUrl);
      if (extracted) finalEmbedUrl = extracted;
    }

    addLink({
      type: data.type,
      title: data.title.trim(),
      url: finalUrl,
      embedUrl: finalEmbedUrl,
      icon: data.icon,
      isActive: data.isActive,
    });

    reset();
    setOpen(false);
  };

  const handleClose = () => {
    reset();
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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5 pt-1">
          {/* 링크 유형 선택 */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium text-toss-grey-700">링크 유형</Label>
            <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-toss-grey-100 p-1">
              <button
                type="button"
                onClick={() => handleTypeChange('link')}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                  currentType === 'link'
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
                  currentType === 'youtube'
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
                  currentType === 'music'
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
                currentType === 'youtube'
                  ? '예) YouTube'
                  : currentType === 'music'
                  ? '예) Spotify'
                  : '예) GitHub, Blog, Website 등'
              }
              {...register('title')}
              className={`h-11 rounded-xl transition-colors ${
                errors.title
                  ? 'border-toss-red-500 focus-visible:border-toss-red-500 focus-visible:ring-toss-red-500/20'
                  : ''
              }`}
            />
            {errors.title && (
              <div className="flex items-center gap-1 text-xs font-medium text-toss-red-500">
                <AlertCircle className="size-3" />
                <span>{errors.title.message}</span>
              </div>
            )}
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
                currentType === 'youtube'
                  ? 'https://www.youtube.com/watch?v=...'
                  : currentType === 'music'
                  ? 'https://open.spotify.com/playlist/...'
                  : 'https://example.com'
              }
              {...urlRegister}
              onChange={handleUrlChange}
              className={`h-11 rounded-xl transition-colors ${
                errors.url
                  ? 'border-toss-red-500 focus-visible:border-toss-red-500 focus-visible:ring-toss-red-500/20'
                  : ''
              }`}
            />
            {errors.url && (
              <div className="flex items-center gap-1 text-xs font-medium text-toss-red-500">
                <AlertCircle className="size-3" />
                <span>{errors.url.message}</span>
              </div>
            )}
          </div>

          {/* 미디어 임베드 URL (유튜브 or 음악 선택 시) */}
          {(currentType === 'youtube' || currentType === 'music') && (
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
                  currentType === 'youtube'
                    ? 'https://www.youtube.com/embed/...'
                    : 'https://open.spotify.com/embed/playlist/...'
                }
                value={currentEmbedUrl || ''}
                {...register('embedUrl')}
                className="h-10 bg-white text-xs"
              />
              <p className="text-[11px] text-toss-grey-400">
                {currentType === 'youtube'
                  ? 'YouTube 영상 링크 입력 시 자동으로 플레이어가 연동돼요.'
                  : '스포티파이 등의 임베드 플레이어 링크를 지원해요.'}
              </p>
            </div>
          )}

          {/* 일반 링크 시 아이콘 선택 */}
          {currentType === 'link' && (
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
                      onClick={() => setValue('icon', item.id)}
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
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>

          <DialogFooter className="mt-2 gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="h-11 flex-1 rounded-xl border-toss-grey-200 font-medium text-toss-grey-700 hover:bg-toss-grey-100"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 flex-1 rounded-xl bg-toss-blue-500 font-semibold text-white hover:bg-toss-blue-600 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              링크 추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
