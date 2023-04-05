import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { type } from '../../types/buttonTypes';

interface LoginResponse {
  token: string;
}
const LoginForm = () => {
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState('');

  const BASE_URL = 'http://localhost:8080/';
  const LOGIN_URL = '/'; //성공할때의 주소

  const handleSubmit = async (e) => {
    e.preventDefault();
    //rewrite에 적던가 env에 넣던가 그때가서 해결

    try {
      const response = await axios.post<LoginResponse>(`${BASE_URL}/auth`, {
        id,
        passWord,
      });
      const { token } = response.data;
      // JWT토큰 저장
      localStorage.setItem('token', token);
      // 로그인 성공 후 메인 페이지로 이동 -> 그냥 메인페이지로 가기로 했던가 아니면 과거에 봤던 페이지로 가기로했던가?
      Router.push(`${LOGIN_URL}`);
    } catch (error) {
      console.log(error);
      alert('로그인 실패');
    }
  };

  return (
    <LoginFormLayOut method="post" onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        value={id}
        placeholder="아이디"
        onChange={(e) => setId(e.target.value)}
        required
      ></input>
      <input
        type="password"
        name="password"
        value={passWord}
        onChange={(e) => setPassWord(e.target.value)}
        placeholder="비밀번호"
        required
      ></input>
      <button type="submit">로그인</button>
    </LoginFormLayOut>
  );
};

const LoginFormLayOut = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

export default LoginForm;
