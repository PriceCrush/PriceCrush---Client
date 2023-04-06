import axios from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useValidation from './useValidation';

interface LoginResponse {
  token: string;
}
const LoginForm = () => {
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState('');

  //error
  // const [passwordMessage, setPasswordMessage] = useState<string>('');
  //
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

  //비밀번호 유효성 검사
  // 머리속에 있는거
  //=> 비밀번호 값이 바뀔때 마다 그에 해당하는 오류를 보여준다 -> 완성되면 안보이도록
  // 논리적인 과정을 분리해서 보여주고 싶어
  const onChangePassword = useCallback((e: string) => {
    setPassWord(e); //따로 나둬야하나?
  }, []);

  useEffect(() => {
    console.log(passwordStatus);
  }, [passwordStatus]);

  return (
    <LoginFormLayOut method="post" onSubmit={handleSubmit}>
      <FormItemBox>
        <FormItemTitle>로그인</FormItemTitle>
        <FormItem
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        ></FormItem>
      </FormItemBox>
      <FormItemBox>
        <FormItemTitle>비밀번호</FormItemTitle>
        <FormItem
          type="password"
          name="password"
          value={passWord}
          onChange={(e) => onChangePassword(e.target.value)}
          required
        ></FormItem>
        {/* {passwordMessage && <span>{passwordMessage}</span>} */}
      </FormItemBox>

      <button type="submit">로그인</button>
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
const FormItemTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 450;
`;

const FormItemBox = styled.div`
  margin: ${({ theme }) => theme.margin.baseMargin};
  //form조건이 안맞을 경우 빨간색
`;

const FormItem = styled.input`
  width: 100%;
  height: 38px;
  margin: 10px 0;
  border: 0px solid;
  outline: none;
  :focus {
    //틀리면 주황색으로
    border-bottom: 1px solid ${({ theme }) => theme.color.BLACK};
  }
  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY};
`;

export default LoginForm;
