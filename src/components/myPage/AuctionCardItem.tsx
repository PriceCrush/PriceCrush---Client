import React, { MouseEvent } from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import Image from 'next/image';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import ButtonBase from '../buttons/ButtonBase';
import { useModal } from '@/hooks/useModal';
import EndAuction from '../modals/mypage/EndAuction';
import CancelAuction from '../modals/mypage/CancelAuction';
import { MyAuctionItem } from '@/types/myAuctionItemsTypes';
import { useRouter } from 'next/router';

interface AuctionCardItemProps {
  isSelling?: boolean;
  item?: MyAuctionItem;
}

const AuctionCardItem = ({ isSelling, item }: AuctionCardItemProps) => {
  const { openModal } = useModal();
  const router = useRouter();

  //funtions
  /**
   * @description 현재 가격으로 판매자가 경매를 종료하는 경우
   */
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

  /**
   * @description 경매자체를 취소하는 경우
   */
  const handleCancelAuction = () => {
    openModal({
      content: <CancelAuction auctionId={String(item?.id)} />,
    });
  };

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    if (item) {
      console.log(item!.id);
      router.push(`/auction/${item!.product.id}`);
    }
  };

  return (
    <S.AuctionCardItemLayout onClick={handleCardClick}>
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
