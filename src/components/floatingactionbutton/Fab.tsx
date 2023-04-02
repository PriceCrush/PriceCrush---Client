import React from 'react';
import * as S from '@/components/stylecomponents/fab.style';
import { useRouter } from 'next/router';

const Fab = () => {
  const router = useRouter();
  const { pathname } = router;

  /**
   * @description /auth 경로에서는 FAB 버튼을 렌더링하지 않는다. (로그인, 회원가입 페이지)
   * @description /auction/create 경로에서는 FAB 버튼을 렌더링하지 않는다. (경매물품 등록 페이지)
   */
  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/auction/create') ||
    pathname.startsWith('/member/login') ||
    pathname.startsWith('/member/siginup')
  ) {
    return null;
  }

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
