import React from 'react';
import * as S from '@/components/stylecomponents/styles';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import HeaderGuard from './HeaderGuard';
import useScrollDirection from './../../hooks/useScrollDirection';

const Header = () => {
  const isScrollDown = useScrollDirection();

  return (
    <>
      <S.Header isScrollDown={isScrollDown}>
        <div>
          <div>
            <Link href={'/'}>
              <S.LogoTitle>PriceCrush</S.LogoTitle>
            </Link>
          </div>
          <div>
            <div>
              <Link href={'/mypage/132'}>마이(임시)</Link>
            </div>
            <div>
              <Link href={'/search/all'}>SHOP</Link>
            </div>
            <div>
              <Link href={'/member/login'}>로그인</Link>
            </div>
          </div>
        </div>
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
