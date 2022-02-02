import "../styles/globals.css";
import { DefaultSeo, } from "next-seo";
import SEO from "../next-seo.config";

function MyApp({ Component, pageProps, },) {
  const getLayout = Component.getLayout || ((page,) => page);
  return getLayout(
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>,
  );
}

export default MyApp;
