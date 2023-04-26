import LoginForm from '@/components/member/loginPage/LoginForm';

import React, { useState } from 'react';
import styled from 'styled-components';

// export const getServerSideProps = async (context: any) => {
//   /**
//    * @description 로그인이 안된 상태에서 접근 시 로그인 페이지로 이동
//    */
//   // console.log(`context.req.cookies : ${context.req.cookies}`);
//   console.log(`dd`);
//   const { accessToken } = context.req.cookies;
//   console.log(accessToken);
//   return {
//     props: {},
//     // props: {
//     //   accessToken,
//     // },
//   };
// };

const Login = () => {
  return (
    <LoginLayOut>
      <LogoTitle>PriceCrush</LogoTitle>
      <LoginForm />
    </LoginLayOut>
  );
};
const LogoTitle = styled.h2`
  font-size: 4rem;
  font-family: 'Ubuntu', sans-serif;
`;

const LoginLayOut = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Login;
