import "../styles/globals.css";
import { DefaultSeo, } from "next-seo";
import { getDefaultSeo, } from "../lib/seo";

function MyApp ({ Component, pageProps, },) {
  const getLayout = Component.getLayout || ((page,) => {
    return page;
  });
  return getLayout(
    <>
      <DefaultSeo {...getDefaultSeo()} />
      <Component {...pageProps} />
    </>,
  );
}

export default MyApp;
