import axios from 'axios';
import React from 'react';
import ButtonBase from '../../buttons/ButtonBase';
import { useRecoilState } from 'recoil';
import {
  accessTokenState,
  isLoggedInState,
  userDataState,
} from '@/components/member/loginPage/isLoggedInState';

const Logout = () => {
  // header에있는 쿠키 어떻게 하는지 확인
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userData, setUserData] = useRecoilState(userDataState);
  const [accessTokenAtom, setAccessTokenAtom] =
    useRecoilState(accessTokenState);
  const handleLogOut = () => {
    try {
      axios.post('/api/member/logoutApi', {}).then(function (res) {
        console.log(res);
      });
      setIsLoggedIn(false);
      setUserData({
        address: '',
        email: '',
        name: '',
        nickname: '',
        phone: '',
      });
      setAccessTokenAtom('');
    } catch (error) {
      console.log(error);
    }
  };

  return <span onClick={handleLogOut}> 로그아웃</span>;
};

export default Logout;
