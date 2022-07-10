import type { ContentfulBlogPost, } from "../../additional";
import type { NextRouter, } from "next/router";
import type { NextSeoProps, } from "next-seo";

export function getDefaultSeo (): NextSeoProps {
  return {
    titleTemplate: "%s | BachMacintosh",
    defaultTitle: "BachMacintosh",
    twitter: {
      cardType: "summary",
      site: "@BachMacintosh",
      handle: "@BachMacintosh",
    },
    openGraph: {
      type: "website",
      title: "BachMacintosh",
      // eslint-disable-next-line camelcase
      site_name: "BachMacintosh",
      url: process.env.baseUrl,
      images: [
        {
          url: "https://images.ctfassets.net/kv526tbd0cl9/5dATXnPIZ9cP6EhlClNenX/bf3a70ca5dade5c4e36dc7c08d3f699a/discord_icon.png?w=256&h=256",
          width: 256,
          height: 256,
          alt: "BachMacintosh.com",
        },
      ],
    },
  };
}

export function getPageSEO (title: string,
  description: string, router: NextRouter, preview = false,): NextSeoProps {
  if (typeof process.env.baseUrl === "undefined") {
    throw new Error("Base URL not set! Cannot build SEO!",);
  }
  return {
    title,
    description,
    canonical: `${process.env.baseUrl}${router.asPath}`,
    noindex: preview,
    nofollow: preview,
    twitter: {
      cardType: "summary",
      site: "@BachMacintosh",
      handle: "@BachMacintosh",
    },
    openGraph: {
      title,
      url: process.env.baseUrl + router.asPath,
    },
  };
}

export function getBlogPostSeo (post: ContentfulBlogPost,
  router: NextRouter,
  preview = false,): NextSeoProps {
  if (typeof process.env.baseUrl === "undefined") {
    throw new Error("Base URL not set! Cannot build SEO!",);
  }
  const twitter = {
    cardType: "summary_large_image",
    site: "@BachMacintosh",
    handle: "@BachMacintosh",
  };
  const images = typeof post.coverImage === "undefined"
    ? [
      {
        url: "https://images.ctfassets.net/kv526tbd0cl9/5dATXnPIZ9cP6EhlClNenX/bf3a70ca5dade5c4e36dc7c08d3f699a/discord_icon.png?w=256&h=256",
        width: 256,
        height: 256,
        alt: "BachMacintosh.com",
      },
    ]
    : [
      {
        url: post.coverImage.url,
        width: 1280,
        height: 320,
        alt: post.coverImage.description,
      },
    ];
  const openGraph = {
    title: post.title,
    url: process.env.baseUrl + router.asPath,
    type: "article",
    article: { publishedTime: post.publishDate, modifiedTime: "", },
    images,
  };
  if (typeof post.coverImage === "undefined") {
    twitter.cardType = "summary";
  }
  if (post.updateDate !== "") {
    openGraph.article.modifiedTime = post.updateDate;
  }
  return {
    title: post.title,
    description: post.summary,
    canonical: process.env.baseUrl + router.asPath,
    noindex: preview,
    nofollow: preview,
    twitter,
    openGraph,
  };
}
