import axios from 'axios';
import React from 'react';
import ButtonBase from '../../buttons/ButtonBase';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '@/components/member/loginPage/isLoggedInState';

const Logout = () => {
  // header에있는 쿠키 어떻게 하는지 확인
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const handleLogOut = () => {
    try {
      axios.post('/api/member/logoutApi', {}).then(function (res) {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
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
    document.cookie = 'myRefreshKey=; HttpOnly; path=/; Max-Age=0;';
  };
  return (
    <div>
      <ButtonBase onClick={handleLogOut}> 로그아웃 버튼 </ButtonBase>
    </div>
  );
};

export default Logout;
