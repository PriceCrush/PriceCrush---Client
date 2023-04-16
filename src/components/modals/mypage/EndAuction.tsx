import React from 'react';
import * as S from '@/components/stylecomponents/endAuction.style';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import COLOR from '@/colors/color';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import { Api } from '@/utils/commonApi';

interface EndAuctionProps {
  productId: string | number;
}

const EndAuction = ({ productId }: EndAuctionProps) => {
  const { closeModal } = useModal();

  const handleClickYes = async () => {
    //TODO: 경매 종료 API 호출
    //TODO: API 확인 필요
    try {
      const result = await Api.delete(`product/${productId}`);
    } catch (error) {
      alert('경매 종료에 실패했습니다. 다시 시도해주세요.');
      console.log(error);
    }
    closeModal();
  };

  return (
    <S.EndAuctionLayout>
      <BsExclamationTriangleFill size={'30%'} fill={COLOR.DEEP_ORANGE} />
      <S.DescriptionBox>
        <S.DescriptionText>현재 가격으로</S.DescriptionText>
        <S.DescriptionText>경매를 종료하시겠습니까?</S.DescriptionText>
        <S.PriceText>100000000원</S.PriceText>
      </S.DescriptionBox>
      <S.ButtonBox>
        <ButtonBase variant="warning" onClick={handleClickYes}>
          네
        </ButtonBase>
        <ButtonBase variant="default" onClick={closeModal}>
          아니오
        </ButtonBase>
      </S.ButtonBox>
    </S.EndAuctionLayout>
  );
};

export default EndAuction;
