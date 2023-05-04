import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/formbase.style';
import MemberInputForm from '@/components/inputs/MemberInputForm';

import { useModal } from '@/hooks/useModal';
import ReconfirmPassword from '@/components/member/reconfirmPassword';

// recoil로 관리할 수 있긴 한데 굳이 그렇게 해야하나? 약간 애매한디?
// 이거는 my페이지에 넣는게 좋을꺼 같은데 어떻게 넣을지는 생각을 해봐야할듯?

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState({
    password: '',
  });
  const [passwordError, setPasswordError] = useState(false);
  const { openModal } = useModal();

  // Router.push(`${MAIN_URL}`);

  const handlePassword = (e: any) => {
    setNewPassword(e);
  };

  const passOrNot = (e: any) => {
    setPasswordError(e);
  };

  const handleResetPassword = (e: any) => {
    e.preventDefault();
    openModal({
      title: '',
      content: <ReconfirmPassword newPassword={newPassword.password} />,
    });
  };
  return (
    <S.Wrapper>
      <S.LogoTitle>비밀번호 재설정</S.LogoTitle>
      <S.HelpNoticeSection>
        <span>새로운 비밀번호를 입력해주세요.</span>
      </S.HelpNoticeSection>
      <S.FormLayOut>
        <MemberInputForm
          type="text"
          name="password"
          handleUserInfo={handlePassword}
          passOrNot={passOrNot}
        >
          비밀번호
        </MemberInputForm>
        <S.FormButton type="submit" onClick={handleResetPassword}>
          비밀번호 재설정 하기
        </S.FormButton>
      </S.FormLayOut>
    </S.Wrapper>
  );
};

export default ResetPassword;
