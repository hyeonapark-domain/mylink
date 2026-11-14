import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { LinkItem } from '@/types';
import { initialLinks } from '@/data/mockData';

const LINKS_COLLECTION = 'links';

function parseTimestamp(val: unknown): { iso: string; millis: number } {
  if (!val) {
    const now = Date.now();
    return { iso: new Date(now).toISOString(), millis: now };
  }
  if (typeof val === 'object' && val !== null) {
    if ('toDate' in val && typeof (val as { toDate?: () => Date }).toDate === 'function') {
      const d = (val as { toDate: () => Date }).toDate();
      return { iso: d.toISOString(), millis: d.getTime() };
    }
    if ('seconds' in val && typeof (val as { seconds?: number }).seconds === 'number') {
      const millis = (val as { seconds: number }).seconds * 1000;
      return { iso: new Date(millis).toISOString(), millis };
    }
  }
  const parsed = new Date(val as string | number).getTime();
  if (!isNaN(parsed)) {
    return { iso: new Date(parsed).toISOString(), millis: parsed };
  }
  const now = Date.now();
  return { iso: new Date(now).toISOString(), millis: now };
}

/**
 * Firestore의 links 컬렉션에 링크를 추가/덮어씁니다.
 * createAt 및 createdAt 필드를 서버 타임스탬프로 저장합니다.
 */
export async function addLinkToFirestore(link: LinkItem): Promise<void> {
  const linkRef = doc(db, LINKS_COLLECTION, link.id);
  const now = serverTimestamp();
  const dataToSave: Record<string, unknown> = {
    id: link.id,
    type: link.type,
    title: link.title,
    url: link.url,
    icon: link.icon || 'Globe',
    isActive: Boolean(link.isActive),
    order: typeof link.order === 'number' ? link.order : 0,
    clickCount: typeof link.clickCount === 'number' ? link.clickCount : 0,
    createAt: now,
    createdAt: now,
  };

  if (link.embedUrl) {
    dataToSave.embedUrl = link.embedUrl;
  }

  await setDoc(linkRef, dataToSave);
}

/**
 * Firestore의 links 컬렉션에서 모든 링크를 가져와 createAt(또는 createdAt) 기준 최신순(내림차순)으로 정렬하여 반환합니다.
 * 만약 Firestore가 비어있다면 initialLinks를 초기 등록(seed)하고 최신순으로 반환합니다.
 */
export async function getLinksFromFirestore(): Promise<LinkItem[] | null> {
  try {
    const snapshot = await getDocs(collection(db, LINKS_COLLECTION));

    if (snapshot.empty) {
      return [];
    }

    const items = snapshot.docs.map((d) => {
      const data = d.data();
      const rawTime = data.createAt ?? data.createdAt;
      const { iso, millis } = parseTimestamp(rawTime);

      return {
        item: {
          id: d.id,
          type: data.type || 'link',
          title: data.title || '',
          url: data.url || '',
          embedUrl: data.embedUrl || undefined,
          icon: data.icon || 'Globe',
          isActive: data.isActive !== false,
          order: data.order ?? 0,
          clickCount: data.clickCount ?? 0,
          createAt: iso,
          createdAt: iso,
        } as LinkItem,
        timeMillis: millis,
      };
    });

    // createAt / createdAt 기준 최신순(내림차순) 정렬
    items.sort((a, b) => b.timeMillis - a.timeMillis);

    return items.map((wrapper) => wrapper.item);
  } catch (error) {
    console.warn('[Firestore] getLinksFromFirestore failed:', error);
    return null;
  }
}

/**
 * Firestore의 links 컬렉션에서 특정 링크를 삭제합니다.
 */
export async function deleteLinkFromFirestore(id: string): Promise<void> {
  await deleteDoc(doc(db, LINKS_COLLECTION, id));
}

/**
 * Firestore의 links 컬렉션에서 특정 링크를 업데이트합니다.
 */
export async function updateLinkInFirestore(
  id: string,
  fields: Partial<LinkItem>
): Promise<void> {
  const linkRef = doc(db, LINKS_COLLECTION, id);
  await setDoc(linkRef, fields, { merge: true });
}
