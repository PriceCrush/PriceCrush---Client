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

interface CommonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  feedback?: string;
  label?: string;
  inputRef?: React.ForwardedRef<HTMLInputElement>;
}

const CommonInput = ({
  feedback,
  isValid = true,
  inputRef,
  ...props
}: CommonInputProps) => {
  return (
    <>
      <p style={{ display: 'flex' }}>
        <span>{props.label}</span>
        {!isValid && (
          <span style={!isValid && { color: 'red', fontSize: '1.2rem' }}>
            {feedback}
          </span>
        )}
      </p>
      <StyleInput ref={inputRef} isValid={isValid} {...props} />
    </>
  );
};
export default CommonInput;
