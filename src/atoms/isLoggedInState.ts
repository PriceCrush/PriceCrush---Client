import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

//1. api로 유저정보 가져올 시 로컬을 이용해서 저장
//2. api로 유저정보를 가져오지 않을 시 세션스토리지에 저장

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

// api요청으로 유저 정보 가져올 시 session에 저장x
export const userPrivateDataState = atom<usetPrivateDataType>({
  key: 'userPrivateData',
  default: {
    address: '',
    phone: '',
  },
  effects_UNSTABLE: [userDataPersist],
});
