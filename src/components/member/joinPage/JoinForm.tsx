import React, { useCallback, useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/memberControl.styles';
import MemberInputForm from '@/components/inputs/MemberInputForm';
import axios from 'axios';
import AddressForm from '@/components/member/joinPage/AddressForm';
import TermForm from '@/components/member/joinPage/TermForm';
import CategorySelector from '@/components/member/joinPage/CategorySelector';

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

  /**
   *
   * @description 회원가입 axios요청
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('/api/member/users', userInfo)
      .then(function (response) {
        console.log(response);
        //회원가입 완료 시 완료 메세지 보내고 로그인 화면으로 이동
      })
      .catch(function (error) {
        console.log(error);
        // 회원가입 안될시 에러 메세지
        // 잘못된 요청?
        // 이미 있을경우 그거만 표현
      });
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
      <AddressForm handleUserInfo={handleUserInfo} passOrNot={passOrNot} />

      {/* 약관 */}
      <TermForm handleUserInfo={handleUserInfo} passOrNot={passOrNot} />

      <CategorySelector handleUserInfo={handleUserInfo} />

      <S.LoginButton type="submit" disabled={showButton()}>
        동의하고 가입하기
      </S.LoginButton>
    </S.LoginFormLayOut>
  );
};

export default JoinForm;
