import React from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import Image from 'next/image';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import ButtonBase from '../buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import EndAuction from '../modals/mypage/EndAuction';
import CancelAuction from '../modals/mypage/CancelAuction';

interface AuctionCardItemProps {
  id?: number;
  title?: string;
  price?: number;
  date?: string;
  isSelling?: boolean;
  status?: string;
}

const AuctionCardItem = ({
  id,
  title = '테스트 경매 상품',
  price = 1000000,
  date = '2021.08.01 ~ 2021.08.31',
  isSelling = true,
  status = '진행중',
}: AuctionCardItemProps) => {
  const { openModal } = useModal();

  const handleEndAuction = () => {
    openModal({
      content: <EndAuction productId={String(id)} />,
    });
  };

  const handleCancelAuction = () => {
    openModal({
      content: <CancelAuction />,
    });
  };

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
        {isSelling && status === '진행중' ? (
          <>
            <ButtonBase
              variant="endAuction"
              fullWidth
              onClick={handleEndAuction}
            >
              경매 종료
            </ButtonBase>
            <ButtonBase
              variant="cancelAuction"
              fullWidth
              onClick={handleCancelAuction}
            >
              경매 취소
            </ButtonBase>
          </>
        ) : (
          <S.CardStatus>{status}</S.CardStatus>
        )}
      </S.CardStatusBox>
    </S.AuctionCardItemLayout>
  );
};

export default AuctionCardItem;
