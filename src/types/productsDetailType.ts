export interface TempDataProps {
  id: number;
  productName: string;
  desc: string;
  auctionEndDate: string;
  currentPrice: string;
  minimumBidPrice: string;
  ownerName: string;
  images: {
    main: string;
    details: { id: number; url: string }[];
  };
}

/**
 * @description N 길이의 글자 고정 string 타입선언
 * @example type FixedLengthString<4> = 'abcd';
 */
export type FixedLengthString<N extends number> = `${string & { length: N }}`;

/**
 * @description 상품 이미지 타입
 * @description ProductDetailsProps에 포함, 1:N 관계
 */
export interface ProductImageProps {
  imageId: FixedLengthString<5>;
  imageUrl: string;
  isMain: string;
  productId: FixedLengthString<4>;
}

/**
 * @description 상품 상세 정보 타입, ERD 참고, category는 1 depth
 */
export interface ProductDetailsProps {
  productId: FixedLengthString<4>;
  productName: string;
  category: string;
  start_price: number;
  description: string;
  start_date: Date | string;
  end_date: Date | string;
  status: string;
  images: ProductImageProps[];
}

// ProductDetailsProps[] 타입의 임시데이터 10개 생성
