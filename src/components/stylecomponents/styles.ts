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

  transition: background-color 0.1s ease;

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
