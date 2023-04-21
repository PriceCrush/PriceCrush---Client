import SliderItem from '@/components/carousel/SliderItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import ArrowButton from '@/components/carousel/ArrowButton';
import * as S from '@/components/stylecomponents/carousel.style';
import { ProductFromApi } from '@/types/productsTypes';

interface MainPageCarouselProps {
  popularProducts: ProductFromApi[];
}

const MainPageCarousel = ({ popularProducts }: MainPageCarouselProps) => {
  const [centerSlideIndex, setCenterSlideIndex] = useState(0);

  const settings = {
    className: popularProducts.length >= 3 ? 'center' : 'side',
    centerMode: true,
    infinite: popularProducts.length >= 3 ? true : false,
    centerPadding: '0',
    slidesToShow: popularProducts.length >= 5 ? 5 : 3,
    slidesToScroll: 1,
    speed: 500,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <ArrowButton direction="prev" size="lg" color="black" />,
    nextArrow: <ArrowButton direction="next" size="lg" color="black" />,
    beforeChange: (prev: number, center: number) => {
      setCenterSlideIndex(center);
    },
  };

  return (
    <S.MainPageSlider {...settings}>
      {popularProducts &&
        popularProducts.map((product: any, index: any) => (
          <SliderItem
            key={product.id}
            product={product}
            curIdx={index}
            centerIdx={centerSlideIndex}
            infiniteMode={popularProducts.length >= 3 ? true : false}
          />
        ))}
    </S.MainPageSlider>
  );
};
export default MainPageCarousel;
