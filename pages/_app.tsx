import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import useAppTheme from "../src/hooks/useAppTheme";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { theme } = useAppTheme();
  const getLayout = Component.getLayout ?? ((page) => page);

  return <ThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>;
}
