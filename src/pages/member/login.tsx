import LoginForm from '@/components/member/loginPage/LoginForm';
import { GetServerSidePropsContext } from 'next';

import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * @param 로그인 안되어있을 시 {}반환
 * @returns
 */
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  /**
   * @description 로그인상태에서 접근 메인 페이지로 이동
   */
  const { accessToken } = context.req.cookies;
  if (accessToken !== undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {}, // 빈 객체 반환
  };
};

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
