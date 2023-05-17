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
    searchTerm: string;
    currentIndex: number;
    itemsPerPage: number;
  }
>({
  key: 'filteredProductsByCategoryState',
  get:
    ({ categoryId, currentIndex, itemsPerPage, searchTerm }) =>
    ({ get }) => {
      const startIndex = (currentIndex - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const products = get(productFromServerState);

      let filteredProducts = products;
      if (categoryId !== 'all') {
        filteredProducts = products.filter(
          (product) => product.productCategory.id === categoryId
        );
      }

      if (searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const result = filteredProducts.slice(startIndex, endIndex);

      return {
        result,
        totalItems: filteredProducts.length,
        currentPage: currentIndex,
        lastPage: Math.ceil(filteredProducts.length / itemsPerPage),
      };
    },
});
