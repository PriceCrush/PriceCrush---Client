import React from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import AuctionForm from './AuctionForm';
import { ProductFromApi } from '@/types/productsTypes';
import { useRecoilState } from 'recoil';
import { currentProductState } from '@/atoms/currentProductState';

interface RightSectionProps {
  productData: ProductFromApi;
  currentPrice: number;
  isAuctionStarted: boolean;
  formattedInputBidPrice: string;
  handleBidButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCustomBidPriceInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RightSection = ({ currentPrice }: RightSectionProps) => {
  const [currentProductAtom, setCurrentProductAtom] =
    useRecoilState(currentProductState);

  return (
    <S.DetailRightSection>
      {/**
       * 상품명, 아이콘 섹션
       */}
      <S.DetailNameBox>
        <S.NameText>{currentProductAtom.productData!.name}</S.NameText>
      </S.DetailNameBox>
      {/**
       * 판매가, 입찰 영역
       */}
      <S.PriceBox>
        <S.PriceText>
          {translatePriceToKoreanWon(
            currentPrice
              ? currentPrice
              : currentProductAtom.productData!.start_price,
            true
          )}
          ~
        </S.PriceText>

        <AuctionForm />
      </S.PriceBox>
      <S.DetailDescBox>
        <S.NameText>상품 설명</S.NameText>
        <span>{currentProductAtom.productData!.desc}</span>
      </S.DetailDescBox>
    </S.DetailRightSection>
  );
};

export default RightSection;
