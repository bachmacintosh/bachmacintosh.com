import fetchGraphQL from './graphql';

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
      }
    }
  }
}
`;

export async function getPage(slug, preview = false) {
    const query = `
    query {
      pageCollection(where: { slug: "${slug}" }, preview: ${preview ? 'true': 'false'} , limit: 1) {
        items {
        ${PAGE_GRAPHQL}
        }
      }
    }
    `;
    const response = await fetchGraphQL(query, preview);
    return extractPage(response);
}

export async function getPageSlugs() {
    const query = `
    query {
      pageCollection(preview: false) {
        items {
          slug
        }
      }
    }
    `;
    const response = await fetchGraphQL(query, false);
    return extractPages(response);
}

function extractPage(fetchResponse) {
    return fetchResponse?.data?.pageCollection?.items?.[0];
}

function extractPages(fetchResponse) {
    return fetchResponse?.data?.pageCollection?.items;
}