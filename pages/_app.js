import '../styles/globals.css';
import SEO from '../next-seo.config';
import {DefaultSeo,} from "next-seo";

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
