import React from 'react';
import * as S from '@/components/stylecomponents/modals/productDetails/bidConfirm.style';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import Router from 'next/router';
import styled from 'styled-components';
import { getCookie } from 'cookies-next';
import { Api } from '@/utils/commonApi';
import { resetPasswordApiCode } from '@/components/member/apiCodeMessage';
import axios from 'axios';
import { FormDataApi } from '@/utils/formDataApi';
import { useRecoilValue } from 'recoil';
import { userCommonDataState } from '@/atoms/isLoggedInState';

interface ReconfirmPasswordPorps {
  productData: any;
}

const RegistrationConfirmation = (props: ReconfirmPasswordPorps) => {
  const { productData } = props;
  const { closeModal } = useModal();
  const { uid } = useRecoilValue(userCommonDataState);
  const MY_URL = `/mypage/${uid}`;
  /**
   * @description 비밀번호 변경, axios요청
   */
  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    type ButtonName = 'confirm' | 'cancel';
    const name = e.currentTarget.name as ButtonName;

    if (name === 'confirm') {
      try {
        const response = await FormDataApi.post('/product', productData);
        Router.push(`${MY_URL}`);

        console.log(response);
      } catch (error: any) {
        // const { code } = error.response.status;
        // const { message } = resetPasswordApiCode(code);
        console.log(error);
        // alert(message);
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
        <S.Title>현재 상품을 등록하시겠습니까??</S.Title>
      </TextBox>
      <S.ButtonBox>
        <ButtonBase
          name="confirm"
          variant="positive"
          onClick={handleButtonClick}
        >
          등록
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

export default RegistrationConfirmation;
