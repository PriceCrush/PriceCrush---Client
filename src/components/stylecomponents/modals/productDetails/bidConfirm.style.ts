import styled from 'styled-components';

/**
 * @description Layout 영역
 * @description Layout 영역
 */

export const BidConfirmLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

/**
 * @description Box 영역
 * @description Box 영역
 */
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

/**
 * @description Text 영역
 * @description Text 영역
 */

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

export const Price = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};

  strong {
    font-weight: bold;
  }
`;
