import { InputBaseProps } from '@/types/inputTypes';
import { inputStyle } from '@/utils/getInputStyle';
import styled from 'styled-components';

const InputBaseS = styled.input<InputBaseProps>`
  border-radius: 12px;
  height: 100%;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: ${({ theme }) => `${theme.padding.inputY} ${theme.padding.inputX}`};
  outline: none;
  border: 2px solid black;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:focus {
    border: 2px solid ${({ theme }) => theme.color.DEEP_ORANGE};
    outline: none;
  }

  ${inputStyle};
`;

const InputBase = (props: InputBaseProps) => {
  return <InputBaseS {...props} />;
};

export default InputBase;
