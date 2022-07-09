import type { ContentfulGraphQLResponse, } from "../../additional";

export default async function fetchGraphQL
(query: string, preview = false,): Promise<ContentfulGraphQLResponse> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, },),
    },
  ).then(async (response,) => {
    return response.json();
  },);
}
