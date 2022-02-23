import { Heading1, Paragraph, } from "../components/layout/Typography";
import DefaultLayout from "../components/DefaultLayout";
import { NextSeo, } from "next-seo";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

export default function Home () {
  const title = "Home";
  const description = "The Website of Collin G. Bachman";
  const router = useRouter();
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
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
