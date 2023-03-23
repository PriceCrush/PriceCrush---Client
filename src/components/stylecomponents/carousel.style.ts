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

export const MainPageSlider = styled(Slider)`
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

export const DetailBox = styled.div`
  padding: 4px;
  margin: 8px auto 0 auto;
  text-align: start;
  p + p {
    margin-top: 8px;
  }
  & p:nth-child(1) {
    font-size: 1.6rem;
  }
  & p:nth-child(2) {
    font-size: 2rem;
    font-weight: 700;
  }
  & p:nth-child(3) {
    font-size: 2.4rem;
    font-weight: 600;
    color: ${COLOR.DEEP_ORANGE};
  }
`;
