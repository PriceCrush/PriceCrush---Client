import axios from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ButtonBase from '@/components/buttons/ButtonBase';
import { errorColorStyle } from '../stylecomponents/errorColor.style';
import useValidation from '@/hooks/useValidation';

//LoinForm type
interface LoginResponse {
  token: string;
}

const LoginForm = () => {
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState('');

  //error 판별

  //error메세지
  // 에러가 나면 나오도록 => 에러 true : orgnage
  // 단어가 없을 땐 안되도록 장치가 필요함
  const [isPassWord, setIsPassWord] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const passwordStatus = useValidation(passWord);

  const BASE_URL = 'http://localhost:8080/';
  const LOGIN_URL = '/'; //성공할때의 주소

  const handleSubmit = async (e) => {
    e.preventDefault();
    //rewrite에 적던가 env에 넣던가 그때가서 해결

    // try {
    //   const response = await axios.post<LoginResponse>(`${BASE_URL}/auth`, {
    //     id,
    //     passWord,
    //   });
    //   const { token } = response.data;
    //   // JWT토큰 저장
    //   localStorage.setItem('token', token);
    //   // 로그인 성공 후 메인 페이지로 이동 -> 그냥 메인페이지로 가기로 했던가 아니면 과거에 봤던 페이지로 가기로했던가?
    //   Router.push(`${LOGIN_URL}`);
    // } catch (error) {
    //   console.log(error);
    //   alert('로그인 실패');
    // }
  };

  // 비밀번호 유효성 검사
  // 따로 분리하는게 좋은지 아닌지 몰겟음
  const showErrorMessage = useCallback(() => {
    const { textlength, specialCharacters, includingCharacters, continuity } =
      passwordStatus;
    if (
      !textlength ||
      !specialCharacters ||
      !includingCharacters ||
      continuity
    ) {
      setPasswordMessage(
        '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)'
      );
      setIsPassWord(true);
    } else {
      setPasswordMessage('');
      setIsPassWord(false);
    }
  }, [passwordStatus]);
  useEffect(() => {
    showErrorMessage();
  }, [showErrorMessage, passwordMessage]);
  useEffect(() => {
    console.log(isPassWord);
  }, [isPassWord]);

  return (
    <LoginFormLayOut method="post" onSubmit={handleSubmit}>
      <FormItemBox>
        <FormItemIdTitle>로그인</FormItemIdTitle>
        <FormItem
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        ></FormItem>
      </FormItemBox>
      <FormItemBox errorCheck={isPassWord}>
        <FormItemTitle errorCheck={isPassWord}>비밀번호</FormItemTitle>
        <FormItem
          type="password"
          name="password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
          required
          errorCheck={isPassWord}
        ></FormItem>

        {passWord.length > 0 && <span>{passwordMessage}</span>}
      </FormItemBox>

      <LoginButton type="submit">로그인</LoginButton>
    </LoginFormLayOut>
  );
};

const LoginFormLayOut = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
`;

const FormItemTitle = styled.h3<{ errorCheck?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 450;
  color: ${errorColorStyle};
`;

const FormItemIdTitle = styled(FormItemTitle)`
  color: ${({ theme }) => theme.color.BLACK};
`;

const FormItemBox = styled.div<{ errorCheck?: boolean }>`
  height: 80px;
  margin: ${({ theme }) => theme.margin.baseMargin};
  padding: ${({ theme }) => theme.padding.inputY};
  > span {
    display: ${(props) => (props.errorCheck ? '' : 'none')};
    color: ${({ theme }) => theme.color.DEEP_ORANGE};
  }
  //form조건이 안맞을 경우 빨간색
`;

const FormItem = styled.input<{ errorCheck?: boolean }>`
  width: 100%;
  height: 38px;
  margin: 10px 0;
  border: 0px solid;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY};
  /* ${({ theme, errorCheck }) =>
    errorCheck ? theme.color.GRAY : theme.color.DEEP_ORANGE}; */
  :focus {
    border-bottom: 1px solid ${errorColorStyle};
  }
`;

const LoginButton = styled(ButtonBase)`
  margin-top: 20px;
`;

export default LoginForm;
