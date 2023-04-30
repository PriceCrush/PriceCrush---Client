import { forwardRef } from 'react';
import styled from 'styled-components';

const StyleInput = styled.input<CommonInputProps>`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  font-size: 1.6rem;
  margin-bottom: 10px;
  border-radius: 4px;
  border: ${({ isValid }) =>
    isValid ? '1px solid #e5e5e5' : '1px solid #f00'};
  &:focus {
    outline: none;
    border: ${({ isValid }) => (isValid ? '1px solid #000' : '1px solid #f00')};
  }
  & + label {
    color: #000;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  feedback?: string;
  label?: string;
}

const CommonInput = forwardRef<HTMLInputElement, CommonInputProps>(
  ({ feedback, isValid = true, ...props }, ref) => {
    return (
      <InputWrapper>
        <p style={{ display: 'flex' }}>
          <span>{props.label}</span>
          {!isValid && (
            <span style={!isValid && { color: 'red', fontSize: '1.2rem' }}>
              {feedback}
            </span>
          )}
        </p>
        <StyleInput ref={ref} isValid={isValid} {...props} />
      </InputWrapper>
    );
  }
);

CommonInput.displayName = 'CommonInput';
export default CommonInput;
