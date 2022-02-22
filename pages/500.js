import { ErrorCode, Paragraph, } from "../components/layout/Typography";
import DefaultLayout from "../components/DefaultLayout";
import { NextSeo, } from "next-seo";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

export default function Custom500 () {
  const title = "500 Server Error";
  const description = "Whoops. Something went wrong with the server.";
  const router = useRouter();
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <ErrorCode>500</ErrorCode>
      <Paragraph>
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

Custom500.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};
