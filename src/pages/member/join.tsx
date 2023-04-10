import JoinForm from '@/components/loginpage/JoinForm';
import LoginForm from '@/components/loginpage/LoginForm';
import React from 'react';
import styled from 'styled-components';

const Join = () => {
  return (
    <LoginLayOut>
      <LogoTitle>회원가입</LogoTitle>
      <JoinForm />
    </LoginLayOut>
  );
};

const LogoTitle = styled.h2`
  font-size: 4rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 700;
`;

const LoginLayOut = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Join;
