import fetchGraphQL from "./graphql";

const BLOG_POST_GRAPHQL = `
title
slug
publishDate
updateDate
notSafeForWork
spoilers
spoilerName
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
        description
        width
        height
      }
    }
  }
}
`;

export async function getBlogPost (slug,) {
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
  return extractBlogPosts(response,);
}

export async function getPreviewBlogPost (slug,) {
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

export async function getPreviewBlogPostSlugs () {
  const query = `
    query {
      blogPostCollection(preview: true, where: {sys: {publishedAt_exists: false}}) {
        items {
          slug
        }
      }
    }
    `;
  const response = await fetchGraphQL(query, true,);
  return extractBlogPosts(response,);
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

export async function getBlogArchivePosts (page,) {
  const pageNum = parseInt(page, 10,);
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
  return response?.data?.blogPostCollection?.total;
}

function extractBlogPost (fetchResponse,) {
  return fetchResponse?.data?.blogPostCollection?.items?.[0];
}

function extractBlogPosts (fetchResponse,) {
  return fetchResponse?.data?.blogPostCollection?.items;
}
