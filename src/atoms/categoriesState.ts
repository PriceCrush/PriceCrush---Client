import { productCategoriesType } from '@/types/productTypes';
import { atom } from 'recoil';

export const categoriesState = atom<productCategoriesType>({
  key: 'categoriesState',
  default: [],
});
