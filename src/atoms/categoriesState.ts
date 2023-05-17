import { productCategoriesType } from '@/types/productsTypes';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'product-categories',
});

export const categoriesState = atom<productCategoriesType>({
  key: 'categoriesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
