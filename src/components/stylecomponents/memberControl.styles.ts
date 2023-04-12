import styled from 'styled-components';
import ButtonBase from '../buttons/ButtonBase';
import { css } from 'styled-components';

interface checkvalidationProps {
  errorCheck?: boolean;
  textLength?: number;
}

interface FormItemBoxProps {
  errorCheck?: boolean;
}

interface IStyledComponentProps {
  errorCheck?: boolean;
}

export const errorColorStyle = css<IStyledComponentProps>`
  ${({ theme, errorCheck }) =>
    errorCheck ? theme.color.DEEP_ORANGE : theme.color.BLACK};
`;

export const LoginFormLayOut = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 35px auto;
`;

export const FormItemTitle = styled.h3<checkvalidationProps>`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 450;
  color: ${({ theme, errorCheck, textLength }) =>
    textLength ? errorColorStyle : theme.color.BLACK};
`;

export const FormItemIdTitle = styled(FormItemTitle)`
  color: ${({ theme }) => theme.color.BLACK};
`;

export const FormItemBox = styled.div<FormItemBoxProps>`
  height: 80px;
  margin: ${({ theme }) => theme.margin.baseMargin};
  padding: ${({ theme }) => theme.padding.inputY};
  > span {
    display: ${(props) => (props.errorCheck ? '' : 'none')};
    color: ${({ theme }) => theme.color.DEEP_ORANGE};
  }
  //form조건이 안맞을 경우 빨간색
`;

export const FormItem = styled.input<checkvalidationProps>`
  width: 100%;
  height: 38px;
  margin: 10px 0;
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
      ${({ theme, errorCheck, textLength }) =>
        textLength ? errorColorStyle : theme.color.BLACK};
  }
`;

// 로그인창에 입력이 다 안됬거나
// 비밀번호에 오류가 나온다면
// disable
export const LoginButton = styled(ButtonBase)<checkvalidationProps>`
  margin-top: 20px;
  height: 52px;
  font-weight: 700;
  border-radius: 15px;
  :disabled {
    color: ${({ theme }) => theme.color.WHITE};
  }
`;

export const MemberNavList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 30px;

  li:nth-child(2) {
    padding: 0px 25px;
    border-right: 1.5px solid ${({ theme }) => theme.color.GRAY};
    border-left: 1.5px solid ${({ theme }) => theme.color.GRAY};
  }
`;

export const Item = styled.li`
  font-size: ${({ theme }) => theme.fontSize.md};
  margin: 0 10px;
  > a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`;
