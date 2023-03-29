import React, { useEffect } from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import AuctionCardItem from '@/components/myPage/AuctionCardItem';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';

const MyPage = () => {
  return (
    <S.MyPageLayout>
      <S.PageTitle>마이 페이지</S.PageTitle>
      {/**
       * @description Filter 영역
       */}
      <S.FilterWrapper>
        <S.FilterCol>
          <S.FilterTitle>입찰 상품</S.FilterTitle>
          <S.FilterTitle>판매 상품</S.FilterTitle>
        </S.FilterCol>
        <S.FilterCol>
          <S.FilterTitle>진행중</S.FilterTitle>
          <S.FilterTitle>|</S.FilterTitle>
          <S.FilterTitle>종료됨</S.FilterTitle>
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
