import React from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import { useTimeDiff } from '@/hooks/useTimeDiff';
import AuctionDetailCarousel from '../carousel/AuctionDetailCarousel';
import { ProductDetailsProps, ProductFromApi } from '@/types/productsTypes';
import { currentProductState } from '@/atoms/currentProductState';
import { useRecoilState } from 'recoil';

const LeftSection = () => {
  const [currentProductAtom, setCurrentProductAtom] =
    useRecoilState(currentProductState);

  const timeDiff = useTimeDiff(
    String(currentProductAtom.productData!.end_date)
  );
  return (
    <S.DetailLeftSection>
      <AuctionDetailCarousel
        images={
          currentProductAtom.productData!.productImage.length > 0
            ? currentProductAtom.productData?.productImage
            : null
        }
      />
      <S.DetailLeftSectionRow>
        <S.TimeDiffBox>
          <h3>남은 시간</h3>
          <span className="timeRemain">{timeDiff}</span>
        </S.TimeDiffBox>
      </S.DetailLeftSectionRow>
    </S.DetailLeftSection>
  );
};

export default LeftSection;
