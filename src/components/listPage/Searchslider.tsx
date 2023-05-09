import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowButton from '@/components/carousel/ArrowButton';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { productCategoryType } from '@/types/productsTypes';

interface SearchSliderProps {
  category: productCategoryType[];
}

/**
 * @description 렌더함수
 */
const Searchslider = ({ category }: SearchSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    centerPadding: '0',
    prevArrow: <ArrowButton direction="prev" size="md" color="black" />,
    nextArrow: <ArrowButton direction="next" size="md" color="black" />,
  };

  return (
    <div>
      <StyledSlider {...settings}>
        {category.map((item, index) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              imgurl={item.imgurl}
              name={item.name}
            />
          );
        })}
      </StyledSlider>
    </div>
  );
};

const Item = ({ id, imgurl, name }: productCategoryType) => {
  const router = useRouter();
  const { searchTerm } = router.query;
  const goRouter = () => {
    router.push({
      pathname: `search`,
      query: {
        categoryId: id,
        searchTerm,
      },
    });
  };

  return (
    <Box onClick={goRouter}>
      <Image src={imgurl} alt="sample" width={100} height={100} />
      <span> {name}</span>
    </Box>
  );
};

//폰트

// 캐러셀
const StyledSlider = styled(Slider)`
  max-width: 1280px;
  width: 100%;
  width: 100%;

  .slick-prev::before,
  .slick-next::before {
    display: none;
  }

  .slick-slide div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-list {
    margin: 15px 0;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  cursor: pointer;

  > span {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;
  }
`;

export default Searchslider;
