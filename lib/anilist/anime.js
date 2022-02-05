import fetchGraphQL from "./graphql";

export async function getAnime () {
  const gql = `
  query {
  MediaListCollection(userId: 122750, type: ANIME sort: STATUS) {
    lists {
      name
      entries {
        media {
          coverImage {
            medium
            large
          }
          title {
            native
            romaji
            english
          }
          description
          episodes
          duration
          format
          averageScore
          studios {
            edges {
              id
              isMain
              node {
                name
              }
            }
          }
          siteUrl
        }
        progress
        score
      }
    }
  }
  User(id: 122750) {
      name,
      siteUrl
  }
}
  `;

  /* Lists are returned in this order:
     Watching
     Planning
     Completed
     Dropped
     Paused */

  const response = await fetchGraphQL(gql,);
  return response.data;
}
