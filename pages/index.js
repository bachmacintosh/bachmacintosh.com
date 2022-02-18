import { Heading1, Paragraph, } from "../components/layout/Typography";
import DefaultLayout from "../components/DefaultLayout";
import { NextSeo, } from "next-seo";

export default function Home () {
  return (
    <>
      <NextSeo
        title="Home"
        description="A short description goes here."
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
