import MainPageCarousel from '@/components/carousel/MainPageCarousel';
import CategoryList from '@/components/mainPage/CategoryList';
import * as S from '@/components/stylecomponents/mainPage.style';

export default function Home() {
  return (
    <main>
      <S.MainPageLayout>
        <MainPageCarousel />
        <CategoryList rows={2} />
      </S.MainPageLayout>
    </main>
  );
}
