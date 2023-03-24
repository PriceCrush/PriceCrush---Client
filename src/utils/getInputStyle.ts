import { InputBaseProps } from '@/types/inputTypes';
import { css } from 'styled-components';

export const inputStyle = css<InputBaseProps>`
  ${({ fullWidth }) => {
    if (fullWidth) {
      return css`
        width: 100%;
      `;
    }

    return css``;
  }}
`;
