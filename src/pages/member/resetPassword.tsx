import React, { useState } from 'react';
import * as S from '@/components/stylecomponents/formbase.style';
import MemberInputForm from '@/components/inputs/MemberInputForm';

import { useModal } from '@/hooks/useModal';
import ReconfirmPassword from '@/components/member/reconfirmPassword';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState({
    password: '',
  });
  const [passwordError, setPasswordError] = useState(false);
  const { openModal } = useModal();
  const handlePassword = (e: any) => {
    setNewPassword(e);
  };

  const passOrNot = (e: any) => {
    setPasswordError(e);
  };

  /**
   * @description 비밀번호 변경 확인 모달
   */
  const handleResetPassword = (e: any) => {
    e.preventDefault();
    openModal({
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
