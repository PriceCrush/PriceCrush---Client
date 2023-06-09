import * as S from '@/components/stylecomponents/formbase.style';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import useValidation from '@/hooks/useValidation';
import Router from 'next/router';
import { useModal } from '@/hooks/useModal';
import CommonMessage from '@/components/modals/member/CommonMessage';
import { Api } from '@/utils/commonApi';
import { temporaryPasswordApiCode } from '@/components/member/apiCodeMessage';

const FindPassword = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [sendPassword, setSendPassword] = useState(false);

  const { openModal, closeModal } = useModal();
  /**
   * @description 버튼의 name에 따라 접근하기 위함
   */
  const buttonRef = useRef<HTMLButtonElement>(null);
  const LOGIN_URL = '/member/login';

  const handleUserInfo = (e: any) => {
    setUserInfo((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  /**
   * @description 임시 비밀번호가 정상적으로 발급될경우, 모달을 나가고 loginPage로 이동
   */
  const sendPasswordSuccess = () => {
    closeModal(), Router.push(`${LOGIN_URL}`);
  };

  /**
   * @description 임시비밀번호 발급, axios 요청
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (buttonRef.current?.name === 'newPWBtn') {
      try {
        const result = await Api.post('users/reset/pw', userInfo);
        console.log(result);
        const { code } = result.status;
        const { title, message } = temporaryPasswordApiCode(code);
        openModal({
          content: (
            <>
              <CommonMessage title={title}>{message}</CommonMessage>
            </>
          ),
        });
        setSendPassword(true);
      } catch (error: any) {
        const code = error.response.status;
        const { title, message } = temporaryPasswordApiCode(code);
        openModal({
          content: (
            <>
              <CommonMessage title={title}>{message}</CommonMessage>
            </>
          ),
        });
      }
    } else if (buttonRef.current?.name === 'goLoginPageBtn') {
      Router.push(`${LOGIN_URL}`);
    }
  };

  /**
   * @description 이메일 form 유효성검사
   */
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
            disabled={sendPassword}
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
            disabled={sendPassword}
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
            disabled={sendPassword}
            textLength={userInfo.email.length}
          ></S.FormItem>
        </S.FormItemBox>

        {sendPassword ? (
          <S.FormButton
            type="submit"
            name="goLoginPageBtn"
            ref={buttonRef}
            onClick={sendPasswordSuccess}
          >
            로그인 페이지 이동
          </S.FormButton>
        ) : (
          <S.FormButton
            type="submit"
            name="newPWBtn"
            ref={buttonRef}
            disabled={showButton}
          >
            임시 비밀번호 발급
          </S.FormButton>
        )}
      </S.FormLayOut>
    </S.Wrapper>
  );
};

export default FindPassword;
