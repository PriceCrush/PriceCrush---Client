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

export const DetailLeftSectionRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DetailRightSection = styled(DetailLeftSection)`
  width: 60%;
  row-gap: 4vh;
  padding-top: 15px;
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

export const DetailDescBox = styled(PriceBox)`
  row-gap: 2vh;
  span {
    color: gray;
  }
`;

export const PriceText = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
`;

export const TimeDiffBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;

  h3 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 500;

    &.timeRemain {
      font-size: ${({ theme }) => theme.fontSize.xl};
      color: ${({ theme }) => theme.color.DEEP_ORANGE};
    }
  }
`;

export const CurrentPriceBox = styled(TimeDiffBox)``;

export const AuctionFormLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 12px;
  align-items: center;

  input {
    width: 60%;
  }
  button {
    width: 20%;
  }
`;

export const NotAvailableBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: gray;
  }
`;
