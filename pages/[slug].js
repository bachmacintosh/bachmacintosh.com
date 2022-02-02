import { getPage, getPageSlugs, getPreviewPage, } from "../lib/contentful/page";
import DefaultLayout from "../components/DefaultLayout";
import { NextSeo, } from "next-seo";
import React from "react";
import RichText from "../components/contentful/RichText";
import Warning from "../components/layout/Warning";

export default function Page ({ page, preview, },) {
  return (
    <>
      <NextSeo
        title={page.title}
        description={page.description}
      />
      {preview &&<Warning title="Preview Mode">
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
    paths: slugs?.map(({ slug, },) => `/${slug}`,) ?? [],
    fallback: false,
  };
}
