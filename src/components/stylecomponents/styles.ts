import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ButtonBaseOptionalProps, Variant } from '@/types/buttonTypes';
import {
  blockStyle,
  buttonRoleStyle,
  sizeStyle,
} from '@/utils/getButtonColors';

/**
 * Button Styled Components
 */
export const ButtonBase = styled.button<ButtonBaseOptionalProps>`
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

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  ${buttonRoleStyle}
  ${sizeStyle}
  ${blockStyle}
`;

export const Header = styled.div`
  position: fixed;
  width: 100%;
  height: ${({ theme }) => theme.height.header};
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.color.BLACK};
  color: ${({ theme }) => theme.color.WHITE};
  padding-left: ${({ theme }) => theme.padding.baseX};
  padding-right: ${({ theme }) => theme.padding.baseX};

  div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      color: white;
      text-decoration: none;
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 3vw;
    font-size: 2.4rem;
    line-height: 3.2rem;

    div {
      cursor: pointer;
    }
  }
`;

export const HeaderGuard = styled.div`
  width: 0;
  height: ${({ theme }) => theme.height.header};
`;

export const LogoTitle = styled.h1`
  font-size: 3rem;
  font-family: 'Ubuntu', sans-serif;
`;

/**
 * /products/[productid] 페이지에서 사용되는 최상위 컴포넌트입니다.
 */
export const DetailPageLayout = styled.div`
  display: 100%;
  display: flex;
  padding: ${({ theme }) => `${theme.padding.baseY} ${theme.padding.baseX}`};
  font-size: ${({ theme }) => theme.fontSize.md};
  justify-content: space-between;
  column-gap: 3.125vw;

  section:nth-child(1) {
    background-color: bisque;
  }

  section:nth-child(2) {
    background-color: burlywood;
  }
`;

export const DetailLeftSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
`;

export const DetailPageImageBox = styled.div``;

export const DetailRightSection = styled(DetailLeftSection)``;
