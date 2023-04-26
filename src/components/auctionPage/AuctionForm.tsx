import React from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import ButtonBase from '@/components/buttons/ButtonBase';
import InputBase from '@/components/inputs/InputBase';
import { useTimeDiff } from '@/hooks/useTimeDiff';

interface AuctionFormProps {
  available: boolean;
  handleCustomBidPriceInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBidButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  formattedInputBidPrice: string;
  startDate: string;
}

const AuctionForm = ({
  available,
  formattedInputBidPrice,
  handleCustomBidPriceInput,
  handleBidButtonClick,
  startDate,
}: AuctionFormProps) => {
  const auctionStartTimeDiff = useTimeDiff(startDate);

  return (
    <S.AuctionFormLayout>
      {available && (
        <>
          <InputBase
            fullWidth
            placeholder="입찰 금액을 입력하세요."
            onChange={handleCustomBidPriceInput}
            value={formattedInputBidPrice}
          />
          <ButtonBase
            variant="warning"
            size="lg"
            onClick={handleBidButtonClick}
            name="customPriceBid"
          >
            입찰
          </ButtonBase>
          <ButtonBase
            variant="error"
            size="lg"
            onClick={handleBidButtonClick}
            name="staticPriceBid"
          >
            +최소입찰가격
          </ButtonBase>
        </>
      )}
      {!available && <div>{auctionStartTimeDiff} 후에 참여할 수 있습니다.</div>}
    </S.AuctionFormLayout>
  );
};

export default AuctionForm;
