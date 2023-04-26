import React from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import ButtonBase from '@/components/buttons/ButtonBase';
import InputBase from '@/components/inputs/InputBase';

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
  return (
    <S.AuctionFormLayout>
      {available && (
        <>
          <InputBase
            placeholder="입찰 금액을 입력하세요."
            onChange={handleCustomBidPriceInput}
            value={formattedInputBidPrice}
          />
          <ButtonBase
            variant="warning"
            size="md"
            onClick={handleBidButtonClick}
            name="customPriceBid"
          >
            입찰
          </ButtonBase>
          <ButtonBase
            variant="error"
            size="md"
            onClick={handleBidButtonClick}
            name="staticPriceBid"
          >
            +?%
          </ButtonBase>
        </>
      )}
      {!available && (
        <S.NotAvailableBox>
          <span>{startDate.substring(0, 10)} 부터 참여할 수 있습니다.</span>
        </S.NotAvailableBox>
      )}
    </S.AuctionFormLayout>
  );
};

export default AuctionForm;
