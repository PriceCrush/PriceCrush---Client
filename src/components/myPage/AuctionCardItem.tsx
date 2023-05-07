import React from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import Image from 'next/image';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import ButtonBase from '../buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import EndAuction from '../modals/mypage/EndAuction';
import CancelAuction from '../modals/mypage/CancelAuction';
import { MyAuctionItem } from '@/types/myAuctionItemsTypes';

interface AuctionCardItemProps {
  isSelling?: boolean;
  item?: MyAuctionItem;
}

const AuctionCardItem = ({ isSelling, item }: AuctionCardItemProps) => {
  const { openModal } = useModal();

  const handleEndAuction = () => {
    openModal({
      content: (
        <EndAuction
          auctionId={String(item?.id)}
          currentPrice={Number(item?.price)}
        />
      ),
    });
  };

  const handleCancelAuction = () => {
    openModal({
      content: <CancelAuction auctionId={String(item?.id)} />,
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
          <S.CardTitle>{item?.product.name}</S.CardTitle>
        </S.CardInfoRow>
        <S.CardInfoRow>
          <S.CardPrice>{translatePriceToKoreanWon(item?.price!)}</S.CardPrice>
          <S.CardDate>{`${item?.product.start_date} ~ ${item?.product.end_date}`}</S.CardDate>
        </S.CardInfoRow>
      </S.CardInfoBox>
      <S.CardStatusBox>
        {isSelling ? (
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
        ) : null}
      </S.CardStatusBox>
    </S.AuctionCardItemLayout>
  );
};

export default AuctionCardItem;
