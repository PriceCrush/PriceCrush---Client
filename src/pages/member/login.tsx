import LoginForm from '@/components/member/loginPage/LoginForm';

import React, { useState } from 'react';
import styled from 'styled-components';

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
