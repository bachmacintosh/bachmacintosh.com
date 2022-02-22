import { ErrorCode, Paragraph, } from "../components/layout/Typography";
import DefaultLayout from "../components/DefaultLayout";
import { NextSeo, } from "next-seo";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

export default function Custom404 () {
  const title = "404 Not Found";
  const description = "The page you were looking for wasn't found.";
  const router = useRouter();
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <ErrorCode>404</ErrorCode>
      <Paragraph>
        The page you were looking for was not found at this URL. This could be
        {" "}
        due to a typo, or if the page was deleted. Either way, fret not, cause
        {" "}
        magical analytical elves have informed me of the error.
      </Paragraph>
    </>
  );
}

Custom404.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};
