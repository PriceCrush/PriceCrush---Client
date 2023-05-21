import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/myPage.style';
import AuctionCardItem from '@/components/myPage/AuctionCardItem';
import { useRecoilValue } from 'recoil';
import { isLoggedInState, userCommonDataState } from '@/atoms/isLoggedInState';
import Router from 'next/router';
import { Api } from '@/utils/commonApi';
import { MyAuctionItem } from '@/types/myAuctionItemsTypes';
import { GetServerSidePropsContext } from 'next';

const MyPage = () => {
  // 필터링 버튼의 상태
  const [progressFilterValue, setProgressFilterValue] = useState('진행중');
  const [sellingBiddingFilterValue, setSellingBiddingFilterValue] =
    useState('입찰 상품');

  // 실제 경매 데이터
  const [myAuctionItems, setMyAuctionItems] = useState({
    sellingBids: [],
    endedBids: [],
    biddingBids: [],
    soldBids: [],
  });
  const [filteredMyAuctionItems, setFilteredMyAuctionItems] = useState<
    MyAuctionItem[]
  >([]);
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

  const { uid } = useRecoilValue(userCommonDataState);

  /**
   * @description 유저 로그인 여부
   */
  const isLoginInValue = useRecoilValue(isLoggedInState);
  const [isLoginIn, setIsLoginIn] = useState(false);

  /**
   * @description 경매 상품 다시 불러오기 트리거
   */
  const [reloadTrigger, setReloadTrigger] = useState(0);

  /**
   * @description profile page url
   */
  const PROFILE_URL = '/mypage/profile';

  // Functions
  // Functions

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
    setIsLoginIn(isLoginInValue);
  }, [isLoginInValue]);
  /**
   * @description 로그아웃 시 mianPage로 이동
   * @description 살짝 딜레이 있긴함 차후 수정
   */
  useEffect(() => {
    if (!uid || !isLoginInValue) {
      Router.push('/');
    }
  }, [uid, isLoginInValue]);

  /**
   * @description 내 경매 상품 불러오기
   */
  useEffect(() => {
    const getMyAuctionItems = async () => {
      try {
        let myAuctionItems;
        const [sellingBids, biddingBids, soldBids, endedBids] =
          await Promise.all([
            Api.get('product/user/selling'),
            Api.get('auction/user/bidding'),
            Api.get('product/user/sold'),
            Api.get('auction/user/endedBid'),
          ]);

        myAuctionItems = {
          sellingBids: sellingBids,
          biddingBids: biddingBids,
          soldBids: soldBids,
          endedBids: endedBids,
        };
        setMyAuctionItems(myAuctionItems);
      } catch (error) {
        console.log(error);
      }
    };

    getMyAuctionItems();
  }, [reloadTrigger]);

  // 필터링 값에 따라 FilteredMyAuctionItems에 값 넣기
  useEffect(() => {
    if (myAuctionItems) {
      if (sellingBiddingFilterValue === '입찰 상품') {
        if (progressFilterValue === '진행중') {
          setFilteredMyAuctionItems(myAuctionItems.biddingBids);
        } else if (progressFilterValue === '종료됨') {
          setFilteredMyAuctionItems(myAuctionItems.endedBids);
        }
      } else if (sellingBiddingFilterValue === '판매 상품') {
        if (progressFilterValue === '진행중') {
          setFilteredMyAuctionItems(myAuctionItems.sellingBids);
        } else if (progressFilterValue === '종료됨') {
          setFilteredMyAuctionItems(myAuctionItems.soldBids);
        }
      }
    }
  }, [
    progressFilterValue,
    sellingBiddingFilterValue,
    myAuctionItems,
    filteredMyAuctionItems,
  ]);

  useEffect(() => {
    setUserCommonData(userCommonDataValue);
  }, [userCommonDataValue]);

  // useEffect(() => {
  //   console.log('myAuctionItems', myAuctionItems);
  //   console.log('filteredMyAuctionItems', filteredMyAuctionItems);
  // }, [filteredMyAuctionItems, myAuctionItems]);

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
        {filteredMyAuctionItems.length !== 0 ? (
          filteredMyAuctionItems.map((item, index) => {
            console.log(item);
            return (
              <AuctionCardItem
                key={item.id}
                isSelling={
                  progressFilterValue === '진행중' &&
                  sellingBiddingFilterValue === '판매 상품'
                }
                item={item}
                reloadTrigger={setReloadTrigger}
              />
            );
          })
        ) : (
          <S.NoItemBox>
            <div>아이템 없음</div>
          </S.NoItemBox>
        )}
      </S.CardWrapper>
    </S.MyPageLayout>
  );
};

/**
 * @param 로그인 안되어있을 시 {}반환
 * @returns
 */
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  /**
   * @description 로그아웃상태에서 접근 메인 페이지로 이동
   */
  const { accessToken } = context.req.cookies;
  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {}, // 빈 객체 반환
  };
};

export default MyPage;
