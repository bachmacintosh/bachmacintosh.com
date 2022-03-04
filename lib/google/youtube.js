export async function getLatestYouTubeVideo () {
  const uri = `playlistItems?part=snippet&playlistId=${process.env.YOUTUBE_PLAYLIST_ID}&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`;
  const response = await fetchYouTube(uri,);
  return extractYouTubeVideo(response,);
}

async function fetchYouTube (uri, ) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/${uri}`;

  return fetch(apiUrl,).then((response,) => {
    return response.json();
  },);
}

function extractYouTubeVideo (fetchResponse, ) {
  return fetchResponse?.items?.[0]?.snippet?.resourceId?.videoId;
}
