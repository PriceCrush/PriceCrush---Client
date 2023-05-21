
import React, { useEffect, useState } from 'react';


import * as S from '@/components/stylecomponents/productDetail.style';
import ButtonBase from '@/components/buttons/ButtonBase';
import InputBase from '@/components/inputs/InputBase';
import { currentProductState } from '@/atoms/currentProductState';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userCommonDataState } from '@/atoms/isLoggedInState';
import { Router, useRouter } from 'next/router';

const AuctionForm = () => {
  const currentProductAtom = useRecoilValue(currentProductState);
  const isLoginInValue = useRecoilValue(isLoggedInState);
  const [isLoginIn, setIsLoginIn] = useState(false);
  const { uid } = useRecoilValue(userCommonDataState);
  const router = useRouter();

  const handleAuctionBtn = () => {
    return (
      isLoginIn && uid
        ? currentProductAtom!.handleBidButtonClick
        : alert('로그인 필요한 서비스입니다.'),
      router.push('/member/login')
    );
  };

  useEffect(() => {
    setIsLoginIn(isLoginInValue);
  }, [isLoginInValue]);

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
            onClick={handleAuctionBtn}
            name="customPriceBid"
          >
            입찰
          </ButtonBase>
          <ButtonBase
            variant="error"
            size="md"
            onClick={handleAuctionBtn}
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
