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
     Paused
     Rewatching */

  const content = {
    user: {
      name: "",
      siteUrl: "",
    },
    currentlyWatching: [],
    watchPool: [],
    topBest: [],
    commitToWatch: [],
    details: {
      watching: null,
      planning: null,
      completed: null,
      dropped: null,
      paused: null,
      rewatching: null,
    },
  };

  const response = await fetchGraphQL(gql,);

  content.user.name = response.data.User.name;
  content.user.siteUrl = response.data.User.siteUrl;
  
  response.data.MediaListCollection.lists.forEach((list,) => {
    switch (list.name) {
    case "Watching":
      content.details.watching = list.entries;
      break;
    case "Planning":
      content.details.planning = list.entries;
      break;
    case "Completed":
      content.details.completed = list.entries;
      break;
    case "Dropped":
      content.details.dropped = list.entries;
      break;
    case "Paused":
      content.details.paused = list.entries;
      break;
    case "Rewatching":
      content.details.rewatching = list.entries;
      break;
    default:
      throw new Error(`Unexpected anime list title ${list.name}`,);
    }
  },);

  // Currently Watching
  pushCurrentlyWatching(content,);

  // Watch Pool
  pushWatchPool(content,);

  // Top Best
  pushTopBest(content,);

  // Commit to Watch
  pushCommitToWatch(content,);

  return content;
}

function pushCurrentlyWatching (content,) {
  if (content.details.watching !== null) {
    content.details.watching.forEach((entry,) => {
      if (entry.progress > 0) {
        content.currentlyWatching.push(entry,);
      }
    },);
  }
  if (content.details.rewatching !== null) {
    content.details.rewatching.forEach((entry,) => {
      if (entry.progress > 0) {
        content.currentlyWatching.push(entry,);
      }
    },);
  }
  if (content.currentlyWatching.length === 0) {
    content.currentlyWatching = null;
  }
}

function pushWatchPool (content,) {
  if (content.details.watching !== null) {
    content.details.watching.forEach((entry,) => {
      if (entry.progress === 0) {
        content.watchPool.push(entry,);
      }
    },);
  }
  if (content.watchPool.length === 0) {
    content.watchPool = null;
  }
}

function pushTopBest (content,) {
  if (content.details.completed !== null) {
    content.details.completed.forEach((entry,) => {
      content.topBest.push({
        media: entry.media,
        score: entry.score,
        aggScore: ((entry.score * 10)
            + entry.media.averageScore)
          / 10,
      },);
    },);
  }

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
}

function pushCommitToWatch (content,) {
  if (content.details.planning !== null) {
    const randomIndex = Math.floor(Math.random()
      * content.details.planning.length,);

    content.commitToWatch.push(content.details.planning[randomIndex],);
  }

  if (content.commitToWatch.length === 0) {
    content.commitToWatch = null;
  }
}
