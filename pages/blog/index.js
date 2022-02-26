import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1,
  Paragraph,
} from "../../components/layout/Typography";
import DefaultLayout from "../../components/DefaultLayout";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function Blog () {
  const title = "Blog";
  const description = "Collin G. Bachman's latest blog posts";
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: title,
      item: process.env.baseUrl + router.asPath,
    },
  ];
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      <Heading1>
        Blog
      </Heading1>
      <Paragraph indent={false}>
        This is where I sometimes share my personal thoughts, usually cause I
        {" "}
        want to share them with a broader audience than just my friends, or
        {" "}
        it is long-form content that isn&apos;t suitable for Facebook or
        {" "}
        Twitter. It gets updated when it gets updated; I make zero promises on
        {" "}
        that.
      </Paragraph>
      <Paragraph indent={false}>
        This page shows the 10 most recent posts; for more, visit the Archive.
      </Paragraph>
      <hr className="mb-5" />
      <div className="max-w-4xl mx-auto">
        <Paragraph>Posts</Paragraph>
      </div>
    </>
  );
}

Blog.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};
