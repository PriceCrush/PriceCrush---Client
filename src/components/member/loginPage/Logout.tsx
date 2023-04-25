import axios from 'axios';
import React from 'react';

import { useRecoilState } from 'recoil';
import { isLoggedInState } from '@/components/member/loginPage/isLoggedInState';
import { FaUserCircle } from 'react-icons/fa';

const Logout = () => {
  // header에있는 쿠키 어떻게 하는지 확인
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const handleLogOut = () => {
    setIsLoggedIn({
      accessToken: '',
      loginUserInfo: {
        address: '',
        email: '',
        name: '',
        nickName: '',
        phone: '',
      },
    });
    window.localStorage.removeItem('accessToken');
  };
  return <div onClick={handleLogOut}>로그아웃</div>;
};

export default Logout;
