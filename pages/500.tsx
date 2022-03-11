import { ErrorCode, Paragraph, } from "../components/layout/Typography";
import DefaultView from "../components/views/DefaultView";
import { NextSeo, } from "next-seo";
import { ReactElement, } from "react";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

export default function Custom500 () {
  const title = "500 Server Error";
  const description = "Whoops. Something went wrong with the server.";
  const router = useRouter();
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} noindex nofollow />
      <ErrorCode>500</ErrorCode>
      <Paragraph indent={false}>
        Whoops. Something went wrong with the server. There might be some kind
        {" "}
        of bug in the code, or maybe it&apos;s just a fluke. Try again in a few
        {" "}
        minutes. If it persists, don&apos;t worry -- I already got a
        {" "}
        notification about it.
      </Paragraph>
    </>
  );
}

Custom500.getView = function getView (page: ReactElement,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};
