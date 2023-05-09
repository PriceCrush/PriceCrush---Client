import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import * as S from '@/components/stylecomponents/styles';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import HeaderGuard from './HeaderGuard';
import useScrollDirection from './../../hooks/useScrollDirection';
import { useRecoilValue } from 'recoil';

import Logout from '@/components/member/loginPage/Logout';
import { isLoggedInState } from '@/atoms/isLoggedInState';
import { useRouter } from 'next/router';

const Header = () => {
  const isScrollDown = useScrollDirection();
  const isLoginInValue = useRecoilValue(isLoggedInState);
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // functions
  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const goToSearchPage = () => {
    router.push({
      pathname: `/search`,
      query: {
        categoryId: 'all',
        searchTerm,
      },
    });
  };

  const handleSearchClick = (e: MouseEvent<SVGAElement>) => {
    if (searchTerm === '') {
      alert('검색어를 입력해주세요');
      return;
    }
    goToSearchPage();
  };

  const handleSearchEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchTerm === '') {
        alert('검색어를 입력해주세요');
        return;
      }
      goToSearchPage();
    }
  };

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
              <Link
                href={{
                  pathname: `/search`,
                  query: {
                    categoryId: 'all',
                  },
                }}
              >
                SHOP
              </Link>
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
          <input
            type="text"
            placeholder="상품명 검색"
            value={searchTerm}
            onChange={handleOnChangeInput}
            onKeyDown={handleSearchEnter}
          />
          <BsSearch className="search-icon" onClick={handleSearchClick} />
        </S.InputBox>
      </S.Header>
      <HeaderGuard />
    </>
  );
};

export default Header;
