import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  getBlogPost, getBlogPostSlugs,
  getPreviewBlogPost,
} from "../../../lib/contentful/blogpost";
import DefaultLayout from "../../../components/DefaultLayout";
import React from "react";
import RichText from "../../../components/contentful/RichText";
import Warning from "../../../components/layout/Warning";
import { getBlogPostSeo, } from "../../../lib/seo";
import { useRouter, } from "next/router";

export default function BlogPost ({ post, preview, },) {
  const { title, } = post;
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: "Blog",
      item: `${process.env.baseUrl}/blog`,
    },
    {
      position: 3,
      name: title,
      item: process.env.baseUrl + router.asPath,
    },
  ];
  return (
    <>
      <NextSeo {...getBlogPostSeo(post, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      {preview && <Warning title="Preview Mode">
        This content has not been published yet.
        {` `}
        Make sure to publish it before going live.
      </Warning>}
      <RichText content={post.content} indentParagraphs={true} />
    </>
  );
}

BlogPost.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps ({ params, preview = false, },) {
  let post = null;
  if (preview) {
    post = await getPreviewBlogPost(params.slug,);
  } else {
    post = await getBlogPost(params.slug,);
  }

  if (typeof post === "undefined") {
    return { notFound: true, };
  }
  
  return {
    props: {
      preview,
      post: post ?? null,
    },
  };
}

export async function getStaticPaths () {
  const paths = [];
  const slugs = await getBlogPostSlugs();
  slugs.forEach((item,) => {
    paths.push({ params: { slug: item.slug, }, },);
  },);
  return {
    paths,
    fallback: "blocking",
  };
}
