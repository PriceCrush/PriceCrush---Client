import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface userCommonDataType {
  email: string;
  name: string;
  nickname: string;
}

interface usetPrivateDataType {
  address: string;
  phone: string;
}
// 해당 코드로 인하여 새로고침 시
//Error: Hydration failed because the initial UI does not match what was rendered on the server.오류발생
const isClient = typeof window !== 'undefined' && window.sessionStorage;
const storage = isClient ? window.sessionStorage : undefined;

const { persistAtom: isLoggedInStatePersist } = recoilPersist({
  key: 'isLoggedIn',
  storage,
});

const { persistAtom: userDataPersist } = recoilPersist({
  key: 'userData',
  storage,
});

const { persistAtom: accessTokenPersist } = recoilPersist({
  key: 'accessToken',
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
  },
  effects_UNSTABLE: [userDataPersist],
});

export const userPrivateDataState = atom<usetPrivateDataType>({
  key: 'userPrivateData',
  default: {
    address: '',
    phone: '',
  },
});
