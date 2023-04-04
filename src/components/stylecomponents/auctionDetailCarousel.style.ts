import { ButtonHTMLAttributes } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';
import Slider from 'react-slick';
import COLOR from '@/colors/color';

type Size = 'sm' | 'md' | 'lg';
type Direction = 'prev' | 'next';
type Color = 'black' | 'white';

/**
 * @type size {string} - 크기를 결정
 * @type direction {string} - 이전, 다음 화살표 방향
 * @type color {string} - color 지정
 */
export interface ArrowBaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Size;
  direction: Direction;
  color: Color;
}
type PickSizeColorProps = Pick<ArrowBaseButtonProps, 'size' | 'color'>;

export const getSize = (size: Size) => {
  switch (size) {
    case 'sm':
      return '16px';
    case 'md':
      return '32px';
    case 'lg':
      return '60px';
  }
};

/**
 * @property color {string} - color 지정
 * @property size {string} - 크기를 결정
 * @property direction {string} - 이전, 다음 화살표 방향
 */
export const ArrowBaseButton = styled.button<ArrowBaseButtonProps>`
  z-index: 1;
  color: ${({ color }) => color};
  height: ${({ size }) => getSize(size)};
  width: ${({ size }) => getSize(size)};
  &:hover {
    color: ${({ color }) => color};
  }
  /* ${({ direction }) =>
    direction === 'next' ? 'right: 25px' : 'left: 25px'} */
`;

export const NextArrow = styled(IoIosArrowForward)<PickSizeColorProps>`
  height: ${({ size }) => getSize(size)};
  color: ${({ color }) => color};
`;

export const PrevArrow = styled(IoIosArrowBack)<PickSizeColorProps>`
  height: ${({ size }) => getSize(size)};
  color: ${({ color }) => color};
`;

export const AuctionDetailSlider = styled(Slider)`
  .slick-slide {
    text-align: center;
    padding: 15px;
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-dots {
    position: static;
  }
`;

export const SliderItemContainer = styled.div`
  width: 300px;
  text-align: center;
  display: inline-block;
  margin: 0 auto;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  &:hover img {
    transform: scale(1.1);
  }
`;

export const SliderImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 8px;
  background-color: ${COLOR.GRAY};

  img {
    transition: all 0.3s ease-in-out;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;

export const DetailPageImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
  overflow: hidden;
`;
