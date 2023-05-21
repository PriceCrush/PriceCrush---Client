import styled from 'styled-components';
import { FabProps } from '@/types/buttonTypes';
import { Size } from '@/types/buttonTypes';

const getFabSize = (size: Size) => {
  switch (size) {
    case 'sm':
      return '16px';
    case 'md':
      return '32px';
    case 'lg':
      return '60px';
    case 'xl':
      return '80px';
  }
};

/**
 * @property size {string} - 크기를 결정
 */

export const FabLayout = styled.button<FabProps>`
  position: fixed;
  /* right: ${({ theme }) => theme.position.fabRight};
  bottom: ${({ theme }) => theme.position.fabBottom}; */
  right: 2vw;
  bottom: 5vh;
  width: ${({ size }) => getFabSize(size)};
  height: ${({ size }) => getFabSize(size)};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.DEEP_ORANGE};
  border: none;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.xl};
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }
`;
