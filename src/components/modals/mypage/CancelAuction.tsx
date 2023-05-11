import React, { Dispatch } from 'react';
import * as S from '@/components/stylecomponents/cancelAuction.style';
import { BsExclamationTriangleFill } from 'react-icons/bs';
import COLOR from '@/colors/color';
import ButtonBase from '@/components/buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import { Api } from '@/utils/commonApi';

interface CancelAuctionProps {
  auctionId: string;
  reloadTrigger?: Dispatch<React.SetStateAction<number>>;
}

const CancelAuction = ({ auctionId, reloadTrigger }: CancelAuctionProps) => {
  const { closeModal } = useModal();

  const handleCancleYes = async () => {
    const result = await Api.delete(`auction`, {
      params: {
        id: auctionId,
      },
    });
    // [uid].tsx의 데이터 새로고침
    reloadTrigger && reloadTrigger((prev) => prev + 1);

    console.log(result);
    try {
    } catch (error) {
      alert(error);
      console.log(error);
    }

    closeModal();
  };

  return (
    <S.CancelAuctionLayout>
      <BsExclamationTriangleFill size={'70%'} fill={COLOR.DEEP_ORANGE} />
      <S.DescriptionBox>
        <S.DescriptionText>정말 경매를 취소하시겠습니까?</S.DescriptionText>
      </S.DescriptionBox>
      <S.ButtonBox>
        <ButtonBase variant="warning" onClick={handleCancleYes}>
          네
        </ButtonBase>
        <ButtonBase variant="default" onClick={closeModal}>
          아니오
        </ButtonBase>
      </S.ButtonBox>
    </S.CancelAuctionLayout>
  );
};

export default CancelAuction;
