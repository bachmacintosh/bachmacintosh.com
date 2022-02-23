import { Heading1, Paragraph, } from "../components/layout/Typography";
import { NextSeo, WebPageJsonLd, } from "next-seo";
import { getPageJsonLd, getPageSEO, } from "../lib/seo";
import DefaultLayout from "../components/DefaultLayout";
import { useRouter, } from "next/router";

export default function Home () {
  const title = "Home";
  const description = "The Website of Collin G. Bachman";
  const lastreviewed = new Date(2022, 1, 23, 1, 38,);
  const router = useRouter();
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <WebPageJsonLd
        {...getPageJsonLd(title, description, lastreviewed, router,)}
      />
      <Heading1>BachMacintosh</Heading1>
      <Paragraph>
        Something lurks around the corner… on 4/9/22
      </Paragraph>
    </>
  );
}

Home.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};
