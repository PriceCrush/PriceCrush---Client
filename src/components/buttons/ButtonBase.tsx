import { ButtonBaseOptionalProps } from '@/types/buttonTypes';
import {
  blockStyle,
  buttonRoleStyle,
  sizeStyle,
} from '@/utils/getButtonColors';
import styled from 'styled-components';

const ButtonBase = styled.button<ButtonBaseOptionalProps>`
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

export default ButtonBase;
