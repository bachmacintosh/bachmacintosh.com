import "../styles/globals.css";
import { DefaultSeo, } from "next-seo";
import { getDefaultSeo, } from "../lib/seo";

function MyApp ({ Component, pageProps, },) {
  const getView = Component.getView || ((page,) => {
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
