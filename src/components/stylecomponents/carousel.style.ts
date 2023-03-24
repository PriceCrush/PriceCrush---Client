import { ButtonHTMLAttributes } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import styled from 'styled-components';

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

export type Props = Partial<ArrowBaseButtonProps>;

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
  ${({ direction }) => (direction === 'next' ? 'right: 25px' : 'left: 25px')}
`;

export const NextArrow = styled(IoIosArrowForward)<
  Pick<ArrowBaseButtonProps, 'size' | 'color'>
>`
  height: ${({ size }) => getSize(size)};
  color: ${({ color }) => color};
`;

export const PrevArrow = styled(IoIosArrowBack)<
  Pick<ArrowBaseButtonProps, 'size' | 'color'>
>`
  height: ${({ size }) => getSize(size)};
  color: ${({ color }) => color};
`;
