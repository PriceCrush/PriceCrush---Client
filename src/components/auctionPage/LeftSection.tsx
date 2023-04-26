import React from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import { useTimeDiff } from '@/hooks/useTimeDiff';
import AuctionDetailCarousel from '../carousel/AuctionDetailCarousel';
import { ProductDetailsProps, ProductFromApi } from '@/types/productsTypes';

interface LeftSectionProps {
  productData: ProductFromApi;
  tempData: ProductDetailsProps;
}

const LeftSection = ({ productData, tempData }: LeftSectionProps) => {
  const timeDiff = useTimeDiff(String(productData.end_date));
  return (
    <S.DetailLeftSection>
      <AuctionDetailCarousel images={tempData.images} />
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
