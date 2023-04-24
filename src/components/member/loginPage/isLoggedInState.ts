import { atom } from 'recoil';

interface loginUserInfo {
  address: string;
  email: string;
  name: string;
  nickName: string;
  phone: string;
}

interface isLoggedInStateType {
  accessToken: string;
  loginUserInfo: loginUserInfo;
}

export const isLoggedInState = atom<isLoggedInStateType>({
  key: 'isLoggedInState',
  default: {
    accessToken: '',
    loginUserInfo: {
      address: '',
      email: '',
      name: '',
      nickName: '',
      phone: '',
    },
  },
});
