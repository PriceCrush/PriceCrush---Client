import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as S from '@/components/stylecomponents/styles';
import { tempFetch } from '@/utils/apis';
import useSWR from 'swr';
import { productsDetailsProps } from '@/types/productsDetailType';
import Image from 'next/image';
import axios from 'axios';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { getPlaiceholder } from 'plaiceholder';

interface staticProps {
  props: {
    imageProps: {
      blurDataURL: string;
    };
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { base64 } = await getPlaiceholder(
    'https://images.unsplash.com/photo-1611510338559-2f463335092c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
  );

  return {
    props: {
      imageProps: {
        blurDataURL: base64,
      },
    },
  };
};

const ProductDetail = ({
  props: {
    imageProps: { blurDataURL },
  },
}: staticProps) => {
  const router = useRouter();
  const { data: productData } = useSWR<productsDetailsProps>(
    'http://localhost:4000/products',
    tempFetch
  );

  useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <S.DetailPageLayout>
      <S.DetailLeftSection>
        <S.ImageBox>
          {productData && (
            <Image
              alt=""
              src={productData.imageUrl}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="50vw"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          )}
        </S.ImageBox>
      </S.DetailLeftSection>
      <S.DetailRightSection>설명</S.DetailRightSection>
    </S.DetailPageLayout>
  );
};

export default ProductDetail;
