import React from 'react';
import * as S from '@/components/stylecomponents/styles';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import HeaderGuard from './HeaderGuard';

const Header = () => {
  return (
    <>
      <S.Header>
        <div>
          <Link href={'/'}>
            <S.LogoTitle>PriceCrush</S.LogoTitle>
          </Link>
        </div>
        <div>
          <div>SHOP</div>
          <div>로그인</div>
          <div>
            <BsSearch />
          </div>
        </div>
      </S.Header>
      <HeaderGuard />
    </>
  );
};

export default Header;
