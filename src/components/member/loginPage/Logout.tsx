import axios from 'axios';
import React from 'react';
import ButtonBase from '../../buttons/ButtonBase';
import { useRecoilState } from 'recoil';
import {
  isLoggedInState,
  userCommonDataState,
  userPrivateDataState,
} from '@/atoms/isLoggedInState';

const Logout = () => {
  // header에있는 쿠키 어떻게 하는지 확인
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userCommonDataAtom, setUserCommonDataAtom] =
    useRecoilState(userCommonDataState);
  const [userPrivateDataAtom, setUserPrivateDataAtom] =
    useRecoilState(userPrivateDataState);

  const handleLogOut = () => {
    try {
      axios.post('/api/member/logoutApi', {}).then(function (res) {
        console.log(res);
      });
      setIsLoggedIn(false);

      setUserCommonDataAtom({
        email: '',
        name: '',
        nickname: '',
        uid: '',
      });
      setUserPrivateDataAtom({
        address: '',
        phone: '',
      });

      sessionStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return <span onClick={handleLogOut}> 로그아웃</span>;
};

export default Logout;
