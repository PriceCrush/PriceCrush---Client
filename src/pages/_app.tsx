import GlobalStyle from '@/styles/GlobalStyle';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '@/components/stylecomponents/theme';
import Header from '@/components/header/Header';
import Fab from '@/components/floatingactionbutton/Fab';
import { RecoilRoot } from 'recoil';
import ModalBase from '@/components/modals/ModalBase';
import { socket, SocketContext } from '@/contexts/socket';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <SocketContext.Provider value={socket}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
            <Fab />
            <ModalBase />
          </ThemeProvider>
        </SocketContext.Provider>
      </RecoilRoot>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  /**
   * @description 로그인이 안된 상태에서 접근 시 로그인 페이지로 이동
   */
  // console.log(`context.req.cookies : ${context.req.cookies}`);
  console.log(`dd`);
  const { accessToken } = context.req.cookies;
  console.log(accessToken);
  return {
    props: {},
    // props: {
    //   accessToken,
    // },
  };
};
