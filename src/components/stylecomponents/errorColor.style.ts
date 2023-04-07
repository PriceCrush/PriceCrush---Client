import { css } from 'styled-components';

interface IStyledComponentProps {
  errorCheck?: boolean;
}

export const errorColorStyle = css<IStyledComponentProps>`
  ${({ theme, errorCheck }) =>
    errorCheck ? theme.color.DEEP_ORANGE : theme.color.BLACK};
`;
