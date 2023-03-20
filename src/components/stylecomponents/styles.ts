import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import COLOR from '@/colors/color';
import { themeProp } from './theme';

type Variant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'disabled';
type Size = 'sm' | 'md' | 'lg' | 'xl';

/**
 * ButtonBase 컴포넌트 Props, HTMLButton 의 Props 를 상속받음
 * @type variant {string} - 버튼의 종류를 결정
 * @type size {string} - 크기를 결정
 * @type fullWidth {boolean} 버튼이 100% width 를 가질지 결정
 */
interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  size: Size;
  fullWidth: boolean;
}

/**
 * ButtonBaseProps interface 의 모든 Props 들을 optional 로 바꾼 type
 */
export type Props = Partial<ButtonBaseProps>;

/**
 * variant에 따라 버튼의 배경색을 리턴하는 함수
 * @param variant {string} - variant type 변수
 * @returns - COLOR 에 담긴 컬러 string 값을 리턴
 */
const getBgColor = (variant: Variant) => {
  switch (variant) {
    case 'default':
      return COLOR.BLACK;
    case 'error':
      return COLOR.DEEP_ORANGE;
    case 'warning':
      return COLOR.DEEP_ORANGE;
    case 'disabled':
      return COLOR.GRAY;
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
const sizeStyle = css<Props>`
  ${({ size = 'md', theme }) => {
    const { fontSize } = theme;
    if (size === 'sm') {
      return css`
        padding: 8px 10px;
        font-size: 1.6rem;
      `;
    }

    if (size === 'lg') {
      return css`
        padding: 14px 18px;
        font-size: 1.8rem;
      `;
    }

    if (size === 'xl') {
      return css`
        padding: 14px 18px;
        font-size: 2rem;
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
const blockStyle = css<Props>`
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
const buttonRoleStyle = css<Props>`
  ${({ variant = 'default' }) => css`
    background-color: ${getBgColor(variant)};
    color: ${getTextColor(variant)};

    &:hover {
      background-color: teal;
    }

    &:disabled {
      background-color: ${getBgColor('disabled')};
      color: ${COLOR.BLACK};
    }
  `}
`;

export const ButtonBase = styled.button<Props>`
  display: inline-flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  position: relative;
  min-width: 64px;
  border: none;
  border-radius: 6px;
  padding: 10px 12px;
  cursor: pointer;

  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  user-select: none;

  transition: background-color 0.1s ease;

  ${buttonRoleStyle}
  ${sizeStyle}
  ${blockStyle}
`;
