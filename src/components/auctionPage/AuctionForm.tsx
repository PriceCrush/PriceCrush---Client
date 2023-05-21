import React, { useEffect } from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import ButtonBase from '@/components/buttons/ButtonBase';
import InputBase from '@/components/inputs/InputBase';
import { currentProductState } from '@/atoms/currentProductState';
import { useRecoilValue } from 'recoil';

const AuctionForm = () => {
  const currentProductAtom = useRecoilValue(currentProductState);

  useEffect(() => {
    console.log(currentProductAtom);
  }, [currentProductAtom]);

  return (
    <S.AuctionFormLayout>
      {currentProductAtom!.available && (
        <>
          <InputBase
            placeholder="입찰 금액을 입력하세요."
            onChange={currentProductAtom!.handleCustomBidPriceInput}
            value={currentProductAtom!.formattedInputBidPrice!}
          />
          <ButtonBase
            variant="warning"
            size="md"
            onClick={currentProductAtom!.handleBidButtonClick}
            name="customPriceBid"
          >
            입찰
          </ButtonBase>
          <ButtonBase
            variant="error"
            size="md"
            onClick={currentProductAtom!.handleBidButtonClick}
            name="staticPriceBid"
          >
            +{Number(currentProductAtom.productData?.minBidPrice) * 100}%
          </ButtonBase>
        </>
      )}
      {!currentProductAtom!.available && (
        <S.NotAvailableBox>
          <span>
            {`${currentProductAtom.productData!.start_date.substring(
              0,
              10
            )} 부터 ${currentProductAtom.productData!.end_date.substring(
              0,
              10
            )} 까지 참여할 수 있습니다.`}
          </span>
        </S.NotAvailableBox>
      )}
    </S.AuctionFormLayout>
  );
};

export default AuctionForm;
