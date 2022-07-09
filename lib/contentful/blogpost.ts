import type {
  ContentfulBlogPost,
  ContentfulGraphQLResponse, ContentfulSlug,
} from "../../additional";
import fetchGraphQL from "./graphql";

const BLOG_POST_GRAPHQL = `
title
slug
publishDate
updateDate
notSafeForWork
notSafeForWorkContext
spoilers
spoilerContext
coverImage {
  url
  width
  height
  description
}
summary
`;

const BLOG_CONTENT_GRAPHQL = `
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        title
        description
        width
        height
      }
    }
    entries {
        hyperlink {
          sys {
            id
          }
          __typename
          ... on Page {
            title
            slug
          }
          ... on BlogPost {
            title
            slug
          }
        }
      }
  }
}
`;

export async function getBlogPost (slug: string[] | string | undefined,): Promise<ContentfulBlogPost | undefined> {
  const query = `
  query {
    blogPostCollection(where: {slug: "${slug}"}, preview: false, limit: 1) {
      items {
        ${BLOG_POST_GRAPHQL}
        ${BLOG_CONTENT_GRAPHQL}
      }
    }
  }
  `;
  const response = await fetchGraphQL(query, false,);
  return extractBlogPost(response,);
}

export async function getBlogPostSlugs () {
  const query = `
    query {
      blogPostCollection(preview: false, limit: 10, order: publishDate_DESC) {
        items {
          slug
        }
      }
    }
    `;
  const response = await fetchGraphQL(query, false,);
  return extractBlogPostSlugs(response,);
}

export async function getPreviewBlogPost
(slug: string[] | string | undefined,) {
  const query = `
  query {
    blogPostCollection(where: {slug: "${slug}"}, preview: true, limit: 1) {
      items {
        ${BLOG_POST_GRAPHQL}
        ${BLOG_CONTENT_GRAPHQL}
      }
    }
  }
  `;
  const response = await fetchGraphQL(query, true,);
  return extractBlogPost(response,);
}

export async function getBlogPagePosts () {
  const query = `
  query {
    blogPostCollection(preview: false, limit: 10, order: publishDate_DESC) {
      items {
        ${BLOG_POST_GRAPHQL}
      }
    }
  }
  `;
  const response = await fetchGraphQL(query, false,);
  return extractBlogPosts(response,);
}

export async function getHomePageBlogPosts () {
  const query = `
  query {
    blogPostCollection(preview: false, limit: 1, order: publishDate_DESC) {
      items {
        ${BLOG_POST_GRAPHQL}
      }
    }
  }
  `;
  const response = await fetchGraphQL(query, false,);
  return extractBlogPosts(response,);
}

export async function getBlogArchivePosts
(page: string[] | string | undefined,) {
  let pageNum = 0;
  if (typeof page === "string") {
    pageNum = parseInt(page, 10,);
  }
  if (pageNum < 1) {
    throw Error("Invalid Archive Page Number",);
  }
  const query = `
  query {
    blogPostCollection(preview: false, limit: 10, skip: ${pageNum * 10} order: publishDate_DESC) {
      items {
        ${BLOG_POST_GRAPHQL}
      }
    }
  }
  `;
  const response = await fetchGraphQL(query, false,);
  return extractBlogPosts(response,);
}

export async function getTotalBlogPosts () {
  const query = `
  query {
    blogPostCollection {
      total
    }
  }
  `;
  const response = await fetchGraphQL(query, false,);
  return response.data?.blogPostCollection?.total;
}

function extractBlogPost (fetchResponse: ContentfulGraphQLResponse,): ContentfulBlogPost | undefined {
  return <ContentfulBlogPost>
      fetchResponse.data?.blogPostCollection?.items?.[0];
}

function extractBlogPosts (fetchResponse: ContentfulGraphQLResponse,): ContentfulBlogPost[] | undefined {
  return <ContentfulBlogPost[]>
      fetchResponse.data?.blogPostCollection?.items;
}

function extractBlogPostSlugs (fetchResponse: ContentfulGraphQLResponse,): ContentfulSlug[] | undefined {
  return <ContentfulBlogPost[]>
      fetchResponse.data?.blogPostCollection?.items;
}
