import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/styles';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { GetServerSideProps } from 'next';
import { productsDetailsProps } from '@/types/productsDetailType';
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai';

interface ServerSideReturn {
  blurDataURL: string;
  query: productsDetailsProps;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);
  const { base64 } = await getPlaiceholder(String(query.imageUrl));

  return {
    props: {
      blurDataURL: base64,
      query,
    },
  };
};

const ProductDetail = ({ blurDataURL, query }: ServerSideReturn) => {
  const {
    productName,
    ownerName,
    desc,
    currentPrice,
    auctionEndDate,
    minimumBidPrice,
  } = query;
  return (
    <S.DetailPageLayout>
      {/**
       * 왼쪽 섹션
       */}
      <S.DetailLeftSection>
        <S.DetailPageImageBox>
          <Image
            alt=""
            src={String(query.imageUrl)}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="50vw"
            placeholder="blur"
            blurDataURL={blurDataURL}
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
            <S.NameText>{ownerName}</S.NameText>
            <S.NameBoxIconBox>
              <AiOutlineHeart size={28} />
              <AiOutlineShareAlt size={28} />
            </S.NameBoxIconBox>
          </S.NameBoxRow>
          <S.NameBoxRow>
            <S.NameText>{productName}</S.NameText>
          </S.NameBoxRow>
        </S.DetailNameBox>
        {/**
         * 판매가, 입찰 영역
         */}
        <S.PriceBox>
          <div>
            <input />
            <S.ButtonBase variant="warning" size="lg">
              입찰
            </S.ButtonBase>
            <S.ButtonBase variant="error" size="lg">
              +{minimumBidPrice}
            </S.ButtonBase>
          </div>
        </S.PriceBox>
        <S.DetailDescBox>
          <S.PriceText>상품 설명</S.PriceText>
          <span>{desc && desc}</span>
        </S.DetailDescBox>
      </S.DetailRightSection>
    </S.DetailPageLayout>
  );
};

export default ProductDetail;
