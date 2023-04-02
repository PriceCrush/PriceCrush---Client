import styled from 'styled-components';

/**
 * @description Types 영역
 * @description Types 영역
 */

interface FilterTitleProps {
  selected?: boolean;
}

/**
 * @description Layout 영역
 */

export const MyPageLayout = styled.div`
  height: calc(100vh - ${({ theme }) => theme.height.header});
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.padding.baseY} ${theme.padding.baseX}`};
  gap: 20px;
`;

export const AuctionCardItemLayout = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 15% 1fr 20%;
  grid-template-rows: 1fr;
  grid-template-areas: 'image info';
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.GRAY};
  padding: 20px;
  gap: 20px;
  cursor: pointer;
  user-select: none;
`;

/**
 * @description 텍스트 영역
 */

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.pageTitle};
  font-weight: 700;
`;

export const FilterTitle = styled.h2<FilterTitleProps>`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ selected }) => (selected ? '700' : '500')};
  white-space: nowrap;
  cursor: pointer;
  color: ${({ selected, theme }) =>
    selected ? theme.color.DEEP_ORANGE : theme.color.BLACK};

  @media (max-width: 1200px) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const FilterProgressTitle = styled(FilterTitle)``;

export const CardTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  @media (max-width: 1200px) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const CardPrice = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  @media (max-width: 1200px) {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const CardDate = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 400;
  color: ${({ theme }) => theme.color.GRAY};
`;

export const CardStatus = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
`;

/**
 * @description  Wrapper 영역
 */

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/**
 * @description Row 영역
 */

export const FilterRow = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
`;

export const CardInfoRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/**
 * @description Cols 영역
 */

export const FilterCol = styled(FilterRow)``;

/**
 * @description Box 영역
 */
export const CardImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-items: center;
  align-items: center;
  position: relative;
  border-radius: 10%;
  overflow: hidden;
`;

export const CardInfoBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardStatusBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3%;
  box-sizing: border-box;
  user-select: none;
`;
