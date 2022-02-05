export default async function fetchGraphQL (query,) {
  return fetch(
    "https://graphql.anilist.co/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify({ query, },),
    },
  ).then((response,) => {
    return response.json();
  },);
}
