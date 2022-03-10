import "../styles/globals.css";
import { ReactElement, ReactNode, } from "react";
import type { AppProps, } from "next/app";
import { DefaultSeo, } from "next-seo";
import { NextPage, } from "next";
import { getDefaultSeo, } from "../lib/seo";

type NextPageWithLayout = NextPage & {
    // eslint-disable-next-line no-unused-vars
    getView?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

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
