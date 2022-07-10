import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import type { GetStaticPaths, GetStaticProps, } from "next";
import { getPage, getPageSlugs, getPreviewPage, } from "../lib/contentful/page";
import type { ContentfulPage, } from "../additional";
import LongContentView from "../components/views/LongContentView";
import React from "react";
import type { ReactElement, } from "react";
import RichText from "../components/contentful/RichText";
import Warning from "../components/layout/Warning";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

interface PageProps {
  page: ContentfulPage;
  preview: boolean;
}

export default function Page ({ page, preview, }: PageProps,): ReactElement {
  if (typeof process.env.baseUrl === "undefined") {
    throw new Error("Base URL not set! Cannot build pages!",);
  }
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
  if (preview && typeof params?.slug === "string") {
    page = await getPreviewPage(params.slug,);
  } else if (typeof params?.slug === "string") {
    page = await getPage(params.slug,);
  }

  if (typeof page === "undefined") {
    return { notFound: true, };
  }

  return {
    props: {
      preview,
      page,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPageSlugs();

  return {
    paths: slugs?.map(({ slug, },) => {
      if (typeof slug === "undefined") {
        throw new Error("Missing slug on ContentfulSlug collection!",);
      } else {
        return `/${slug}`;
      }
    },) ?? [],
    fallback: "blocking",
  };
};
