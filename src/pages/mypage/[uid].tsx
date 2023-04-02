import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import AuctionCardItem from '@/components/myPage/AuctionCardItem';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';

const MyPage = () => {
  const [progressFilterValue, setProgressFilterValue] = useState('진행중');
  const [sellingBiddingFilterValue, setSellingBiddingFilterValue] =
    useState('입찰 상품');

  const handleSellingBiddingFilter = (
    e: React.MouseEvent<HTMLHeadingElement>
  ) => {
    e.preventDefault();
    /**
     * @typedef {"입찰 상품" | '판매 상품'} currentClickedFilterTitle
     */
    const currentClickedFilterTitle = e.currentTarget.textContent;
    if (currentClickedFilterTitle) {
      setSellingBiddingFilterValue(currentClickedFilterTitle);
    }
  };

  const handleProgessFilter = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    /**
     * @typedef {"입찰 상품" | '판매 상품'} currentClickedProgressFilterTitle
     */
    const currentClickedProgressFilterTitle = e.currentTarget.textContent;
    if (currentClickedProgressFilterTitle) {
      setProgressFilterValue(currentClickedProgressFilterTitle);
    }
  };

  return (
    <S.MyPageLayout>
      <S.PageTitle>마이 페이지</S.PageTitle>
      {/**
       * @description Filter 영역
       */}
      <S.FilterWrapper>
        <S.FilterCol>
          <S.FilterTitle
            onClick={handleSellingBiddingFilter}
            selected={sellingBiddingFilterValue === '입찰 상품'}
          >
            입찰 상품
          </S.FilterTitle>
          <S.FilterTitle
            onClick={handleSellingBiddingFilter}
            selected={sellingBiddingFilterValue === '판매 상품'}
          >
            판매 상품
          </S.FilterTitle>
        </S.FilterCol>
        <S.FilterCol>
          <S.FilterProgressTitle
            onClick={handleProgessFilter}
            selected={progressFilterValue === '진행중'}
          >
            진행중
          </S.FilterProgressTitle>
          <S.FilterTitle>|</S.FilterTitle>
          <S.FilterProgressTitle
            onClick={handleProgessFilter}
            selected={progressFilterValue === '종료됨'}
          >
            종료됨
          </S.FilterProgressTitle>
        </S.FilterCol>
      </S.FilterWrapper>
      {/**
       * @description 경매 상품 리스트 카드 영역
       */}
      <S.CardWrapper>
        <AuctionCardItem />
        <AuctionCardItem />
        <AuctionCardItem status="종료됨" />
      </S.CardWrapper>
    </S.MyPageLayout>
  );
};

export default MyPage;
