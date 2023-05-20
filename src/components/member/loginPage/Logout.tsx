import axios from 'axios';
import React from 'react';
import ButtonBase from '../../buttons/ButtonBase';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userCommonDataState } from '@/atoms/isLoggedInState';
import { removeCookies } from 'cookies-next';

const Logout = () => {
  // header에있는 쿠키 어떻게 하는지 확인
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userCommonDataAtom, setUserCommonDataAtom] =
    useRecoilState(userCommonDataState);

  const handleLogOut = () => {
    try {
      axios
        .post('/api/member/logoutApi')
        .then(function (res) {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsLoggedIn(false);

      removeCookies('accessToken');
      removeCookies('myRefreshKey');
      window.localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return <span onClick={handleLogOut}> 로그아웃</span>;
};

export default Logout;
