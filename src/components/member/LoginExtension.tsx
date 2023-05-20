import axios from 'axios';
import { getCookie } from 'cookies-next';
import * as S from '@/components/stylecomponents/modals/productDetails/bidConfirm.style';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';

import React from 'react';
import styled from 'styled-components';

const LoginExtension = () => {
  const { closeModal } = useModal();

  const testSubmit = async (e: any) => {
    e.preventDefault();
    const test_API_URL = '/api/member/refreshApi';

    //기존
    await axios
      .post(test_API_URL, {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const dd = () => {
    console.log('logOut');
  };

  return (
    <S.BidConfirmLayout>
      <TextBox>
        <S.Title>로그인을 연장하시겠습니까?</S.Title>
      </TextBox>
      <S.ButtonBox>
        <ButtonBase name="confirm" variant="positive" onClick={testSubmit}>
          로그인 유지
        </ButtonBase>
        <ButtonBase name="cancel" variant="negative" onClick={dd}>
          로그 아웃
        </ButtonBase>
      </S.ButtonBox>
    </S.BidConfirmLayout>
  );
};

const TextBox = styled(S.TextBox)`
  > p {
    text-align: center;
  }
`;

export default LoginExtension;
