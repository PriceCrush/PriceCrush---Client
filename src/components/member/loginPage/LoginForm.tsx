import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import Link from 'next/link';
import MemberInputForm from '@/components/inputs/MemberInputForm';
import { useRecoilState } from 'recoil';
import {
  isLoggedInState,
  userCommonDataState,
  userPrivateDataState,
} from '@/atoms/isLoggedInState';
import { useModal } from '@/hooks/useModal';
import CommonMessage from '@/components/modals/member/CommonMessage';
import { loginErrorCode } from '@/components/member/apiCodeMessage';

const LoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [loginErr, setLoginErr] = useState({
    email: false,
    password: false,
  });

  const [isLoggedInAtomAtom, setIsLoggedInAtom] =
    useRecoilState(isLoggedInState);
  const [userCommonDataAtom, setUserCommonDataAtom] =
    useRecoilState(userCommonDataState);
  const [userPrivateDataAtom, setUserPrivateDataAtom] =
    useRecoilState(userPrivateDataState);

  const router = useRouter();
  const { openModal } = useModal();
  /**
   * @description 로그인 axios요청
   * @param e submitEvent
   */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post('/api/member/loginApi', loginInfo)
      .then(function (response) {
        const { data } = response;
        const { user } = data;
        setIsLoggedInAtom(true);
        setUserCommonDataAtom({
          email: user.email,
          name: user.name,
          nickname: user.nickname,
        });
        setUserPrivateDataAtom({
          address: user.address,
          phone: user.phone,
        });
        //로그인 이전 페이지로 이동
        router.back();
      })
      .catch(function (error) {
        const { title, message } = loginErrorCode(error.response.status);
        openModal({
          content: (
            <>
              <CommonMessage title={title}>{message}</CommonMessage>
            </>
          ),
        });
        console.log(error.response.data.message);
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
