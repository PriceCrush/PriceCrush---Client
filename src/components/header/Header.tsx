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
import { userCommonDataState } from '@/atoms/isLoggedInState';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

const Header = () => {
  const isScrollDown = useScrollDirection();
  const isLoginInValue = useRecoilValue(isLoggedInState);
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { uid } = useRecoilValue(userCommonDataState);

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
    setSearchTerm('');
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

  // effects

  useEffect(() => {
    setIsLoginIn(isLoginInValue);
  }, [isLoginInValue]);

  useEffect(() => {
    // 라우팅 될 때마다 검색어 초기화
    const handleRouteChangeComplete = () => {
      setSearchTerm('');
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

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
              <Link
                href={isLoginIn && uid ? `/mypage/${uid}` : '/member/login'}
              >
                MY
              </Link>
            </S.HeaderNavItem>

            <S.HeaderNavItem>
              {isLoginIn && uid ? (
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
