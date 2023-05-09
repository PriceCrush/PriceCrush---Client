import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowButton from './ArrowButton';
import * as S from '@/components/stylecomponents/auctionDetailCarousel.style';
import { ProductImageProps } from '@/types/productsTypes';
import Image from 'next/image';

interface AuctionDetailCarouselProps {
  images?: ProductImageProps[] | null;
}

const AuctionDetailCarousel = ({ images }: AuctionDetailCarouselProps) => {
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '0',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 800,
    dots: true,
    arrows: true,
    autoplay: false,
    prevArrow: <ArrowButton direction="prev" size="md" color="black" />,
    nextArrow: <ArrowButton direction="next" size="md" color="black" />,
  };

  return (
    <S.AuctionDetailSlider {...settings}>
      {images &&
        images.map((image, index) => (
          <S.DetailPageImageBox key={index}>
            <Image
              alt=""
              src={image ? image.url : '/images/temp.jpeg'}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="50vw"
            />
          </S.DetailPageImageBox>
        ))}
      {!images && (
        <S.DetailPageImageBox>
          <Image
            alt=""
            src="/images/temp.jpeg"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="50vw"
          />
        </S.DetailPageImageBox>
      )}
    </S.AuctionDetailSlider>
  );
};

export default AuctionDetailCarousel;
