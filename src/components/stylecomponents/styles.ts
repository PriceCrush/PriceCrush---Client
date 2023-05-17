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
  justify-content: center;
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
`;
export const HeaderNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeaderNavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20%;
`;

export const HeaderNavItem = styled.li`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  column-gap: 1vw;
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 3.2rem;
  font-weight: 600;

  cursor: pointer;
  a {
    color: white;
    text-decoration: none;
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
  font-size: 4rem;
  font-family: 'Ubuntu', sans-serif;
  position: absolute;
`;
