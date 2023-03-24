import styled from 'styled-components';

export const MainPageLayout = styled.div`
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
`;

export const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CategoryRow = styled.div`
  display: flex;
  /* justify-content: space-around; */
  margin-top: 20px;
  div + div {
    margin-left: 20px;
  }
`;

export const CategoryBox = styled.div`
  text-align: center;
  cursor: pointer;
  margin: 0 auto;
  div {
    border-radius: 8px;
    background-color: orange;
    padding: 20px 80px;
  }
  p {
    margin-top: 20px;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;
