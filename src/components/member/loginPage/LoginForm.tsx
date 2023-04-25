import axios from 'axios';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import Link from 'next/link';
import MemberInputForm from '../../inputs/MemberInputForm';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userDataState } from './isLoggedInState';

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [loginErr, setLoginErr] = useState({
    email: false,
    password: false,
  });

  // 이거 reco뷔 부분으로 넣야야 하는가?
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [userData, setUserData] = useRecoilState(userDataState);

  const LOGIN_URL = '/'; //성공할때의 주소

  /**
   * @description 로그인 axios요청
   * @param e submitEvent
   */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //rewrite에 적던가 env에 넣던가 그때가서 해결
    axios
      .post('/api/member/loginApi', loginInfo)
      .then(function (response) {
        const { data } = response;
        //recoilState 저장
        setIsLoggedIn(true);
        setUserData(data);
        Router.push(`${LOGIN_URL}`);
      })
      .catch(function (error) {
        if (error.response.status === 422) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };

  /**
   * @description input 정보
   */
  const handleLoginInfo = (e: any) => {
    setLoginInfo(e);
  };
  /**
   * @description input 오류여부
   */
  const passOrNot = (e: any) => {
    setLoginErr(e);
  };

  return (
    <S.LoginFormLayOut method="post" onSubmit={handleSubmit}>
      <MemberInputForm
        type="email"
        name="email"
        handleUserInfo={handleLoginInfo}
        passOrNot={passOrNot}
      >
        이메일
      </MemberInputForm>
      <MemberInputForm
        type="text"
        name="password"
        handleUserInfo={handleLoginInfo}
        passOrNot={passOrNot}
      >
        비밀번호
      </MemberInputForm>
      <S.LoginButton
        type="submit"
        disabled={!loginErr.email || !loginErr.password}
      >
        로그인
      </S.LoginButton>

      <S.MemberNavList>
        <S.Item>
          {' '}
          <Link href={'/member/join'}>이메일 가입</Link>
        </S.Item>
        <S.Item>
          <Link href={'/member/findEmail'}>이메일 찿기</Link>
        </S.Item>
        <S.Item>
          <Link href={'/member/findPassword'}>비밀번호 찾기</Link>
        </S.Item>
      </S.MemberNavList>
    </S.LoginFormLayOut>
  );
};

export default LoginForm;
