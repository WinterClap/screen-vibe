import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import useAppTheme from "../src/hooks/useAppTheme";
import { Provider } from "react-redux";
import { store } from "../src/store";
import GlobalStyle from "../styles/globalStyles";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { theme } = useAppTheme();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default function AppWrapper(props: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}
