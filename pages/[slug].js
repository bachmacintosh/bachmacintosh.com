import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import { getPage, getPageSlugs, getPreviewPage, } from "../lib/contentful/page";
import DefaultLayout from "../components/DefaultLayout";
import React from "react";
import RichText from "../components/contentful/RichText";
import Warning from "../components/layout/Warning";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

export default function Page ({ page, preview, },) {
  const { title, description, } = page;
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: title,
      item: `${process.env.baseUrl}/${page.slug}`,
    },
  ];

  const router = useRouter();
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      {preview && <Warning title="Preview Mode">
        This content has not been published yet.
        {` `}
        Make sure to publish it before going live.
      </Warning>}
      <RichText content={page.content} indentParagraphs={true} />
    </>
  );
}

Page.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps ({ params, preview = false, },) {
  let page = null;
  if (preview) {
    page = await getPreviewPage(params.slug,);
  } else {
    page = await getPage(params.slug,);
  }

  return {
    props: {
      preview,
      page: page ?? null,
    },
  };
}

export async function getStaticPaths () {
  const slugs = await getPageSlugs();

  return {
    paths: slugs?.map(({ slug, },) => {
      return `/${slug}`;
    },) ?? [],
    fallback: false,
  };
}
