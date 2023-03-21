import styled from 'styled-components';
import { AiFillAccountBook } from 'react-icons/ai';
import * as S from '@/components/stylecomponents/styles';
import COLOR from '@/colors/color';
import Link from 'next/link';

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
        <Link href={'/products/123'}>디테일 페이지로</Link>
        <div>
          <S.ButtonBase variant="warning" size="xl">
            wow
          </S.ButtonBase>
        </div>
      </TempCon>
    </main>
  );
}
