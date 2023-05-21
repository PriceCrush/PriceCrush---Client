import React, { useCallback, useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import MemberInputForm from '@/components/inputs/MemberInputForm';
import axios from 'axios';
import AddressForm from '@/components/member/joinPage/AddressForm';
import TermForm from '@/components/member/joinPage/TermForm';
import CategorySelector from '@/components/member/joinPage/CategorySelector';
import PhoneNumberVerification from './PhoneNumberVerification';
import CommonMessage from '@/components/modals/member/CommonMessage';
import { useRouter } from 'next/router';
import { useModal } from '@/hooks/useModal';
import { Api } from '@/utils/commonApi';
import { JoginErrorCode } from '@/components/member/apiCodeMessage';

//LoinForm type
interface UserInfoErrProps {
  [key: string]: boolean;
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

  const [userInfoErr, setUserInfoErr] = useState<UserInfoErrProps>({
    email: false,
    password: false,
    phone: false,
    name: false,
    nickname: false,
    address: false,
    agreement_use: false,
  });

  const LOGIN_URL = '/member/login';
  const router = useRouter();
  const { openModal } = useModal();

  /**
   *
   * @description 회원가입 axios요청
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await Api.post('users', userInfo);
      console.log(result);
      // router.push(LOGIN_URL);
    } catch (error: any) {
      const { title, message } = JoginErrorCode(error.response.status);
      console.log(error);
      openModal({
        content: (
          <>
            <CommonMessage title={title}>{message}</CommonMessage>
          </>
        ),
      });
    }
  };

  /**
   * @description input 정보
   */
  const handleUserInfo = (e: any) => {
    setUserInfo(e);
  };
  /**
   * @description input 오류여부
   */
  const passOrNot = (e: any) => {
    setUserInfoErr(e);
  };
  /**
   * @description 버튼 활성화
   * @description userInfoErr의 하나의 값이라도 false가 나올시 false리턴
   */
  const showButton = useCallback(() => {
    for (let key in userInfoErr) {
      if (!userInfoErr[key as keyof UserInfoErrProps]) {
        return true;
      }
    }
    return false;
  }, [userInfoErr]);

  useEffect(() => {
    showButton();
  }, [showButton]);

  return (
    <S.LoginFormLayOut method="post" onSubmit={handleSubmit}>
      <MemberInputForm
        type="text"
        name="nickname"
        handleUserInfo={handleUserInfo}
        passOrNot={passOrNot}
      >
        아이디
      </MemberInputForm>
      <MemberInputForm
        type="text"
        name="password"
        handleUserInfo={handleUserInfo}
        passOrNot={passOrNot}
      >
        비밀번호
      </MemberInputForm>
      <MemberInputForm
        type="text"
        name="name"
        handleUserInfo={handleUserInfo}
        passOrNot={passOrNot}
      >
        이름
      </MemberInputForm>

      {/* 핸드폰 */}
      <PhoneNumberVerification
        handleUserInfo={handleUserInfo}
        passOrNot={passOrNot}
      />

      <MemberInputForm
        type="email"
        name="email"
        handleUserInfo={handleUserInfo}
        passOrNot={passOrNot}
      >
        이메일
      </MemberInputForm>

      {/* 주소 */}
      <AddressForm handleUserInfo={handleUserInfo} passOrNot={passOrNot} />

      <CategorySelector handleUserInfo={handleUserInfo} />
      {/* 약관 */}
      <TermForm handleUserInfo={handleUserInfo} passOrNot={passOrNot} />

      <S.LoginButton type="submit" disabled={showButton()}>
        동의하고 가입하기
      </S.LoginButton>
    </S.LoginFormLayOut>
  );
};

export default JoinForm;
