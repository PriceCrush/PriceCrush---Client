import styled from 'styled-components';
import { AiFillAccountBook } from 'react-icons/ai';
import * as S from '@/components/stylecomponents/styles';
import COLOR from '@/colors/color';
import Slider from 'react-slick';
import SliderItem from '@/components/carousel/SliderItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TempCon = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${COLOR.GRAY};
  font-size: 3rem;
`;

const CustomSlider = styled(Slider)`
  .slick-slide {
    text-align: center;
  }
`;

const Div = styled.div`
  overflow: hidden;
`;

export default function Home() {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <main>
      <TempCon>
        <span>
          PriceCrush 프로젝트 Client <AiFillAccountBook />
        </span>
        <div>
          <S.ButtonBase variant="warning" size="xl">
            wow
          </S.ButtonBase>
          <S.ButtonBase size="lg" variant="error">
            wow
          </S.ButtonBase>
        </div>
      </TempCon>
      <Div>
        <CustomSlider {...settings}>
          <SliderItem test="test1" />
          <SliderItem test="test2" />
          <SliderItem test="test3" />
          <SliderItem test="test3" />
        </CustomSlider>
      </Div>
    </main>
  );
}
