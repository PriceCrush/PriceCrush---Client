import styled from 'styled-components';
import { AiFillAccountBook } from 'react-icons/ai';
import * as S from '@/components/stylecomponents/styles';
import COLOR from '@/colors/color';

const TempCon = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${COLOR.GRAY};
  font-size: 3rem;
`;

export default function Home() {
  return (
    <main>
      <TempCon>
        <span>
          PriceCrush 프로젝트 Client <AiFillAccountBook />
        </span>
        <div>
          <S.ButtonBase size="xl">wow</S.ButtonBase>
        </div>
      </TempCon>
    </main>
  );
}
