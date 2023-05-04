import * as S from '@/components/stylecomponents/formbase.style';
import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';

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

  const showButton = !userInfo.name.length || userInfo.phone.length < 11;

  const LOGIN_URL = '/member/login';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // axios의 get요청의 경우 body에 담아서 내용을 보낼 수 가 없음
    axios
      .post('/api/member/findEmailApi', { userInfo })
      .then(function (response) {
        console.log(response);
        Router.push(`${LOGIN_URL}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //placeholder 추가 예정
  return (
    <S.Wrapper>
      <S.LogoTitle>이메일 아이디 찾기</S.LogoTitle>
      <S.HelpNoticeSection>
        <span>
          가입 시 등록한 이름과 휴대폰 번호를 입력하면 가입된 이메일을
          알려드립니다.
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

        <S.FormButton type="submit" disabled={showButton}>
          이메일 아이디 찾기
        </S.FormButton>
      </S.FormLayOut>
    </S.Wrapper>
  );
};

export default FindEmail;
