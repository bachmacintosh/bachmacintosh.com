import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import { GetStaticPaths, GetStaticProps, } from "next";
import React, { ReactElement, } from "react";
import { getPage, getPageSlugs, getPreviewPage, } from "../lib/contentful/page";
import { ContentfulPage, } from "../additional";
import LongContentView from "../components/views/LongContentView";
import RichText from "../components/contentful/RichText";
import Warning from "../components/layout/Warning";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

type PageProps = {
  page: ContentfulPage,
  preview: boolean,
};

export default function Page ({ page, preview, }: PageProps,) {
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
      <NextSeo {...getPageSEO(title, description, router, preview,)} />
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

Page.getView = function getView (page: ReactElement,) {
  return (
    <LongContentView>
      {page}
    </LongContentView>
  );
};

export const getStaticProps: GetStaticProps = async (
  { params, preview = false, },
) => {
  let page = null;
  if (preview) {
    page = await getPreviewPage(params?.slug,);
  } else {
    page = await getPage(params?.slug,);
  }

  if (typeof page === "undefined") {
    return { notFound: true, };
  }

  return {
    props: {
      preview,
      page: page ?? null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPageSlugs();

  return {
    paths: slugs?.map(({ slug, },) => {
      return `/${slug}`;
    },) ?? [],
    fallback: "blocking",
  };
};
