import type {
  ContentfulGraphQLResponse,
  ContentfulPage, ContentfulSlug,
} from "../../additional";
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

export async function getPage
(slug: string,): Promise<ContentfulPage | undefined> {
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

export async function getPageSlugs (): Promise<ContentfulSlug[] | undefined> {
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
  return extractPageSlugs(response,);
}

export async function getPreviewPage
(slug: string,): Promise<ContentfulPage | undefined> {
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

function extractPage
(fetchResponse: ContentfulGraphQLResponse,): ContentfulPage | undefined {
  return fetchResponse.data?.pageCollection?.items?.[0] as ContentfulPage;
}

function extractPageSlugs
(fetchResponse: ContentfulGraphQLResponse,): ContentfulSlug[] | undefined {
  return fetchResponse.data?.pageCollection?.items;
}
