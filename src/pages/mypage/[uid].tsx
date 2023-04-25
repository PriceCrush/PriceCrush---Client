import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import AuctionCardItem from '@/components/myPage/AuctionCardItem';
import { GetServerSidePropsContext } from 'next';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@/components/member/loginPage/isLoggedInState';
import { useRouter } from 'next/router';

interface TempServerSideProps {
  tempData: {
    id: number;
    title: string;
    price: number;
    date: string;
    isSelling: boolean;
    status: string;
  }[];
}

/**
 * @description 클라이언트에서 tempDate를 생섬하고 처리하면 Hydration Mismatch 에러가 발생함
 * @description 임시로 서버에서 데이터를 받아서 처리해야함
 * @param context
 * @returns
 */
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  console.log(context.params);

  /**
   * @description 로그인이 안된 상태에서 접근 시 로그인 페이지로 이동
   */
  const { accessToken } = context.req.cookies;
  if (!accessToken) {
    return {
      redirect: {
        destination: '/member/login',
        permanent: false,
      },
    };
  }

  /**
   * @description 임시 데이터 나중에 지워짐
   * @description 입찰 상품 / 판매 상품 동작 확인을 위함
   */
  const tempData = Array.from({ length: 15 }, (v, i) => {
    const title = '테스트 경매 상품';
    const price = Math.floor(Math.random() * 1000000) + 10000;
    const date = `2021.08.01 ~ 2021.08.31`;
    const isSelling = Math.random() > 0.5;
    const status = Math.random() > 0.5 ? '진행중' : '종료됨';
    return {
      id: i + 1,
      title,
      price,
      date,
      isSelling,
      status,
    };
  });

  return {
    props: {
      tempData,
    },
  };
};

const MyPage = ({ tempData }: TempServerSideProps) => {
  const [progressFilterValue, setProgressFilterValue] = useState('진행중');
  const [sellingBiddingFilterValue, setSellingBiddingFilterValue] =
    useState('입찰 상품');
  const [myAuctionItems, setMyAuctionItems] = useState(tempData);
  const [filteredMyAuctionItems, setFilteredMyAuctionItems] =
    useState(tempData);

  const isLoginIn = useRecoilValue(isLoggedInState); //로그인 유무
  const router = useRouter();

  const handleSellingBiddingFilter = (
    e: React.MouseEvent<HTMLHeadingElement>
  ) => {
    e.preventDefault();
    /**
     * @typedef {"입찰 상품" | '판매 상품'} currentClickedFilterTitle
     */
    const currentClickedFilterTitle = e.currentTarget.textContent;
    if (currentClickedFilterTitle) {
      setSellingBiddingFilterValue(currentClickedFilterTitle);
    }
  };

  const handleProgessFilter = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    /**
     * @typedef {"입찰 상품" | '판매 상품'} currentClickedProgressFilterTitle
     */
    const currentClickedProgressFilterTitle = e.currentTarget.textContent;
    if (currentClickedProgressFilterTitle) {
      setProgressFilterValue(currentClickedProgressFilterTitle);
    }
  };

  useEffect(() => {
    const updatedFilteredMyAuctionItems = myAuctionItems.filter(
      (item) =>
        item.status === progressFilterValue &&
        ((sellingBiddingFilterValue === '입찰 상품' && !item.isSelling) ||
          (sellingBiddingFilterValue === '판매 상품' && item.isSelling))
    );
    setFilteredMyAuctionItems(updatedFilteredMyAuctionItems);
  }, [progressFilterValue, sellingBiddingFilterValue]);

  /**
   * @description 로그아웃 시 mianPage로 이동
   */
  useEffect(() => {
    if (!isLoginIn) {
      router.push('/');
    }
  }, [isLoginIn, router]);

  return (
    <S.MyPageLayout>
      <S.PageTitle>마이 페이지</S.PageTitle>
      {/**
       * @description Filter 영역
       */}
      <S.FilterWrapper>
        <S.FilterCol>
          <S.FilterTitle
            onClick={handleSellingBiddingFilter}
            selected={sellingBiddingFilterValue === '입찰 상품'}
          >
            입찰 상품
          </S.FilterTitle>
          <S.FilterTitle
            onClick={handleSellingBiddingFilter}
            selected={sellingBiddingFilterValue === '판매 상품'}
          >
            판매 상품
          </S.FilterTitle>
        </S.FilterCol>
        <S.FilterCol>
          <S.FilterProgressTitle
            onClick={handleProgessFilter}
            selected={progressFilterValue === '진행중'}
          >
            진행중
          </S.FilterProgressTitle>
          <S.FilterTitle>|</S.FilterTitle>
          <S.FilterProgressTitle
            onClick={handleProgessFilter}
            selected={progressFilterValue === '종료됨'}
          >
            종료됨
          </S.FilterProgressTitle>
        </S.FilterCol>
      </S.FilterWrapper>
      {/**
       * @description 경매 상품 리스트 카드 영역
       */}
      <S.CardWrapper>
        {filteredMyAuctionItems.map((item, index) => (
          <AuctionCardItem
            id={item.id}
            key={index}
            title={item.title}
            price={item.price}
            date={item.date}
            isSelling={item.isSelling}
            status={item.status}
          />
        ))}
      </S.CardWrapper>
    </S.MyPageLayout>
  );
};

export default MyPage;
