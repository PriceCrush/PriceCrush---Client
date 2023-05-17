import React, { Dispatch, MouseEvent } from 'react';
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
  reloadTrigger?: Dispatch<React.SetStateAction<number>>;
}

const AuctionCardItem = ({
  isSelling,
  item,
  reloadTrigger,
}: AuctionCardItemProps) => {
  const { openModal } = useModal();
  const router = useRouter();

  const itemIsSelling = 'user' in item!;
  //funtions
  /**
   * @description 현재 가격으로 판매자가 경매를 종료하는 경우
   */
  const handleEndAuction = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if ('user' in item!) {
      openModal({
        content: (
          <EndAuction
            auctionId={String(item?.id)}
            currentPrice={Number(item?.start_price)}
            reloadTrigger={reloadTrigger}
          />
        ),
      });
    }
  };

  /**
   * @description 경매자체를 취소하는 경우
   */
  const handleCancelAuction = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModal({
      content: (
        <CancelAuction
          auctionId={String(item?.id)}
          reloadTrigger={reloadTrigger}
        />
      ),
    });
  };

  /**
   * @description 경매 아이템을 클릭했을 때 경매 상세 페이지로 이동
   */

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    if (item) {
      if ('user' in item) {
        router.push(`/auction/${item!.id}`);
      } else {
        router.push(`/auction/${item!.product.id}`);
      }
    }
  };

  //TODO: Props로 빋은 Item에 `product` 객체가 없고 item 객체 안에 `key`값들 존재, 현재 API 수정중인데 수정되면 이에 맞게 수정 해야할듯 함

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
          <S.CardTitle>
            {'user' in item! ? item.name : item!.product.name}
          </S.CardTitle>
        </S.CardInfoRow>
        <S.CardInfoRow>
          <S.CardPrice>
            {itemIsSelling
              ? translatePriceToKoreanWon(item.start_price)
              : translatePriceToKoreanWon(item!.price)}
          </S.CardPrice>
          <S.CardDate>
            {itemIsSelling
              ? `${item.start_date} ~ ${item.end_date}`
              : `${item?.product.start_date} ~ ${item?.product.end_date}`}
          </S.CardDate>
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
