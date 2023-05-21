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

  padding: ${({ theme }) => `${theme.padding.baseY} ${theme.padding.baseX}`};
`;
export const ProductSection = styled.section`
  width: 100%;
  display: flex;
  position: relative;
  padding: ${({ theme }) => `${theme.padding.baseY} ${theme.padding.baseX}`};
  /* padding: 70px 40px 60px 40px; */
  /* margin: 25px auto 0 auto; */

  border-top: 1px solid ${({ theme }) => theme.color.GRAY};
`;
//
export const ListPageWapper = styled.div`
  margin: 40px auto;
  width: 100%;
`;

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

export const SearchTermWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.padding.baseY} ${theme.padding.baseX}`};
`;

export const SearchTerm = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};

  strong {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
