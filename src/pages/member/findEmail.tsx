import CommonMessage from '@/components/modals/member/CommonMessage';
import * as S from '@/components/stylecomponents/formbase.style';
import { useModal } from '@/hooks/useModal';
import axios from 'axios';
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // axios의 get요청의 경우 body에 담아서 내용을 보낼 수 가 없음
    if (buttonRef.current?.name === 'findEmailBtn') {
      axios
        .post('/api/member/findEmailApi', { userInfo })
        .then(function (response) {
          console.log(response);
          const title = '가입된 이메일';
          const message = response.data.email;
          openModal({
            content: (
              <>
                <CommonMessage title={title}>{message}</CommonMessage>
              </>
            ),
          });
          setSendEmail(true);
          // setTimeout(() => {
          //   closeModal(), Router.push(`${LOGIN_URL}`);
          //   // sendPasswordSuccess; //왜 적용이 안되지?
          // }, 10000);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (buttonRef.current?.name === 'goLoginPageBtn') {
      Router.push(`${LOGIN_URL}`);
    }
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
            placeholder="이름 입력"
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
            임시 비밀번호 발급
          </S.FormButton>
        )}
      </S.FormLayOut>
    </S.Wrapper>
  );
};

export default FindEmail;
