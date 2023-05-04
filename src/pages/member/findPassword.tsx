import * as S from '@/components/stylecomponents/formbase.style';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useValidation from '@/hooks/useValidation';
import Router from 'next/router';

const FindPassword = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const RESET_PW_URL = '/member/resetPassword';
  const LOGIN_URL = '/member/login';
  const handleUserInfo = (e: any) => {
    setUserInfo((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // axios의 get요청의 경우 body에 담아서 내용을 보낼 수 가 없음
    axios
      .post('/api/member/findPassWordApi', { userInfo })
      .then(function (response) {
        console.log(response);
        Router.push(`${LOGIN_URL}`);
        //Router.push(`${RESET_PW_URL}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // memverinputForm 의존성 낮춰서 리팩토링할 예정
  const { emailForm } = useValidation(userInfo.email);
  const showButton =
    !emailForm || !userInfo.name.length || userInfo.phone.length < 11;

  return (
    <S.Wrapper>
      <S.LogoTitle>비밀번호 찾기</S.LogoTitle>
      <S.HelpNoticeSection>
        <span>
          가입 시 등록한 이름,휴대폰 번호,이메일을 입력하면 가입된 휴대폰으로
          임시 비밀번호를 보내드립니다.
        </span>
      </S.HelpNoticeSection>

      <S.FormLayOut method="post" onSubmit={handleSubmit}>
        <S.FormItemBox>
          <S.FormTitle textLength={userInfo.name.length}>이름</S.FormTitle>
          <S.FormItem
            name="name"
            value={userInfo.name}
            onChange={handleUserInfo}
            placeholder="이름"
            textLength={userInfo.name.length}
          ></S.FormItem>
        </S.FormItemBox>

        <S.FormItemBox>
          <S.FormTitle textLength={userInfo.phone.length}>핸드폰</S.FormTitle>
          <S.FormItem
            name="phone"
            value={userInfo.phone}
            onChange={handleUserInfo}
            placeholder="'-' 빼고 숫자만 입력"
            textLength={userInfo.phone.length}
          ></S.FormItem>
        </S.FormItemBox>
        <S.FormItemBox>
          <S.FormTitle textLength={userInfo.email.length}>
            이메일 주소
          </S.FormTitle>
          <S.FormItem
            name="email"
            value={userInfo.email}
            onChange={handleUserInfo}
            placeholder="email@priceCrush.co.kr"
            textLength={userInfo.email.length}
          ></S.FormItem>
        </S.FormItemBox>

        <S.FormButton type="submit" disabled={showButton}>
          이메일 아이디 찾기
        </S.FormButton>
      </S.FormLayOut>
    </S.Wrapper>
  );
};

export default FindPassword;
