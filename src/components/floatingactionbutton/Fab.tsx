import React, { useEffect, useState } from 'react';

import * as S from '@/components/stylecomponents/fab.style';
import { useRouter } from 'next/router';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isLoggedInState } from '@/components/member/loginPage/isLoggedInState';

const Fab = (accessToken: any) => {
  const router = useRouter();
  const { pathname } = router;
  const isLoginInValue = useRecoilValue(isLoggedInState);
  const [isLoginIn, setIsLoginIn] = useState(false);
  useEffect(() => {
    setIsLoginIn(isLoginInValue);
  }, [isLoginInValue]);

  /**
   * @description 로그인상태가 아닐 시 렌더링하지 않음
   */
  if (!isLoginIn) {
    return null;
  }
  /**
   * @description /auth 경로에서는 FAB 버튼을 렌더링하지 않는다. (로그인, 회원가입 페이지)
   * @description /auction/create 경로에서는 FAB 버튼을 렌더링하지 않는다. (경매물품 등록 페이지)
   */
  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/auction/create') ||
    pathname.startsWith(`/member`)
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
