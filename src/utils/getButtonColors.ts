import COLOR from '@/colors/color';
import { ButtonBaseOptionalProps, Variant } from '@/types/buttonTypes';
import { css } from 'styled-components';

/**
 * variant에 따라 버튼의 배경색을 리턴하는 함수
 * @param variant {string} - variant type 변수
 * @returns - COLOR 에 담긴 컬러 string 값을 리턴
 */
export const getBgColor = (variant: Variant) => {
  switch (variant) {
    case 'default':
      return COLOR.BLACK;
    case 'error':
      return COLOR.DEEP_ORANGE;
    case 'warning':
      return COLOR.DEEP_ORANGE;
    case 'disabled':
      return COLOR.GRAY;
    case 'cancelAuction':
      return COLOR.BLACK;
    case 'endAuction':
      return COLOR.DEEP_ORANGE;
    default:
      return COLOR.BLACK;
  }
};

/**
 * variant에 따라 버튼의 글씨색을 리턴하는 함수
 * @param variant {string}
 * @returns
 */
const getTextColor = (variant: Variant) => {
  switch (variant) {
    default:
      return COLOR.WHITE;
  }
};

/**
 * size props 에 따라 css 를 리턴해 버튼의 크기를 결정
 * @param size {string}
 */
export const sizeStyle = css<ButtonBaseOptionalProps>`
  ${({ size = 'md', theme }) => {
    const { fontSize } = theme;

    if (size === 'sm') {
      return css`
        padding: 8px 10px;
        font-size: ${fontSize.sm};
      `;
    }

    if (size === 'lg') {
      return css`
        padding: 14px 18px;
        font-size: ${fontSize.lg};
      `;
    }

    if (size === 'xl') {
      return css`
        padding: 14px 18px;
        font-size: ${fontSize.xl};
      `;
    }

    return css`
      padding: 10px 12px;
      font-size: ${fontSize.md};
    `;
  }}
`;

/**
 * fullWidth Prop 에 따라 버튼의 크기를 결정하는 css를 리턴
 * @param fullWidth {boolean}
 */
export const blockStyle = css<ButtonBaseOptionalProps>`
  ${({ fullWidth }) => {
    if (fullWidth) {
      return css`
        width: 100%;
      `;
    }

    return css``;
  }}
`;

/**
 * variant Prop 에 따라 버튼의 디자인을 결정하는 css를 리턴
 * @param fullWidth {boolean}
 */
export const buttonRoleStyle = css<ButtonBaseOptionalProps>`
  ${({ variant = 'default' }) => css`
    background-color: ${getBgColor(variant)};
    color: ${getTextColor(variant)};

    &:disabled {
      background-color: ${getBgColor('disabled')};
      color: ${COLOR.BLACK};
    }
  `}
`;
