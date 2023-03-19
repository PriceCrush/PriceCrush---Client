import styled from 'styled-components';

const TempCon = styled.div`
  width: 100%;
  height: 100vh;
  font-color: black;
  background: var(--custom-orange);
`;

export default function Home() {
  return (
    <main>
      <TempCon>hello there</TempCon>
    </main>
  );
}
