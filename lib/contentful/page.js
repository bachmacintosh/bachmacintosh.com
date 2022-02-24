import fetchGraphQL from "./graphql";

const PAGE_GRAPHQL = `
title
slug
description
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

export async function getPage (slug,) {
  const query = `
    query {
      pageCollection(where: { slug: "${slug}" }, preview: false , limit: 1) {
        items {
        ${PAGE_GRAPHQL}
        }
      }
    }
    `;
  const response = await fetchGraphQL(query, false,);
  return extractPage(response,);
}

export async function getPageSlugs () {
  const query = `
    query {
      pageCollection(preview: false) {
        items {
          slug
        }
      }
    }
    `;
  const response = await fetchGraphQL(query, false,);
  return extractPages(response,);
}

export async function getPreviewPage (slug,) {
  const query = `
    query {
      pageCollection(where: { slug: "${slug}" }, preview: true , limit: 1) {
        items {
        ${PAGE_GRAPHQL}
        }
      }
    }
    `;
  const response = await fetchGraphQL(query, true,);
  return extractPage(response,);
}

export async function getPreviewPageSlugs () {
  const query = `
    query {
      pageCollection(preview: true, where: {sys: {publishedAt_exists: false}}) {
        items {
          slug
        }
      }
    }
    `;
  const response = await fetchGraphQL(query, true,);
  return extractPages(response,);
}

function extractPage (fetchResponse,) {
  return fetchResponse?.data?.pageCollection?.items?.[0];
}

function extractPages (fetchResponse,) {
  return fetchResponse?.data?.pageCollection?.items;
}
