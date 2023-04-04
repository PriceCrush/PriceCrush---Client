import styled from 'styled-components';

/**
 * @description Laytout 영역
 * @description Laytout 영역
 */

export const DetailPageLayout = styled.div`
  display: 100%;
  display: flex;
  padding: ${({ theme }) => `${theme.padding.baseY} ${theme.padding.baseX}`};
  font-size: ${({ theme }) => theme.fontSize.md};
  justify-content: space-between;
  column-gap: 3.125vw;
`;

export const DetailLeftSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const DetailPageImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
  overflow: hidden;
`;

export const DetailRightSection = styled(DetailLeftSection)`
  width: 60%;
  gap: 20px;
`;

export const DetailNameBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  row-gap: 1.5vh;
`;

export const NameBoxRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NameText = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;

export const NameBoxIconBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1vw;
`;

export const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  div {
    display: flex;
    justify-content: space-between;
    column-gap: 12px;
    align-items: center;
  }
`;

export const DetailDescBox = styled(PriceBox)``;

export const PriceText = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
`;

export const TimeDiffBox = styled.div`
  display: flex;
  align-items: center;
`;
