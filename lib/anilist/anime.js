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

  const content = {
    user: {
      name: "",
      siteUrl: "",
    },
    currentlyWatching: [],
    watchPool: [],
    topBest: [],
    commitToWatch: null,
    details: {
      completed: [],
      planning: [],
      paused: [],
      dropped: [],
    },
  };

  const response = await fetchGraphQL(gql,);

  content.user.name = response.data.User.name;
  content.user.siteUrl = response.data.User.siteUrl;

  // Currently Watching
  response.data.MediaListCollection.lists[0].entries.forEach((entry,) => {
    if (entry.progress > 0) {
      content.currentlyWatching.push(entry,);
    }
  },);
  if (content.currentlyWatching.length === 0) {
    content.currentlyWatching = null;
  }

  // Watch Pool
  response.data.MediaListCollection.lists[0].entries.forEach((entry,) => {
    if (entry.progress === 0) {
      content.watchPool.push(entry,);
    }
  },);
  if (content.watchPool.length === 0) {
    content.watchPool = null;
  }

  // Top Best
  response.data.MediaListCollection.lists[2].entries.forEach((entry,) => {
    content.topBest.push({
      media: entry.media,
      score: entry.score,
      aggScore: ((entry.score * 10)
        + entry.media.averageScore)
        / 10,
    },);
  },);

  if (content.topBest.length === 0) {
    content.topBest = null;
  } else {
    content.topBest.sort((itemA, itemB,) => {
      return itemB.aggScore - itemA.aggScore;
    },);

    if (content.topBest.length > 10) {
      content.topBest.length = 10;
    }
  }

  // Commit to Watch
  const randomIndex = Math.floor(Math.random() * response
    .data.MediaListCollection.lists[1].entries.length,);

  content.commitToWatch = response
    .data.MediaListCollection.lists[1].entries[randomIndex].media;
  return content;
}
