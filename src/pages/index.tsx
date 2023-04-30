import MainPageCarousel from '@/components/carousel/MainPageCarousel';
import CategoryList from '@/components/mainPage/CategoryList';
import * as S from '@/components/stylecomponents/mainPage.style';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoriesState as categoriesAtom } from '@/atoms/categoriesState';
import { productCategoriesType, ProductFromApi } from '@/types/productsTypes';
import { Api } from '@/utils/commonApi';
import db from '@/temp/db.json';
import { userCommonDataState, userDataState } from '@/atoms/isLoggedInState';
interface ServerSideProps {
  categories: productCategoriesType;
  data: ProductFromApi[];
  jsondata: any;
}

export default function Home({ categories, data, jsondata }: ServerSideProps) {
  const [categoriesState, setCategoriesState] = useRecoilState(categoriesAtom);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoriesState(categories);
      //TODO: Recoil 과 LocalStorage 동기화
    }
  }, [categories, setCategoriesState]);

  return (
    <main>
      <S.MainPageLayout>
        <MainPageCarousel popularProducts={data} />
        <CategoryList categories={categories} rows={2} />
      </S.MainPageLayout>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await Api.get('/product-category');
  //FIXME: JSON-SERVER 데이터를 서버 데이터로 교체해야함
  const jsondata = db.products;

  //FIXME: 입찰에 참여한 수에 따라 인기상품 10개를 넘겨줘야함, 현재 테스트용으로 모든 상품 불러오는 중
  const data = await Api.get('/product');

  return {
    props: {
      categories,
      data,
      jsondata,
    },
  };
};
