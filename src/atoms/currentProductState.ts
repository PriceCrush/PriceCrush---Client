import { CurrentProductStateProps } from '@/types/productsTypes';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const isClient = typeof window !== 'undefined';
const storage = isClient ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage,
});

export const currentProductState = atom<CurrentProductStateProps>({
  key: 'currentProductState',
  default: {
    productData: null,
    tempData: null,
    formattedInputBidPrice: null,
    handleBidButtonClick: () => null,
    handleCustomBidPriceInput: () => null,
    isAuctionStarted: null,
    available: null,
  },
  effects_UNSTABLE: [persistAtom],
});
