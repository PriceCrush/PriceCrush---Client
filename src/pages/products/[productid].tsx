import { useRouter } from 'next/router';
import React from 'react';
import * as S from '@/components/stylecomponents/styles';

const ProductDetail = () => {
  const router = useRouter();

  return (
    <S.DetailPageLayout>
      <S.DetailImageSection>이미지</S.DetailImageSection>
      <S.DetailDescSection>설명</S.DetailDescSection>
    </S.DetailPageLayout>
  );
};

export default ProductDetail;
