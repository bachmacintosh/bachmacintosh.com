import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2, Heading3,
  Hyperlink, Paragraph, TitleLink,
} from "../../components/layout/Typography";
import { Table, TableColumn, TableRow, } from "../../components/layout/Table";
import AniListImage from "../../components/anime/AniListImage";
import DefaultView from "../../components/views/DefaultView";
import { Disclosure, } from "@headlessui/react";
import React from "react";
import { getAnime, } from "../../lib/anilist/anime";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function Anime ({ anime, },) {
  const title = "Anime";
  const description = "Fun facts about Collin Bachman's anime watching habits.";
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: "Japanese",
      item: `${process.env.baseUrl}/jpn`,
    },
    {
      position: 3,
      name: title,
      item: process.env.baseUrl + router.asPath,
    },
  ];

  const formats = {
    TV: "TV",
    TV_SHORT: "TV - Short",
    MOVIE: "Movie",
    SPECIAL: "Special",
    OVA: "OVA",
    ONA: "ONA",
    MUSIC: "Music Video",
  };
  const movieStatus = ["Incomplete", "Complete",];
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
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
              <Heading3>[{open ? "-" : "+"}] Scheduled Watching</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                Anime that has been scheduled for watching sometime this year.
              </Paragraph>
              <Table
                headers={[
                  "Title",
                  "Format",
                  "Length",
                  "Progress",
                  "Avg. Score",
                ]}>
                {anime.watching === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={5}>
                      I am not watching any anime at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.watching.map((item,) => {
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
                              {formats[item.media.format]}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? `${item.media.duration} min.`
                                : `${item.media.duration} min. x ${item.media.episodes} eps.`}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? movieStatus[item.progress]
                                : `${item.progress} / ${item.media.episodes}`
                              }
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
              <Heading3>[{open ? "-" : "+"}] On Deck</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                These anime are &quot;on deck&quot; to watch this year.
                {" "}
                Twice a night, I roll a six-sided die, and the anime in that
                {" "}
                row number in the On Deck List becomes the next anime to watch.
                {" "}
                I then use my Commit to Watch tool to pull a
                {" "}
                random anime from my Planning list and move it to the On Deck
                {" "}
                list.
              </Paragraph>
              <Table
                headers={["Title", "Format", "Length", "Avg. Score",]}>
                {anime.onDeck === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={4}>
                      There is no anime in my Watch Pool at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.onDeck.map((item,) => {
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
                              {formats[item.media.format]}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? `${item.media.duration} min.`
                                : `${item.media.duration} min. x ${item.media.episodes} eps.`}
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
              <Heading3>[{open ? "-" : "+"}] Commit to Watch</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                This is an anime randomly picked from my Planning list every
                {" "}
                site build; I can add it to my Watch Pool if we need a new
                {" "}
                anime to consider watching.
              </Paragraph>
              <Table
                headers={["Title", "Format", "Length", "Avg. Score",]}>
                {anime.commitToWatch === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={4}>
                      There is no anime in my Planning list at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.commitToWatch.map((item,) => {
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
                              {formats[item.media.format]}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? `${item.media.duration} min.`
                                : `${item.media.duration} min. x ${item.media.episodes} eps.`}
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
                              {formats[item.media.format]}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? `${item.media.duration} min.`
                                : `${item.media.duration} min. x ${item.media.episodes} eps.`}
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
      <Heading2>Other Lists</Heading2>
      <Paragraph>
        These sections contain data from the Completed, Planning, Dropped, and
        {" "}
        Paused anime lists. Just a heads up -- these lists are very long, and
        {" "}
        may take some time to load.
      </Paragraph>
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading3>[{open ? "-" : "+"}] Completed</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                These anime have had all their episodes watched, and are
                {" "}
                therefore considered completed. Note that this is by season,
                {" "}
                not entire series.
              </Paragraph>
              <Table
                headers={[
                  "Title",
                  "Format",
                  "Length",
                  "Avg. Score",
                  "My Score",
                ]}>
                {anime.other.completed === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={5}>
                      There is no anime in the Completed at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.other.completed.map((item,) => {
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
                              {formats[item.media.format]}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? `${item.media.duration} min.`
                                : `${item.media.duration} min. x ${item.media.episodes} eps.`}
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
                        </TableRow>
                        <TableRow index={1}>
                          <TableColumn colSpan={4}>
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
              <Heading3>[{open ? "-" : "+"}] Planning</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                This is a list of anime I plan to watch eventually. The above
                {" "}
                Commit to Watch tool pics a random entry from this list to add
                {" "}
                to my Watch Pool.
              </Paragraph>
              <Table
                headers={["Title", "Format", "Length", "Avg. Score",]}>
                {anime.other.planning === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={4}>
                      There is no anime in my Planning list at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.other.planning.map((item,) => {
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
                              {item.media.format
                                ? formats[item.media.format]
                                : "???"}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? `${item.media.duration} min.`
                                : `${item.media.duration} min. x ${item.media.episodes} eps.`}
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
              <Heading3>[{open ? "-" : "+"}] Paused</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                These anime were stopped before their completion; I hope to
                {" "}
                resume/restart them in the future.
              </Paragraph>
              <Table
                headers={[
                  "Title",
                  "Format",
                  "Length",
                  "Progress",
                  "Avg. Score",
                ]}>
                {anime.other.paused === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={5}>
                      I am not watching any anime at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.other.paused.map((item,) => {
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
                              {formats[item.media.format]}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? `${item.media.duration} min.`
                                : `${item.media.duration} min. x ${item.media.episodes} eps.`}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? movieStatus[item.progress]
                                : `${item.progress} / ${item.media.episodes}`
                              }
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
              <Heading3>[{open ? "-" : "+"}] Dropped</Heading3>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                These anime were dropped before their completion, and I have no
                {" "}
                plans to resume/restart them. Some were because they were bad,
                {" "}
                others because they did not hold my interest.
              </Paragraph>
              <Table
                headers={[
                  "Title",
                  "Format",
                  "Length",
                  "Progress",
                  "My Score",
                ]}>
                {anime.other.dropped === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={5}>
                      I have no dropped anime at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.other.dropped.map((item,) => {
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
                              {formats[item.media.format]}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? `${item.media.duration} min.`
                                : `${item.media.duration} min. x ${item.media.episodes} eps.`}
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.media.format === "MOVIE"
                                ? movieStatus[item.progress]
                                : `${item.progress} / ${item.media.episodes}`
                              }
                            </span>
                          </TableColumn>
                          <TableColumn>
                            <span className="text-sm md:text-base text-white">
                              {item.score}
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
      {/* <hr/>
      <Paragraph>{`Page Last Updated at ${updatedAt}`}</Paragraph>*/}
    </>
  );
}

Anime.getView = function getView (page,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};

export async function getStaticProps () {
  const anime = await getAnime();
  const dateOptions = {
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
    timeZone: "America/New_York",
  };
  const updatedAt = new Date().toLocaleString("en-US", dateOptions,);
  return { props: { anime, updatedAt, }, };
}
