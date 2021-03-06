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
     On Deck
     Completed
     Dropped
     Paused
     Rewatching */

  const content = {
    user: {
      name: "",
      siteUrl: "",
    },
    watching: [],
    onDeck: [],
    topBest: [],
    commitToWatch: [],
    other: {
      planning: null,
      completed: null,
      dropped: null,
      paused: null,
      rewatching: null,
      amvHell: null,
    },
  };

  const response = await fetchGraphQL(gql,);

  content.user.name = response.data.User.name;
  content.user.siteUrl = response.data.User.siteUrl;
  
  response.data.MediaListCollection.lists.forEach((list,) => {
    switch (list.name) {
    case "Watching":
      content.watching = list.entries;
      break;
    case "Planning":
      content.other.planning = list.entries;
      break;
    case "On Deck":
      content.onDeck = list.entries;
      break;
    case "Completed":
      content.other.completed = list.entries;
      break;
    case "Dropped":
      content.other.dropped = list.entries;
      break;
    case "Paused":
      content.other.paused = list.entries;
      break;
    case "Rewatching":
      content.other.rewatching = list.entries;
      break;
    case "AMV Hell (Re)Watches":
      content.other.amvHell = list.entries;
      break;
    default:
      throw new Error(`Unexpected anime list title ${list.name}`,);
    }
  },);

  // Currently Watching
  pushCurrentlyWatching(content,);

  // Top Best
  pushTopBest(content,);

  // Commit to Watch
  await pushCommitToWatch(content,);

  return content;
}

function pushCurrentlyWatching (content,) {
  if (content.other.rewatching !== null) {
    content.other.rewatching.forEach((entry,) => {
      content.watching.push(entry,);
    },);
  }
  if (content.watching.length === 0) {
    content.currentlyWatching = null;
  }
}

/* Old Watch Pool Code
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
}*/

function pushTopBest (content,) {
  if (content.other.completed !== null) {
    content.other.completed.forEach((entry,) => {
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


async function pushCommitToWatch (content,) {
  const url = "https://anime.bcmct.sh/";
  const response = await fetch(url,);
  content.commitToWatch.push(await response.json(),);

  if (content.commitToWatch.length === 0) {
    content.commitToWatch = null;
  }
}
