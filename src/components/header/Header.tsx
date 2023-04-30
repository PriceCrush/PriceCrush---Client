import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/styles';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import HeaderGuard from './HeaderGuard';
import useScrollDirection from './../../hooks/useScrollDirection';
import { useRecoilValue } from 'recoil';

import Logout from '@/components/member/loginPage/Logout';
import { isLoggedInState } from '@/atoms/isLoggedInState';

const Header = () => {
  const isScrollDown = useScrollDirection();

  const isLoginInValue = useRecoilValue(isLoggedInState);
  const [isLoginIn, setIsLoginIn] = useState(false);
  useEffect(() => {
    setIsLoginIn(isLoginInValue);
  }, [isLoginInValue]);

  return (
    <>
      <S.Header isScrollDown={isScrollDown}>
        <S.HeaderNavWrapper>
          <div>
            <Link href={'/'}>
              <S.LogoTitle>PriceCrush</S.LogoTitle>
            </Link>
          </div>
          <S.HeaderNavList>
            <S.HeaderNavItem>
              <Link href={'/search/all'}>SHOP</Link>
            </S.HeaderNavItem>

            <S.HeaderNavItem>
              <Link href={'/mypage/132'}>MY</Link>
            </S.HeaderNavItem>

            <S.HeaderNavItem>
              {isLoginIn ? (
                <Logout />
              ) : (
                <Link href={'/member/login'}>로그인</Link>
              )}
            </S.HeaderNavItem>
          </S.HeaderNavList>
        </S.HeaderNavWrapper>

        <S.InputBox>
          <input type="text" placeholder="상품명 검색" />
          <BsSearch className="search-icon" />
        </S.InputBox>
      </S.Header>
      <HeaderGuard />
    </>
  );
};

export default Header;
