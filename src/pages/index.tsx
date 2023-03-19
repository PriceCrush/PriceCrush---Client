import styled from 'styled-components';
import { AiFillAccountBook } from 'react-icons/ai';

const TempCon = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--custom-orange);
  font-size: 3rem;
`;

export default function Home() {
  return (
    <main>
      <TempCon>
        PriceCrush 프로젝트 Client <AiFillAccountBook />
      </TempCon>
    </main>
  );
}
