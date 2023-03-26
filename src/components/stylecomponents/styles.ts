import styled from 'styled-components';

/**
 * Button Styled Components
 */

interface HeaderProps {
  isScrollDown: boolean;
}
/**
 * @property isScrollDown - 스크롤이 아래로 내려가는지 판별한 값
 * @description 스크롤 다운이 생기면 top이 위로 올라가서 인풋부분만 보입니다. 스크롤 올리면 다시 보입니다.
 */
export const Header = styled.div<HeaderProps>`
  position: fixed;
  top: ${({ theme, isScrollDown }) =>
    isScrollDown ? theme.top.topScrollDown : theme.top.topZero};
  width: 100%;
  height: ${({ theme }) => theme.height.header};
  transition: top 0.3s ease-in-out;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.color.BLACK};
  color: ${({ theme }) => theme.color.WHITE};
  padding-left: ${({ theme }) => theme.padding.baseX};
  padding-right: ${({ theme }) => theme.padding.baseX};
  z-index: ${({ theme }) => theme.zindex.header};

  div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    a {
      color: white;
      text-decoration: none;
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 3vw;
    font-size: 2.4rem;
    line-height: 3.2rem;

    div {
      cursor: pointer;
    }
  }
`;

export const InputBox = styled.div`
  position: relative;
  margin-left: auto;

  input {
    padding: 8px 10px;
    font-size: 1.6rem;
    border-radius: 4px;
  }

  .search-icon {
    position: absolute;
    font-size: 1.6rem;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    color: black;
    cursor: pointer;
  }
`;

export const HeaderGuard = styled.div`
  width: 0;
  height: ${({ theme }) => theme.height.header};
`;

/**
 * 텍스트 Components들
 */
export const LogoTitle = styled.h1`
  font-size: 3rem;
  font-family: 'Ubuntu', sans-serif;
`;

export const NameText = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;

export const PriceText = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
`;
/**
 * /products/[productid] 페이지에서 사용되는 최상위 컴포넌트입니다.
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
  width: 50%;
`;

export const DetailPageImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
  overflow: hidden;
`;

export const DetailRightSection = styled(DetailLeftSection)`
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
