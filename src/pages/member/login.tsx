import LoginForm from '@/components/loginpage/LoginForm';
import React, { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <LoginLayOut>
      <LoginForm />
    </LoginLayOut>
  );
};

const LoginLayOut = styled.div`
  width: 100vw;
  height: 86vh;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export default Login;
