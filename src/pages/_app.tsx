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
