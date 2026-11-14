import { create } from 'zustand';
import { Profile, LinkItem, ThemeConfig, AnalyticsData } from '@/types';
import { initialProfile, initialLinks, initialTheme, initialAnalytics } from '@/data/mockData';
import { addLinkToFirestore, getLinksFromFirestore } from '@/lib/firestore';

export interface MyLinkState {
  profile: Profile;
  links: LinkItem[];
  theme: ThemeConfig;
  analytics: AnalyticsData;
  isLoadingLinks: boolean;

  fetchLinks: () => Promise<void>;
  setLinks: (links: LinkItem[]) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  addLink: (link: Omit<LinkItem, 'id' | 'clickCount' | 'order'>) => Promise<void>;
  updateLink: (id: string, link: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (links: LinkItem[]) => void;
  toggleLinkActive: (id: string) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  recordView: () => void;
  recordClick: (linkId: string) => void;
  resetToDefault: () => void;
}

export const useMyLinkStore = create<MyLinkState>()((set) => ({
  profile: initialProfile,
  links: initialLinks,
  theme: initialTheme,
  analytics: initialAnalytics,
  isLoadingLinks: false,

  fetchLinks: async () => {
    set({ isLoadingLinks: true });
    try {
      const fetched = await getLinksFromFirestore();
      if (fetched && fetched.length > 0) {
        set({ links: fetched });
      }
    } catch (err) {
      console.warn('[Firestore] 링크 불러오기 실패:', err);
    } finally {
      set({ isLoadingLinks: false });
    }
  },

  setLinks: (links) => set(() => ({ links })),

  updateProfile: (updatedProfile) =>
    set((state) => ({
      profile: { ...state.profile, ...updatedProfile },
    })),

  addLink: async (newLink) => {
    const id = `link-${Date.now()}`;
    const nowIso = new Date().toISOString();
    const linkItem: LinkItem = {
      ...newLink,
      id,
      clickCount: 0,
      order: 0,
      createAt: nowIso,
      createdAt: nowIso,
    };

    // 1) 로컬 상태를 즉시 업데이트 (최신순이므로 맨 앞에 추가)
    useMyLinkStore.setState((state) => ({
      links: [linkItem, ...state.links],
    }));

    // 2) Firestore에 비동기 저장 및 최신 목록 재동기화
    try {
      await addLinkToFirestore(linkItem);
      const refreshedLinks = await getLinksFromFirestore();
      if (refreshedLinks && refreshedLinks.length > 0) {
        useMyLinkStore.setState({ links: refreshedLinks });
      }
    } catch (err) {
      console.warn('[Firestore] 링크 저장 및 갱신 실패:', err);
    }
  },

  updateLink: (id, updatedFields) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, ...updatedFields } : link
      ),
    })),

  deleteLink: (id) =>
    set((state) => ({
      links: state.links.filter((link) => link.id !== id),
    })),

  reorderLinks: (newLinks) =>
    set(() => ({
      links: newLinks.map((link, idx) => ({ ...link, order: idx })),
    })),

  toggleLinkActive: (id) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === id ? { ...link, isActive: !link.isActive } : link
      ),
    })),

  updateTheme: (updatedTheme) =>
    set((state) => ({
      theme: { ...state.theme, ...updatedTheme },
    })),

  recordView: () =>
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      const dailyStats = [...state.analytics.dailyStats];
      const todayStatIndex = dailyStats.findIndex((s) => s.date === today);

      if (todayStatIndex >= 0) {
        dailyStats[todayStatIndex] = {
          ...dailyStats[todayStatIndex],
          views: dailyStats[todayStatIndex].views + 1,
        };
      } else {
        dailyStats.push({ date: today, views: 1, clicks: 0 });
      }

      return {
        analytics: {
          totalViews: state.analytics.totalViews + 1,
          dailyStats,
        },
      };
    }),

  recordClick: (linkId) =>
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      const dailyStats = [...state.analytics.dailyStats];
      const todayStatIndex = dailyStats.findIndex((s) => s.date === today);

      if (todayStatIndex >= 0) {
        dailyStats[todayStatIndex] = {
          ...dailyStats[todayStatIndex],
          clicks: dailyStats[todayStatIndex].clicks + 1,
        };
      } else {
        dailyStats.push({ date: today, views: 0, clicks: 1 });
      }

      const updatedLinks = state.links.map((link) =>
        link.id === linkId ? { ...link, clickCount: link.clickCount + 1 } : link
      );

      return {
        links: updatedLinks,
        analytics: {
          ...state.analytics,
          dailyStats,
        },
      };
    }),

  resetToDefault: () =>
    set(() => ({
      profile: initialProfile,
      links: initialLinks,
      theme: initialTheme,
      analytics: initialAnalytics,
    })),
}));

