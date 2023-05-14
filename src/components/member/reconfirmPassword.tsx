import React from 'react';
import * as S from '@/components/stylecomponents/modals/productDetails/bidConfirm.style';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import Router from 'next/router';
import styled from 'styled-components';
import { getCookie } from 'cookies-next';
import { Api } from '@/utils/commonApi';
import { resetPasswordApiCode } from '@/components/member/apiCodeMessage';

interface ReconfirmPasswordPorps {
  newPassword: string;
}

const ReconfirmPassword = (props: ReconfirmPasswordPorps) => {
  const { newPassword } = props;
  const { closeModal } = useModal();
  const MAIN_URL = '/';

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    type ButtonName = 'confirm' | 'cancel';
    const name = e.currentTarget.name as ButtonName;

    if (name === 'confirm') {
      const newPw = { password: `${newPassword}` };
      try {
        const result = await Api.patch(`users/reset/pw`, newPw);
        Router.push(`${MAIN_URL}`);
        console.log(result);
      } catch (error: any) {
        const { code } = error.response.status;
        const { title, message } = resetPasswordApiCode(code);
        console.log(error);
        alert(message);
        // 우선은 alert를 사용하고 차 후 모달은 쓰는 방법으로
        // 현재 컴포넌트가 모달안에 존재하기 때문에 부모 컴포넌트의 구조를 바꾼 후 해야하기때문에
        // 이곳에서 다시 모달을 띄울경우 오류발생
      }
      closeModal();
    } else if (name === 'cancel') {
      closeModal();
    } else {
      throw new Error('버튼 이름이 잘못되었습니다.');
    }
  };

  return (
    <S.BidConfirmLayout>
      <TextBox>
        <S.Title>
          새로 바꾸신 비밀번호는 <Highligt>{newPassword}</Highligt>입니다.
        </S.Title>
        <S.Title>정말로 비밀번호를 바꾸시겠습니까?</S.Title>
      </TextBox>
      <S.ButtonBox>
        <ButtonBase
          name="confirm"
          variant="positive"
          onClick={handleButtonClick}
        >
          확인
        </ButtonBase>
        <ButtonBase
          name="cancel"
          variant="negative"
          onClick={handleButtonClick}
        >
          취소
        </ButtonBase>
      </S.ButtonBox>
    </S.BidConfirmLayout>
  );
};

const Highligt = styled.span`
  color: ${({ theme }) => theme.color.DEEP_ORANGE};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 600;
`;

const TextBox = styled(S.TextBox)`
  > p {
    text-align: center;
  }
`;

export default ReconfirmPassword;
