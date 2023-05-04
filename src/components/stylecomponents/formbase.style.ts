import styled from 'styled-components';
import ButtonBase from '../buttons/ButtonBase';

interface checkvalidationProps {
  errorCheck?: boolean;
  textLength?: number;
}

export const FormButton = styled(ButtonBase)<checkvalidationProps>`
  margin-top: 20px;
  height: 52px;
  font-weight: 700;
  border-radius: 15px;
  :disabled {
    color: ${({ theme }) => theme.color.WHITE};
    cursor: auto;
  }
`;

export const LogoTitle = styled.h2`
  font-size: 3rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
`;

export const HelpNoticeSection = styled.section`
  min-width: 500px;
  margin-top: 40px;
  border-top: 3px solid;
  padding: 40px 0 30px;
  font-size: ${({ theme }) => theme.fontSize.md};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormLayOut = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 35px auto;
`;

export const FormTitle = styled.h3<checkvalidationProps>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 450;
`;

export const FormItemBox = styled.div`
  margin: 10px 10px 5px 10px;
  padding: ${({ theme }) => theme.padding.inputY};
  //form조건이 안맞을 경우 빨간색
`;

export const FormItem = styled.input<checkvalidationProps>`
  width: 100%;
  height: 38px;
  margin-top: 5px;
  border: 0px solid;
  outline: none;
  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY};

  ::placeholder {
    padding: 3px;
    color: ${({ theme }) => theme.color.GRAY};
    font-weight: 500;
  }

  :focus {
    border-bottom: 1px solid
      ${({ theme, textLength }) => (textLength ? theme.color.BLACK : '')};
  }
`;

export const Wrapper = styled.div`
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
