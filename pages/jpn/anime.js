import {
  Heading1, Heading2, Heading3,
  Hyperlink, Paragraph, TitleLink,
} from "../../components/layout/Typography";
import { Table, TableColumn, TableRow, } from "../../components/layout/Table";
import AniListImage from "../../components/anime/AniListImage";
import DefaultLayout from "../../components/DefaultLayout";
import { NextSeo, } from "next-seo";
import React from "react";
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
          href={anime.user.siteUrl}>
          {anime.user.name}
        </Hyperlink>
      </Paragraph>
      <Heading2>Summary</Heading2>
      <Heading3>Currently Watching</Heading3>
      <Paragraph>
        Anime in my Watching list with 1 or more episodes completed.
      </Paragraph>
      <Heading3>Watch Pool</Heading3>
      <Paragraph>
        The Watch Pool holds anime that is &quot;on deck&quot; to watch in the
        {" "}
        near future. Every time I finish an anime, I roll a six-sided die, and
        {" "}
        the anime in that row number in the Watch Pool becomes the next anime to
        {" "}
        watch. I then use my Commit to Watch tool to pull a random anime from my
        {" "}
        Planning list and move it to the Watch Pool.
      </Paragraph>
      <Table
        headers={["Title", "Format", "Length", "Avg. Score",]}>
        {anime.watchPool === null
          ? <TableRow index={1}>
            <TableColumn colSpan={5}>
              There is no anime in my Watch Pool at this time.
            </TableColumn>
          </TableRow>
          : anime.watchPool.map((item,) => {
            return (
              <React.Fragment key={item.media.title.native}>
                <TableRow index={1}>
                  <TableColumn colSpan={4}>
                    <TitleLink href={item.media.siteUrl}
                      meanings={item.media.title.english === null
                        ? item.media.title.romaji
                        : item.media.title.english}>
                      {item.media.title.native}
                    </TitleLink>
                  </TableColumn>
                </TableRow>
                <TableRow index={1}>
                  <TableColumn rowSpan={2}>
                    <AniListImage src={item.media.coverImage.large}
                      alt={item.media.title.english === null
                        ? item.media.title.romaji
                        : item.media.title.english}
                    />
                  </TableColumn>
                  <TableColumn>
                    <span className="text-sm md:text-base text-white">
                      {(item.media.format
                        .charAt(0,).toUpperCase()
                        + item.media.format.slice(1,))}
                    </span>
                  </TableColumn>
                  <TableColumn>
                    <span className="text-sm md:text-base text-white">
                      {`${item.media.duration} min.`}
                    </span>
                  </TableColumn>
                  <TableColumn>
                    <span className="text-sm md:text-base text-white">
                      {item.media.averageScore / 10}
                    </span>
                  </TableColumn>
                </TableRow>
                <TableRow index={1}>
                  <TableColumn colSpan={3}>
                    <p
                      className="text-sm md:text-base text-white"
                      dangerouslySetInnerHTML={
                        { __html: item.media.description, }
                      } />
                  </TableColumn>
                </TableRow>
              </React.Fragment>
            );
          },)}
      </Table>
      <Heading3>Top 10 Best</Heading3>
      <Paragraph>
        These anime are the best anime that I&apos;ve watched, calculated by
        {" "}
        adding together my personal score and AniLists&apos; Average (weighed)
        {" "}
        Score.
      </Paragraph>
      <hr />
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
