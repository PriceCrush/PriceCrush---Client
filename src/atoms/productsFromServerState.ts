import { atom, selectorFamily } from 'recoil';
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

interface FilteredProductsByCategoryStateProps {
  result: ProductFromApi[];
  totalItems: number;
  currentPage: number;
  lastPage: number;
}

export const filteredProductsByCategoryState = selectorFamily<
  FilteredProductsByCategoryStateProps,
  {
    categoryId: string;
    currentIndex: number;
    itemsPerPage: number;
  }
>({
  key: 'filteredProductsByCategoryState',
  get:
    ({ categoryId, currentIndex, itemsPerPage }) =>
    ({ get }) => {
      const startIndex = (currentIndex - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const products = get(productFromServerState);
      if (categoryId === 'all') {
        return {
          result: products.slice(startIndex, endIndex),
          totalItems: products.length,
          currentPage: currentIndex,
          lastPage: Math.ceil(products.length / itemsPerPage),
        };
      }
      const filteredProducts = products.filter(
        (product) => product.productCategory.id === categoryId
      );

      const result = filteredProducts.slice(startIndex, endIndex);
      return {
        result,
        totalItems: filteredProducts.length,
        currentPage: currentIndex,
        lastPage: Math.ceil(filteredProducts.length / itemsPerPage),
      };
    },
});
