import Link from 'next/link';
import styled from 'styled-components';

export const PageButtonSection = styled.section`
  grid-area: pagebutton;
`;

export const SliderSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 50px;
`;
export const ProductSection = styled.section`
  display: flex;
  position: relative;
  padding: 70px 40px 60px 40px;
  margin: 25px auto 0 auto;
  border-top: 1px solid ${({ theme }) => theme.color.GRAY};
  max-width: 1280px;
`;
//
export const ListPageWapper = styled.div``;

//폰트
export const SliderNavLayOut = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY};
  > ul {
    max-width: 1280px;
    display: flex;
  }
`;

export const TabLink = styled(Link)`
  color: #222;
  cursor: pointer;
  display: flex;
  height: 30px;
  text-decoration: none;
`;
