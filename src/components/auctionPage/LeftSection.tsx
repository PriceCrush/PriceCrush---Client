import React from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import { useTimeDiff } from '@/hooks/useTimeDiff';
import AuctionDetailCarousel from '../carousel/AuctionDetailCarousel';
import { currentProductState } from '@/atoms/currentProductState';
import { useRecoilValue } from 'recoil';

const LeftSection = () => {
  const currentProduct = useRecoilValue(currentProductState);

  const timeDiff = useTimeDiff(String(currentProduct.productData!.end_date));
  return (
    <S.DetailLeftSection>
      <AuctionDetailCarousel
        images={
          currentProduct.productData!.productImage.length > 0
            ? currentProduct.productData?.productImage
            : null
        }
      />
      <S.DetailLeftSectionRow>
        <S.TimeDiffBox>
          {currentProduct.available ? (
            <>
              {' '}
              <h3>남은 시간</h3>
              <span className="timeRemain">{timeDiff}</span>
            </>
          ) : (
            <S.NotAvailableBox>
              <span>현재 경매가 진행중이 아닙니다.</span>
            </S.NotAvailableBox>
          )}
        </S.TimeDiffBox>
      </S.DetailLeftSectionRow>
    </S.DetailLeftSection>
  );
};

export default LeftSection;
