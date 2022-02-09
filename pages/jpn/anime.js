import {
  Heading1, Heading2, Heading3,
  Hyperlink, Paragraph, TitleLink,
} from "../../components/layout/Typography";
import { Table, TableColumn, TableRow, } from "../../components/layout/Table";
import AniListImage from "../../components/anime/AniListImage";
import DefaultLayout from "../../components/DefaultLayout";
import { Disclosure, } from "@headlessui/react";
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
      <Paragraph>
        These sections contain summarized data from the Watching and Completed
        {" "}
        anime lists.
      </Paragraph>
      <Disclosure defaultOpen="open">
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading3>[{open ? "-" : "+"}] Currently Watching</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                Anime in my Watching list with 1 or more episodes completed.
              </Paragraph>
              <Table
                headers={[
                  "Title",
                  "Format",
                  "Length",
                  "Progress",
                  "Avg. Score",
                ]}>
                {anime.currentlyWatching === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={5}>
                      I am not watching any anime at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.currentlyWatching.map((item,) => {
                    return (
                      <React.Fragment key={item.media.title.native}>
                        <TableRow index={1}>
                          <TableColumn colSpan={5}>
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
                              {`${item.progress} / ${item.media.episodes}`}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.averageScore / 10}
                            </span>
                          </TableColumn>
                        </TableRow>
                        <TableRow index={1}>
                          <TableColumn colSpan={5}>
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
            </Disclosure.Panel>
          </>;
        }}
      </Disclosure>
      <br />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading3>[{open ? "-" : "+"}] Watch Pool</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                The Watch Pool holds anime that is &quot;on deck&quot; to watch
                {" "}
                in the near future. Every time I finish an anime, I roll a
                {" "}
                six-sided die, and the anime in that row number in the Watch
                {" "}
                Pool becomes the next anime to watch. I then use my Commit to
                {" "}
                Watch tool to pull a random anime from my Planning list and move
                {" "}
                it to the Watch Pool.
              </Paragraph>
              <Table
                headers={["Title", "Format", "Length", "Avg. Score",]}>
                {anime.watchPool === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={4}>
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
            </Disclosure.Panel>
          </>;
        }}
      </Disclosure>
      <br />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading3>[{open ? "-" : "+"}] Top 10 Best</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                These anime are the best anime that I&apos;ve watched,
                {" "}
                calculated by adding together my personal score and
                {" "}
                AniLists&apos; Average (weighed) Score.
              </Paragraph>
              <Table
                headers={[
                  "Title",
                  "Format",
                  "Length",
                  "Avg. Score",
                  "My Score",
                  "Score Factor",
                ]}>
                {anime.topBest === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={6}>
                      There is no anime in the Top 10 Best at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.topBest.map((item,) => {
                    return (
                      <React.Fragment key={item.media.title.native}>
                        <TableRow index={1}>
                          <TableColumn colSpan={6}>
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
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.score}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.aggScore}
                            </span>
                          </TableColumn>
                        </TableRow>
                        <TableRow index={1}>
                          <TableColumn colSpan={5}>
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
            </Disclosure.Panel>
          </>;
        }}
      </Disclosure>
      <hr />
      <Heading2>Details</Heading2>
      <Paragraph>
        These sections contain data from the Completed, Planning, Dropped, and
        {" "}
        Paused anime lists.
      </Paragraph>
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
