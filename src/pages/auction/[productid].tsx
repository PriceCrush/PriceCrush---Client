import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/productDetail.style';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { GetServerSideProps } from 'next';
import {
  FixedLengthString,
  ProductDetailsProps,
  TempDataProps,
} from '@/types/productsDetailType';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';
import ButtonBase from '@/components/buttons/ButtonBase';
import InputBase from '@/components/inputs/InputBase';
import { translatePriceToKoreanWon } from '@/utils/translatePriceToKoreanWon';
import { useTimeDiff } from '@/hooks/useTimeDiff';

interface ServerSideReturn {
  // blurDataURL: string;
  tempData: ProductDetailsProps;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);
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
    },
  };
};

const ProductDetail = ({ tempData }: ServerSideReturn) => {
  const timeDiff = useTimeDiff(String(tempData.end_date));

  return (
    <S.DetailPageLayout>
      {/**
       * 왼쪽 섹션
       */}
      <S.DetailLeftSection>
        <S.DetailPageImageBox>
          <Image
            alt=""
            src="/images/temp.jpeg"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="50vw"
            // placeholder="blur"
            // blurDataURL={blurDataURL}
          />
        </S.DetailPageImageBox>
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
              <AiOutlineHeart size={28} />
              <AiOutlineShareAlt size={28} />
            </S.NameBoxIconBox>
          </S.NameBoxRow>
          <S.NameBoxRow>
            <S.NameText>{tempData.productName}</S.NameText>
          </S.NameBoxRow>
        </S.DetailNameBox>
        {/**
         * 판매가, 입찰 영역
         */}
        <S.PriceBox>
          <S.PriceText>
            {translatePriceToKoreanWon(tempData.start_price, true)}
          </S.PriceText>
          <div>
            <InputBase fullWidth placeholder="입찰 금액을 입력하세요." />
            <ButtonBase variant="warning" size="lg">
              입찰
            </ButtonBase>
            <ButtonBase variant="error" size="lg">
              +최소입찰가격
            </ButtonBase>
          </div>
        </S.PriceBox>
        <S.DetailDescBox>
          <S.PriceText>상품 설명</S.PriceText>
          <span>{tempData.description}</span>
          <span>{timeDiff}</span>
        </S.DetailDescBox>
      </S.DetailRightSection>
    </S.DetailPageLayout>
  );
};

export default ProductDetail;
