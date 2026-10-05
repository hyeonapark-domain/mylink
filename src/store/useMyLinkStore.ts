import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Profile, LinkItem, ThemeConfig, AnalyticsData } from '@/types';
import { initialProfile, initialLinks, initialTheme, initialAnalytics } from '@/data/mockData';

export interface MyLinkState {
  profile: Profile;
  links: LinkItem[];
  theme: ThemeConfig;
  analytics: AnalyticsData;

  updateProfile: (profile: Partial<Profile>) => void;
  addLink: (link: Omit<LinkItem, 'id' | 'clickCount' | 'order'>) => void;
  updateLink: (id: string, link: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (links: LinkItem[]) => void;
  toggleLinkActive: (id: string) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  recordView: () => void;
  recordClick: (linkId: string) => void;
  resetToDefault: () => void;
}

export const useMyLinkStore = create<MyLinkState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      links: initialLinks,
      theme: initialTheme,
      analytics: initialAnalytics,

      updateProfile: (updatedProfile) =>
        set((state) => ({
          profile: { ...state.profile, ...updatedProfile },
        })),

      addLink: (newLink) =>
        set((state) => {
          const id = `link-${Date.now()}`;
          const order = state.links.length;
          const linkItem: LinkItem = {
            ...newLink,
            id,
            clickCount: 0,
            order,
          };
          return { links: [...state.links, linkItem] };
        }),

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
    }),
    {
      name: 'my-link-storage',
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persistedState: any) => {
        if (!persistedState) return persistedState;
        const titleMap: Record<string, { title: string; icon?: string }> = {
          'link-1': { title: 'YouTube', icon: 'Youtube' },
          'link-2': { title: 'GitHub', icon: 'Github' },
          'link-3': { title: 'Spotify', icon: 'Music' },
          'link-4': { title: 'Blog', icon: 'BookOpen' },
          'link-5': { title: 'Buy Me a Coffee', icon: 'Coffee' },
          'link-6': { title: 'Store', icon: 'ShoppingBag' },
          'link-7': { title: 'Email', icon: 'Mail' },
        };
        const updatedLinks = (persistedState.links || []).map((l: any) => {
          if (titleMap[l.id]) {
            return {
              ...l,
              title: titleMap[l.id].title,
              icon: titleMap[l.id].icon ?? l.icon,
            };
          }
          return l;
        });
        return {
          ...persistedState,
          links: updatedLinks,
        };
      },
    }
  )
);
