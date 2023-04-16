import { productCategoriesType } from '@/types/productsTypes';
import { atom } from 'recoil';

export const categoriesState = atom<productCategoriesType>({
  key: 'categoriesState',
  default: [],
});
