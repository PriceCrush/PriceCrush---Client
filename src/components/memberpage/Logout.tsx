import axios from 'axios';
import React from 'react';
import ButtonBase from './../buttons/ButtonBase';

// function delCookie(tokenName){
//     const time = new Date(Date.now() - 1).toUTCString();
//     return
// }

const Logout = () => {
  // document.cookie로 접근이 가능한 경우는 HttpOnly;를 사용하지 않을 때 뿐임
  // 하지만 이걸 사용하지 않을경우  XSS 공격에 취약
  // 그렇기때문에 최소한의 장치로 이를 사용해야함
  const handleLogOut = () => {
    try {
      axios.post('/api/logoutApi', {}).then(function (res) {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ButtonBase onClick={handleLogOut}> 로그아웃 버튼 </ButtonBase>
    </div>
  );
};

export default Logout;
