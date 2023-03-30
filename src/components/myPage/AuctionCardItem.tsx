import React from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import Image from 'next/image';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';

interface AuctionCardItemProps {
  title?: string;
  price?: number;
  date?: string;
  status?: '진행중' | '종료됨';
}

const AuctionCardItem = ({
  title = '테스트 경매 상품',
  price = 1000000,
  date = '2021.08.01 ~ 2021.08.31',
  status = '진행중',
}: AuctionCardItemProps) => {
  return (
    <S.AuctionCardItemLayout>
      <S.CardImageBox>
        <Image
          alt="경매 아이템 이미지"
          title="경매 아이템 이미지"
          src="/images/temp.jpeg"
          fill
          sizes="30vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </S.CardImageBox>
      <S.CardInfoBox>
        <S.CardInfoRow>
          <S.CardTitle>{title}</S.CardTitle>
        </S.CardInfoRow>
        <S.CardInfoRow>
          <S.CardPrice>{translatePriceToKoreanWon(price)}</S.CardPrice>
          <S.CardDate>{date}</S.CardDate>
        </S.CardInfoRow>
      </S.CardInfoBox>
      <S.CardStatusBox>
        <S.CardStatus>{status}</S.CardStatus>
      </S.CardStatusBox>
    </S.AuctionCardItemLayout>
  );
};

export default AuctionCardItem;
