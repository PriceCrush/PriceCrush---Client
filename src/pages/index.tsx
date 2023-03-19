import styled from 'styled-components';

const TempCon = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--custom-orange);
  font-size: 3rem;
`;

export default function Home() {
  return (
    <main>
      <TempCon>프리텐다드</TempCon>
    </main>
  );
}
