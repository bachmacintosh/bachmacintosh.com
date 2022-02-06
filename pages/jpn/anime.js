import {
  Heading1, Heading2,
  Hyperlink, Paragraph,
} from "../../components/layout/Typography";
import DefaultLayout from "../../components/DefaultLayout";
import { NextSeo, } from "next-seo";
import { getAnime, } from "../../lib/anilist/anime";

export default function Anime ({ anime, },) {
  return (
    <>
      <NextSeo
        title="Anime"
        description="Fun facts about Collin Bachman's anime watching habits."
      />
      <Heading1>Anime</Heading1>
      <Paragraph>You can check out more info on my AniList profile:
        {" "}
        <Hyperlink
          external={true}
          href={anime.User.siteUrl}>
          {anime.User.name}
        </Hyperlink>
      </Paragraph>
      <Heading2>Currently Watching</Heading2>
      <Paragraph>
        Anime in my Watching list with 1 or more episodes completed.
      </Paragraph>
      <hr />
      <Heading2>Watch Pool</Heading2>
    </>
  );
}

Anime.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps () {
  const anime = await getAnime();
  return { props: { anime, }, };
}
