import styled from 'styled-components';

/**
 * @description Layout 영역
 */

export const EndAuctionLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: space-between;
`;

/**
 * @description Box 영역
 */

export const DescriptionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 5px;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  alint-items: center;
  justify-content: center;
  margin-top: 5%;
  gap: 10%;
`;

/**
 * @description Text 영역
 */

export const DescriptionText = styled.span`
  color: black;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;

export const PriceText = styled(DescriptionText)`
  font-style: italic;
  text-decoration: underline;
`;
