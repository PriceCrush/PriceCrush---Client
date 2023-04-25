import React, { useEffect } from 'react';
import * as S from '@/components/stylecomponents/styles';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import HeaderGuard from './HeaderGuard';
import useScrollDirection from './../../hooks/useScrollDirection';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState } from '@/components/member/loginPage/isLoggedInState';
import Logout from '@/components/member/loginPage/Logout';

const Header = () => {
  const isScrollDown = useScrollDirection();

  const isLoginIn = useRecoilValue(isLoggedInState);

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
