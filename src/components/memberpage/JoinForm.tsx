import React, { useCallback, useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import MemberInputForm from '@/components/inputs/MemberInputForm';
import TermForm from './TermForm';
import AddressForm from './AddressForm';

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
    address: true,
    agreement_use: false,
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASEURL;
  const LOGIN_URL = '/'; //성공할때의 주소

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userInfo);
    console.log(userInfoErr);
  };

  // 이와 같이 수정하고 MemberInputForm의 형식을 바꿀경우엔 어떤식으로 바뀌는지 확인필요
  // const handleUserInfo = (e) => {
  //   const { name, value } = e.target;
  //   setUserInfo((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  //타입 잘 모르겠음
  const handleUserInfo = (e: any) => {
    setUserInfo(e);
  };
  //타입 잘 모르겠음
  const passOrNot = (e: any) => {
    setUserInfoErr(e);
  };
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

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    console.log(userInfoErr);
  }, [userInfoErr]);

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
      <MemberInputForm
        type="text"
        name="phone"
        handleUserInfo={handleUserInfo}
        passOrNot={passOrNot}
      >
        핸드폰
      </MemberInputForm>
      <MemberInputForm
        type="email"
        name="email"
        handleUserInfo={handleUserInfo}
        passOrNot={passOrNot}
      >
        이메일
      </MemberInputForm>

      {/* 주소 */}
      <AddressForm />

      {/* 약관 */}
      <TermForm handleUserInfo={handleUserInfo} passOrNot={passOrNot} />

      <S.LoginButton type="submit" disabled={showButton()}>
        동의하고 가입하기
      </S.LoginButton>
    </S.LoginFormLayOut>
  );
};

export default JoinForm;
