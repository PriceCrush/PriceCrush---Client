import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const isClient = typeof window !== 'undefined';
const storage = isClient ? window.sessionStorage : undefined;

interface SearchAndCategoriesStateProps {
  searchTerm: string;
  categoryId: string;
}

const { persistAtom } = recoilPersist({
  key: 'searchAndCategories',
  storage,
});

export const searchAndCategoriesState = atom<SearchAndCategoriesStateProps>({
  key: 'searchAndCategoriesState',
  default: {
    searchTerm: '',
    categoryId: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const selectedCategory = selector({
  key: 'selectedCategory',
  get: ({ get }) => {
    const { categoryId } = get(searchAndCategoriesState);
    return categoryId;
  },
});
