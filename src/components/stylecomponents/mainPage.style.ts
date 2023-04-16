import styled from 'styled-components';

export const MainPageLayout = styled.div`
  width: 90%;
  min-height: ${({ theme }) => theme.height.vh100};
  margin: ${({ theme }) => theme.margin.center};
`;

export const CategoryRow = styled.div`
  display: flex;
  margin: 20px auto 0 auto;
  width: ${({ theme }) => theme.width.widthFull};
  div + div {
    margin-left: 10px;
  }
`;

export const CategoryBox = styled.div`
  text-align: center;
  cursor: pointer;
  width: calc(20% - 20px);
  margin: 0 auto;
  max-width: 200px;
  div {
    border-radius: 8px;
    background-color: orange;
  }
  p {
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;
