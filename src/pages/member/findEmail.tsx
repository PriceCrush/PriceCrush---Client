import { findEmailApiCode } from '@/components/member/apiCodeMessage';
import CommonMessage from '@/components/modals/member/CommonMessage';
import * as S from '@/components/stylecomponents/formbase.style';
import { useModal } from '@/hooks/useModal';
import { Api } from '@/utils/commonApi';
import Router from 'next/router';
import React, { useRef, useState } from 'react';

const FindEmail = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
  });
  const [sendEmail, setSendEmail] = useState(false);

  const handleUserInfo = (e: any) => {
    setUserInfo((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const LOGIN_URL = '/member/login';

  const { openModal, closeModal } = useModal();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const sendPasswordSuccess = () => {
    closeModal(), Router.push(`${LOGIN_URL}`);
  };
  const showButton = !userInfo.name.length || userInfo.phone.length < 11;

  // 우선 보류
  // 메인페이지 이동 시 Error: Abort fetching component for route: "/member/login" 이런 오류발생
  // 메인 페이지 이동 시 Error: Loading initial props cancelled  이런 오류 발생

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (buttonRef.current?.name === 'findEmailBtn') {
      try {
        const result = await Api.get(`users/find/id`, { params: userInfo });
        console.log(result);
        const title = '가입된 이메일';
        openModal({
          content: (
            <>
              <CommonMessage title={title}>{result}</CommonMessage>
            </>
          ),
        });
        setSendEmail(true);
        setTimeout(() => {
          closeModal(), Router.push(`${LOGIN_URL}`);
        }, 10000);
      } catch (error: any) {
        const { title, message } = findEmailApiCode(error.response.status);
        console.log(error);
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
            placeholder="이름 입력"
            textLength={userInfo.name.length}
            disabled={sendEmail}
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
            disabled={sendEmail}
          ></S.FormItem>
        </S.FormItemBox>

        {sendEmail ? (
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
            name="findEmailBtn"
            ref={buttonRef}
            disabled={showButton}
          >
            이메일 찾기
          </S.FormButton>
        )}
      </S.FormLayOut>
    </S.Wrapper>
  );
};

export default FindEmail;
