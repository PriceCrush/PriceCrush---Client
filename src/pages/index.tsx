import MainPageCarousel from '@/components/carousel/MainPageCarousel';
import CategoryList from '@/components/mainPage/CategoryList';
import * as S from '@/components/stylecomponents/mainPage.style';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import * as Api from '@/utils/commonApi';
import { Product } from './../components/carousel/MainPageCarousel';

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <S.MainPageLayout>
        <MainPageCarousel popularProducts={data} />
        <CategoryList rows={2} />
      </S.MainPageLayout>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await Api.get<Product[]>('/products');
  return {
    props: {
      data,
    },
  };
};
