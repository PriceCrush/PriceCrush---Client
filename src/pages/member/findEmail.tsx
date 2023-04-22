import ButtonBase from '@/components/buttons/ButtonBase';
import axios from 'axios';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface checkvalidationProps {
  textLength?: number;
}

const FindEmail = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
  });

  const handleUserInfo = (e: any) => {
    setUserInfo((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // axios의 get요청의 경우 body에 담아서 내용을 보낼 수 가 없음
    // axios
    //   .get(
    //     'http://ec2-13-124-196-195.ap-northeast-2.compute.amazonaws.com:3000/users/find/id',
    //     userInfo
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <Wrapper>
      <LogoTitle>이메일 아이디 찾기</LogoTitle>
      <HelpNoticeSection>
        <span>
          가입 시 등록한 이름과 휴대폰 번호를 입력하면 가입된 이메일을
          알려드립니다.
        </span>
      </HelpNoticeSection>

      <LoginFormLayOut method="post" onSubmit={handleSubmit}>
        <FormItemBox>
          <FormTitle textLength={userInfo.name.length}>이름</FormTitle>
          <FormItem
            name="name"
            value={userInfo.name}
            onChange={handleUserInfo}
            placeholder="이름"
            textLength={userInfo.name.length}
          ></FormItem>
        </FormItemBox>

        <FormItemBox>
          <FormTitle textLength={userInfo.phone.length}>핸드폰</FormTitle>
          <FormItem
            name="phone"
            value={userInfo.phone}
            onChange={handleUserInfo}
            placeholder="가입한 휴대폰 번호"
            textLength={userInfo.phone.length}
          ></FormItem>
        </FormItemBox>

        <LoginButton
          type="submit"
          disabled={!userInfo.name.length || userInfo.phone.length < 11}
        >
          이메일 아이디 찾기
        </LoginButton>
      </LoginFormLayOut>
    </Wrapper>
  );
};

const LoginButton = styled(ButtonBase)<checkvalidationProps>`
  margin-top: 20px;
  height: 52px;
  font-weight: 700;
  border-radius: 15px;
  :disabled {
    color: ${({ theme }) => theme.color.WHITE};
    cursor: auto;
  }
`;

const LogoTitle = styled.h2`
  font-size: 3rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
`;

const HelpNoticeSection = styled.section`
  margin-top: 40px;
  border-top: 3px solid;
  padding: 40px 0 30px;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const LoginFormLayOut = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 35px auto;
`;

export const FormTitle = styled.h3<checkvalidationProps>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 450;
`;

const FormItemBox = styled.div`
  margin: 10px 10px 5px 10px;
  padding: ${({ theme }) => theme.padding.inputY};
  //form조건이 안맞을 경우 빨간색
`;

const FormItem = styled.input<checkvalidationProps>`
  width: 100%;
  height: 38px;
  margin-top: 5px;
  border: 0px solid;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY};

  ::placeholder {
    padding: 3px;
    color: ${({ theme }) => theme.color.GRAY};
    font-weight: 500;
  }

  :focus {
    border-bottom: 1px solid
      ${({ theme, textLength }) => (textLength ? theme.color.BLACK : '')};
  }
`;

const Wrapper = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default FindEmail;
