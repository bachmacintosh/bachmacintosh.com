import { ErrorCode, Paragraph, } from "../components/layout/Typography";
import DefaultLayout from "../components/DefaultLayout";
import { NextSeo, } from "next-seo";

export default function Custom500 () {
  return (
    <>
      <NextSeo
        title="500 Server Error"
        description="Whoops. Something went wrong with the server."
      />
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
