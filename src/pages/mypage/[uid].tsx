import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import AuctionCardItem from '@/components/myPage/AuctionCardItem';
import { GetServerSidePropsContext } from 'next';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userCommonDataState } from '@/atoms/isLoggedInState';
import Router from 'next/router';
import { Api } from '@/utils/commonApi';
import { FaUserCircle } from 'react-icons/fa';
import ButtonBase from '@/components/buttons/ButtonBase';
import styled from 'styled-components';

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
  // console.log(context.params);

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
  // 필터링 버튼의 상태
  const [progressFilterValue, setProgressFilterValue] = useState('진행중');
  const [sellingBiddingFilterValue, setSellingBiddingFilterValue] =
    useState('입찰 상품');
  // 테스트용 데이터
  const [myAuctionItems, setMyAuctionItems] = useState(tempData);
  const [filteredMyAuctionItems, setFilteredMyAuctionItems] =
    useState(tempData);
  // 실제 경매 데이터
  const [myAuctionItems2, setMyAuctionItems2] = useState({
    sellingBids: [],
    endedBids: [],
    biddingBids: [],
    soldBids: [],
  });
  const [filteredMyAuctionItems2, setFilteredMyAuctionItems2] = useState<any[]>(
    []
  );
  /**
   * @description 유저 기본 정보
   */
  const [userCommonData, setUserCommonData] = useState({
    email: '',
    name: '',
    nickname: '',
  });
  const userCommonDataValue = useRecoilValue(userCommonDataState);
  const { nickname } = userCommonData;

  /**
   * @description 유저 로그인 여부
   */
  const isLoginInValue = useRecoilValue(isLoggedInState);
  const [isLoginIn, setIsLoginIn] = useState(false);

  /**
   * @description profile page url
   */
  const PROFILE_URL = '/mypage/profile';

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

  useEffect(() => {
    setIsLoginIn(isLoginInValue);
  }, [isLoginInValue]);
  /**
   * @description 로그아웃 시 mianPage로 이동
   * @description 살짝 딜레이 있긴함 차후 수정
   */
  useEffect(() => {
    if (!isLoginInValue) {
      Router.push('/');
    }
  }, [isLoginInValue]);

  /**
   * @description 내 경매 상품 불러오기
   */
  useEffect(() => {
    const getMyAuctionItems = async () => {
      try {
        let myAuctionItems;
        const [sellingBids, biddingBids, soldBids, endedBids] =
          await Promise.all([
            Api.get('auction/user/selling'),
            Api.get('auction/user/bidding'),
            Api.get('auction/user/sold'),
            Api.get('auction/user/endedBid'),
          ]);

        myAuctionItems = {
          sellingBids: sellingBids,
          biddingBids: biddingBids,
          soldBids: soldBids,
          endedBids: endedBids,
        };
        setMyAuctionItems2(myAuctionItems);
      } catch (error) {
        console.log(error);
      }
    };

    getMyAuctionItems();
  }, []);

  // 필터링 값에 따라 FilteredMyAuctionItems2에 값 넣기
  useEffect(() => {
    if (myAuctionItems2) {
      if (sellingBiddingFilterValue === '입찰 상품') {
        if (progressFilterValue === '진행중') {
          setFilteredMyAuctionItems2(myAuctionItems2.biddingBids);
        } else if (progressFilterValue === '종료됨') {
          setFilteredMyAuctionItems2(myAuctionItems2.endedBids);
        }
      } else if (sellingBiddingFilterValue === '판매 상품') {
        if (progressFilterValue === '진행중') {
          setFilteredMyAuctionItems2(myAuctionItems2.sellingBids);
        } else if (progressFilterValue === '종료됨') {
          setFilteredMyAuctionItems2(myAuctionItems2.soldBids);
        }
      }
    }
  }, [
    progressFilterValue,
    sellingBiddingFilterValue,
    myAuctionItems2,
    filteredMyAuctionItems2,
  ]);

  useEffect(() => {
    setUserCommonData(userCommonDataValue);
  }, [userCommonDataValue]);

  useEffect(() => {
    console.log(myAuctionItems2);
  }, [myAuctionItems2]);

  return (
    <S.MyPageLayout>
      <S.PageTitle>마이 페이지</S.PageTitle>
      <S.ProfileInfoBox>
        <S.UserProfileIcon />
        <S.UserInfoBox>
          <p>{nickname}</p>
          <S.ProfileBtn
            size="sm"
            onClick={() => {
              Router.push(`${PROFILE_URL}`);
            }}
          >
            프로필 수정
          </S.ProfileBtn>
        </S.UserInfoBox>
      </S.ProfileInfoBox>
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
        {filteredMyAuctionItems2.map((item, index) => (
          <AuctionCardItem
            // TODO: item 빼고 다 삭제
            key={item.id}
            isSelling={
              progressFilterValue === '진행중' &&
              sellingBiddingFilterValue === '판매 상품'
            }
            item={item}
          />
        ))}
      </S.CardWrapper>
    </S.MyPageLayout>
  );
};

export default MyPage;
