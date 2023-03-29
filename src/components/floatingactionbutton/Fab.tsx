import React from 'react';
import * as S from '@/components/stylecomponents/fab.style';
import { useRouter } from 'next/router';

const Fab = () => {
  const router = useRouter();
  return (
    <S.FabLayout
      size="lg"
      title="경매물품 등록"
      onClick={() => router.push('/auction/create')}
    >
      +
    </S.FabLayout>
  );
};

export default Fab;
