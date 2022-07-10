import { ErrorCode, Paragraph, } from "../components/layout/Typography";
import DefaultView from "../components/views/DefaultView";
import { NextSeo, } from "next-seo";
import type { ReactElement, } from "react";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

export default function Custom404 (): ReactElement {
  const title = "404 Not Found";
  const description = "The page you were looking for wasn't found.";
  const router = useRouter();
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} noindex nofollow />
      <ErrorCode>404</ErrorCode>
      <Paragraph indent={false}>
        The page you were looking for was not found at this URL. This could be
        {" "}
        due to a typo, or if the page was deleted. Either way, fret not, cause
        {" "}
        magical analytical elves have informed me of the error.
      </Paragraph>
    </>
  );
}

Custom404.getView = function getView (page: ReactElement,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};
