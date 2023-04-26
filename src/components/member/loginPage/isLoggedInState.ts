import { atom } from 'recoil';

interface userDataType {
  address: string;
  email: string;
  name: string;
  nickname: string;
  phone: string;
}

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

export const accessTokenState = atom({
  key: 'accessToken',
  default: '',
});

export const userDataState = atom<userDataType>({
  key: 'userDataState',
  default: {
    address: '',
    email: '',
    name: '',
    nickname: '',
    phone: '',
  },
});
