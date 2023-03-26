import GlobalStyle from '@/styles/GlobalStyle';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import theme from '@/components/stylecomponents/theme';
import Header from '@/components/header/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
