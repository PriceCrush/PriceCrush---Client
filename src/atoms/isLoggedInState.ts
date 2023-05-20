import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface userCommonDataType {
  email: string;
  name: string;
  nickname: string;
  uid: string;
}

interface usetPrivateDataType {
  address: string;
  phone: string;
}

const isClient = typeof window !== 'undefined' && window.sessionStorage;
const storage = isClient ? window.localStorage : undefined;

const { persistAtom: isLoggedInStatePersist } = recoilPersist({
  key: 'isLoggedIn',
  storage,
});

const { persistAtom: userDataPersist } = recoilPersist({
  key: 'userData',
  storage,
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
  effects_UNSTABLE: [isLoggedInStatePersist],
});

export const userCommonDataState = atom<userCommonDataType>({
  key: 'userCommonDataState',
  default: {
    email: '',
    name: '',
    nickname: '',
    uid: '',
  },
  effects_UNSTABLE: [userDataPersist],
});
