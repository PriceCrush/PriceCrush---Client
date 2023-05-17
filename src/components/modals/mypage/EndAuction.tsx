import React, { Dispatch } from 'react';
import * as S from '@/components/stylecomponents/endAuction.style';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import COLOR from '@/colors/color';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import { Api } from '@/utils/commonApi';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';

interface EndAuctionProps {
  auctionId: string | number;
  currentPrice: number;
  reloadTrigger?: Dispatch<React.SetStateAction<number>>;
}

const EndAuction = ({
  auctionId,
  currentPrice,
  reloadTrigger,
}: EndAuctionProps) => {
  const { closeModal } = useModal();
  const priceKoreanWon = translatePriceToKoreanWon(currentPrice);

  const handleClickYes = async () => {
    // auctionId는 현재 경매중인 상품의 id, prductId와는 다름
    try {
      const result = await Api.patch(`auction`, {
        id: auctionId,
      });
      // [uid].tsx의 데이터 새로고침
      reloadTrigger && reloadTrigger((prev) => prev + 1);
      console.log(result);
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
        <S.PriceText>{priceKoreanWon}</S.PriceText>
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
