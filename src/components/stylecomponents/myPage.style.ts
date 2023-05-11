import styled from 'styled-components';
import ButtonBase from '@/components/buttons/ButtonBase';
import { FaUserCircle } from 'react-icons/fa';
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

/**
 * @description mypage/uid 의 profileInfo css
 */

export const ProfileInfoBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.GRAY};
  border-radius: 15px;
  margin: 10px 0px;
  padding: 15px 20px;
`;

export const UserProfileIcon = styled(FaUserCircle)`
  font-size: 9rem;
  color: ${({ theme }) => theme.color.GRAY};
`;

export const ProfileBtn = styled(ButtonBase)`
  font-weight: 520;
  padding: 12px 10px;
`;

export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  gap: 1rem;
  > p {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 600;
  }
`;

/**
 * @description profile css
 */

export const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 550;
`;

export const InfoBtn = styled(ButtonBase)`
  font-weight: 550;
  padding: 10px 0;
  min-width: 50px;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 15px;
  padding-left: 11px;
  padding-right: 12px;
`;

export const InfoDetailBox = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.color.GRAY};
  letter-spacing: -0.16px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const InfoName = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 450;
`;

export const InfoBox = styled.div`
  padding: 25px 0 10px 0;
  position: relative;
  border-bottom: 0.75px solid ${({ theme }) => theme.color.GRAY};
  > div {
  }
`;

export const InfoWrapper = styled.div`
  padding-top: 4vh;
  min-width: 480px;
`;
export const ProfileInfoGroupBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PageTitleBox = styled.div`
  padding-bottom: 3vh;
  border-bottom: 2px solid ${({ theme }) => theme.color.BLACK};
`;

export const ProfileLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContentBox = styled.div`
  min-width: 600px;
  margin: 3vh auto;
`;

export const NoItemBox = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.padding.baseY};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.pageTitle};
  font-weight: 700;
`;
