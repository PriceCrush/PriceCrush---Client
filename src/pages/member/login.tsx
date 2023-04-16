import LoginForm from '@/components/memberpage/LoginForm';
import React, { useState } from 'react';
import styled from 'styled-components';

//엑세스를 로컬 스토리지 담아서

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
