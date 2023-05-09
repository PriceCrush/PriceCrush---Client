import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/modals/productDetails/bidConfirm.style';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userCommonDataState } from '@/atoms/isLoggedInState';
import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

interface BidConfirmProps {
  bidPrice: number;
  bidFunction?: () => void;
}

const BidConfirm = ({ bidPrice, bidFunction }: BidConfirmProps) => {
  const { closeModal } = useModal();
  const isLoginInValue = useRecoilValue(isLoggedInState);

  useEffect(() => {
    //로그인이 필요한 서비스 입니다. 로그인 페이지로 이동합니다.라는 모달을 추가해야하나?
    if (!isLoginInValue) {
      const LOGIN_URL = '/member/login';
      closeModal();
      Router.push(LOGIN_URL);
    }
  }, [isLoginInValue, closeModal]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    type ButtonName = 'confirm' | 'cancel';
    const name = e.currentTarget.name as ButtonName;

    if (name === 'confirm') {
      //입찰하는 API 호출
      bidFunction && bidFunction();
      closeModal();
    } else if (name === 'cancel') {
      closeModal();
    } else {
      throw new Error('버튼 이름이 잘못되었습니다.');
    }
  };

  const userCommonDataStateAtom = useRecoilValue(userCommonDataState);

  return (
    <S.BidConfirmLayout>
      <S.TextBox>
        <S.Title>{userCommonDataStateAtom.name}님이 입력하신 금액은</S.Title>
        <S.Price>
          <strong>{translatePriceToKoreanWon(bidPrice, true)}</strong>원 입니다
        </S.Price>
      </S.TextBox>
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

export default BidConfirm;
