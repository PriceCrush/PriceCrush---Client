import MainPageCarousel from '@/components/carousel/MainPageCarousel';
import * as S from '@/components/stylecomponents/mainPage.style';

export default function Home() {
  return (
    <main>
      <S.mainPageLayout>
        <MainPageCarousel />
      </S.mainPageLayout>
    </main>
  );
}
