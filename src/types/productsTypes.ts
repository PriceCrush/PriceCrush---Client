import React, { MouseEventHandler } from 'react';

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

export type ProductFromApi = {
  id: 'string';
  name: 'string';
  start_price: number;
  desc: 'string';
  start_date: string;
  end_date: string;
  deletedAt: string | null;
  productCategory: productCategoryType;
};

export type PartialProductFromApi = Partial<ProductFromApi>;

export type productCategoryType = {
  id: string;
  imgurl: string;
  name: string;
};

export type productCategoriesType = productCategoryType[];

/**
 * @description currentProductState의 타입, 사용자가 클릭한 상품의 상세 정보를 담는다.
 */

export interface CurrentProductStateProps {
  tempData: ProductDetailsProps | null;
  productData: ProductFromApi | null;
  formattedInputBidPrice: string | null;
  handleBidButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCustomBidPriceInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAuctionStarted: boolean | null;
  available: boolean | null;
}
