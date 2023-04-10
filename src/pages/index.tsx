import MainPageCarousel, {
  Product,
} from '@/components/carousel/MainPageCarousel';
import CategoryList from '@/components/mainPage/CategoryList';
import * as S from '@/components/stylecomponents/mainPage.style';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import * as Api from '@/utils/commonApi';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoriesState as categoriesAtom } from '@/atoms/categoriesState';
import { productCategoriesType } from '@/types/productsTypes';
import axios from 'axios';

interface ServerSideProps {
  categories: productCategoriesType;
  data?: any;
}

export default function Home({ categories, data }: ServerSideProps) {
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
  const categories = await Api.get('product-category');
  //FIXME: JSON-SERVER 데이터를 서버 데이터로 교체해야함
  const response = await axios<Product[]>(`http://localhost:3001/products`);

  return {
    props: {
      categories,
      data: response.data,
    },
  };
};
