import "../styles/globals.css";
import type { ReactElement, ReactNode, } from "react";
import type { AppProps, } from "next/app";
import { DefaultSeo, } from "next-seo";
import type { NextPage, } from "next";
import { getDefaultSeo, } from "../lib/seo";

type NextPageWithLayout = NextPage & {
  getView?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp ({ Component, pageProps, }: AppPropsWithLayout,) {
  const getView = Component.getView ?? ((page,) => {
    return page;
  });
  return getView(
    <>
      <DefaultSeo {...getDefaultSeo()} />
      <Component {...pageProps} />
    </>,
  );
}

export default MyApp;
