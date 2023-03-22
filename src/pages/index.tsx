import styled from 'styled-components';
import Slider from 'react-slick';
import SliderItem from '@/components/carousel/SliderItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import ArrowButton from '../components/carousel/ArrowButton';

const CustomSlider = styled(Slider)`
  .slick-slide {
    text-align: center;
  }
  .center {
    transform: scale(1);
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
  .side {
    transform: scale(0.7);
    opacity: 0.7;
    transition: all 0.3s ease-in-out;
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
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
    prevArrow: <ArrowButton direction="prev" size="lg" color="black" />,
    nextArrow: <ArrowButton direction="next" size="lg" color="black" />,
    beforeChange: (prev: number, center: number) => {
      setCenterSlideIndex(center);
    },
  };

  const [centerSlideIndex, setCenterSlideIndex] = useState(0);

  const testArr = ['test0', 'test1', 'test2', 'test3'];

  return (
    <main>
      <Div>
        <CustomSlider {...settings}>
          {testArr.map((test, index) => (
            <SliderItem
              key={test}
              test={test}
              curIdx={index}
              centerIdx={centerSlideIndex}
            />
          ))}
        </CustomSlider>
      </Div>
    </main>
  );
}
