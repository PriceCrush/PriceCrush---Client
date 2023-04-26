import React from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import AuctionForm from './AuctionForm';
import { ProductFromApi } from '@/types/productsTypes';

interface RightSectionProps {
  productData: ProductFromApi;
  currentPrice: number;
  isAuctionStarted: boolean;
  formattedInputBidPrice: string;
  handleBidButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCustomBidPriceInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RightSection = ({
  productData,
  currentPrice,
  formattedInputBidPrice,
  handleBidButtonClick,
  handleCustomBidPriceInput,
  isAuctionStarted,
}: RightSectionProps) => {
  return (
    <S.DetailRightSection>
      {/**
       * 상품명, 아이콘 섹션
       */}
      <S.DetailNameBox>
        <S.NameText>{productData.name}</S.NameText>
      </S.DetailNameBox>
      {/**
       * 판매가, 입찰 영역
       */}
      <S.PriceBox>
        <S.PriceText>
          {translatePriceToKoreanWon(
            currentPrice ? currentPrice : productData.start_price,
            true
          )}
          ~
        </S.PriceText>

        <AuctionForm
          available={isAuctionStarted}
          formattedInputBidPrice={formattedInputBidPrice}
          handleBidButtonClick={handleBidButtonClick}
          handleCustomBidPriceInput={handleCustomBidPriceInput}
          startDate={productData.start_date}
        />
      </S.PriceBox>
      <S.DetailDescBox>
        <S.NameText>상품 설명</S.NameText>
        <span>{productData.desc}</span>
      </S.DetailDescBox>
    </S.DetailRightSection>
  );
};

export default RightSection;
