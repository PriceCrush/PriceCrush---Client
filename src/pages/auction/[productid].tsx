import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import { GetServerSideProps } from 'next';
import { ProductDetailsProps, ProductFromApi } from '@/types/productsTypes';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import { useTimeDiff } from '@/hooks/useTimeDiff';
import AuctionDetailCarousel from '@/components/carousel/AuctionDetailCarousel';
import { useModal } from '@/hooks/useModal';
import BidConfirm from '@/components/modals/productPage/BidConfirm';
import { SocketContext } from '@/contexts/socket';
import { Api } from '@/utils/commonApi';
import AuctionForm from '@/components/auctionPage/AuctionForm';

interface ServerSideReturn {
  // blurDataURL: string;
  tempData: ProductDetailsProps;
  productData: ProductFromApi;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { productid } = query;
  const productData = await Api.get(`/product/${productid}`);

  // const { base64 } = await getPlaiceholder(String(query.imageUrl));

  /**
   * @description 임시 데이터 10개 생성
   */
  const tempData: ProductDetailsProps = {
    productId: '1234',
    productName: `엄청난 상품`,
    category: '카테고리',
    start_price: 100000,
    description: '상품 설명 상품 설명 상품 설명 상품 설명',
    start_date: new Date().toISOString(), // start_date를 문자열로 변경
    end_date: new Date('2023-06-10').toISOString(), // end_date를 문자열로 변경
    status: '상태',
    images: [
      {
        imageId: '12345',
        imageUrl: '/images/temp.jpeg',
        isMain: 'Y',
        productId: '1234',
      },
      {
        imageId: '23456',
        imageUrl: '/images/temp.jpeg',
        isMain: 'N',
        productId: '1234',
      },
      {
        imageId: '34567',
        imageUrl: '/images/temp.jpeg',
        isMain: 'N',
        productId: '1234',
      },
    ],
  };

  return {
    props: {
      // blurDataURL: base64,
      tempData,
      productData,
    },
  };
};

const ProductDetail = ({ tempData, productData }: ServerSideReturn) => {
  const socket = useContext(SocketContext);
  const timeDiff = useTimeDiff(String(productData.end_date));
  const { openModal } = useModal();
  const [inputBidPrice, setInputBidPrice] = useState(productData.start_price);
  const [currentPrice, setCurrentPrice] = useState(productData.start_price);

  /**
   * @description 경매 시작 여부, 이 값에 따라 입찰 버튼 활성화
   */
  const isAuctionStarted = new Date(productData.start_date) < new Date();

  /**
   * @description InputBase에 입력된 값에서 숫자만 추출해 state에 저장
   */
  const handleCustomBidPriceInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const numberValue = value.replace(/[^0-9]/g, ''); // 입력된 값에서 숫자만 추출
    setInputBidPrice(Number(numberValue));
  };

  /**
   * @description 입찰, 최소입찰 버튼 클릭시 모달창 띄우기
   */
  const handleBidButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    type Name = 'customPriceBid' | 'staticPriceBid';
    const name = e.currentTarget.name as Name;
    if (name === 'customPriceBid') {
      openModal({
        title: '입찰 확인',
        content: (
          <BidConfirm
            bidPrice={inputBidPrice}
            bidFunction={handleSocketButtonClick}
          />
        ),
      });
    } else if (name === 'staticPriceBid') {
      openModal({
        title: '입찰 확인',
        content: <BidConfirm bidPrice={inputBidPrice + 1000} />,
      });
    } else {
      throw new Error('버튼 이름이 잘못되었습니다.');
    }
  };

  const handleSocketButtonClick = () => {
    const bidData = {
      price: inputBidPrice,
      // TODO: 로그인 완료시 사용자 정보를 받아올 수 있도록 수정
      user: '0090ff72-65c4-463a-b2c0-276fb9a93cb1',
      product: productData.id,
    };

    socket.emit('bid', bidData);
  };

  /**
   * @description 소켓 이벤트를 다루는 `useEffect`입니다
   */
  useEffect(() => {
    const handleConnect = () => console.log('소켓 연결됨', socket.connected);
    const handleDisconnect = () =>
      console.log('소켓 연결 해제됨', socket.disconnected);
    const handleBidResult = (data: any) => {
      console.log('bidResult 이벤트 발생', data);
      if (data.success) {
        setCurrentPrice(data.auctionResult.price);
      } else {
        alert(data.message);
        console.log(data.message);
      }
    };

    // 소켓 연결
    socket.on('connect', handleConnect);

    // 소켓 연결 해제 확인
    socket.on('disconnect', handleDisconnect);

    // `bidResult` 이벤트 연결
    socket.on('bidResult', handleBidResult);

    // 소켓 이벤트 연결 해제
    return () => {
      socket.off('bidResult', handleBidResult);
    };
  }, []);

  const formattedInputBidPrice = translatePriceToKoreanWon(
    Number(inputBidPrice),
    true
  );

  return (
    <S.DetailPageLayout>
      {/**
       * 왼쪽 섹션
       */}
      <S.DetailLeftSection>
        <AuctionDetailCarousel images={tempData.images} />
        <S.DetailLeftSectionRow>
          <S.CurrentPriceBox>
            <h3>최고 입찰 가격</h3>
            <span>최고 입찰 가격 : 현재 가격</span>
          </S.CurrentPriceBox>
          <S.TimeDiffBox>
            <h3>남은 시간</h3>
            <span className="timeRemain">{timeDiff}</span>
          </S.TimeDiffBox>
        </S.DetailLeftSectionRow>
      </S.DetailLeftSection>
      {/**
       * 오른쪽 섹션
       */}
      <S.DetailRightSection>
        {/**
         * 상품명, 아이콘 섹션
         */}
        <S.DetailNameBox>
          <S.NameBoxRow>
            <S.NameText>상품</S.NameText>
            <S.NameBoxIconBox>
              <AiOutlineShareAlt size={28} />
            </S.NameBoxIconBox>
          </S.NameBoxRow>
          <S.NameBoxRow>
            <S.NameText>{productData.name}</S.NameText>
          </S.NameBoxRow>
        </S.DetailNameBox>
        {/**
         * 판매가, 입찰 영역
         */}
        <S.PriceBox>
          <S.PriceText>
            {translatePriceToKoreanWon(
              currentPrice ? currentPrice : productData.start_price,
              true
            )}
            ~
          </S.PriceText>

          <AuctionForm
            available={isAuctionStarted}
            formattedInputBidPrice={formattedInputBidPrice}
            handleBidButtonClick={handleBidButtonClick}
            handleCustomBidPriceInput={handleCustomBidPriceInput}
            startDate={productData.start_date}
          />
        </S.PriceBox>
        <S.DetailDescBox>
          <S.PriceText>상품 설명</S.PriceText>
          <span>{productData.desc}</span>
        </S.DetailDescBox>
      </S.DetailRightSection>
    </S.DetailPageLayout>
  );
};

export default ProductDetail;
