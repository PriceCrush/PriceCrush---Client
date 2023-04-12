import axios from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ButtonBase from '@/components/buttons/ButtonBase';
import * as S from '@/components/stylecomponents/memberControl.styles';
import useValidation from '@/hooks/useValidation';
import Link from 'next/link';
import MemberInputForm from '../inputs/memberInputForm';

//LoinForm type
interface LoginResponse {
  token: string;
}

const JoinForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    phone: '',
    nickname: '',
    name: '',
    address: '',
    agreement_use: '',
    agreement_mkt: '',
    favorites: [],
  });
  const [userInfoErr, setUserInfoErr] = useState({
    email: false,
    password: false,
    phone: false,
    nickname: false,
    address: false,
    agreement_use: false,
    agreement_mkt: false,
  });

  const BASE_URL = 'http://localhost:8080/';
  const LOGIN_URL = '/'; //성공할때의 주소

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
  };
  const inputData = (e) => {
    setUserInfo(e);
  };

  return (
    <S.LoginFormLayOut method="post" onSubmit={handleSubmit}>
      <MemberInputForm type="text" name="nickname" inputData={inputData}>
        아이디
      </MemberInputForm>
      <MemberInputForm type="text" name="password" inputData={inputData}>
        비밀번호
      </MemberInputForm>
      <MemberInputForm type="text" name="name" inputData={inputData}>
        이름
      </MemberInputForm>
      <MemberInputForm type="text" name="phone" inputData={inputData}>
        핸드폰
      </MemberInputForm>
      <MemberInputForm type="email" name="email" inputData={inputData}>
        이메일
      </MemberInputForm>
      {/* 주소는 카카오 api사용 */}
      {/* <MemberInputForm type="text" name="address" inputData={inputData}>
        주소
      </MemberInputForm> */}

      <S.LoginButton type="submit">동의하고 가입하기</S.LoginButton>
      {/* <S.LoginButton type="submit" disabled={!id || isPassWord}>
        동의하고 가입하기
      </S.LoginButton> */}
    </S.LoginFormLayOut>
  );
};

export default JoinForm;
