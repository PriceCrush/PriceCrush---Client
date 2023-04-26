import React from 'react';
import * as S from '@/components/stylecomponents/modals/productDetails/bidConfirm.style';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';

interface BidConfirmProps {
  bidPrice: number;
  bidFunction?: () => void;
}

const BidConfirm = ({ bidPrice, bidFunction }: BidConfirmProps) => {
  const { closeModal } = useModal();

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

  return (
    <S.BidConfirmLayout>
      <S.TextBox>
        <S.Title>닉네임님이 입력하신 금액은</S.Title>
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
