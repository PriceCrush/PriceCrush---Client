import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ProductFromApi } from '@/types/productsTypes';

const isClient = typeof window !== 'undefined';
const storage = isClient ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'productFromServer',
  storage,
});

export const productFromServerState = atom<ProductFromApi[]>({
  key: 'productFromServerState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
