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

export default function Anime ({ anime, updatedAt, },) {
  const formats = {
    TV: "TV",
    TV_SHORT: "TV - Short",
    MOVIE: "Movie",
    SPECIAL: "Special",
    OVA: "OVA",
    ONA: "ONA",
    MUSIC: "Music Video",
  };
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
                Anime in my (Re)Watching list with 1 or more episodes completed.
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
                              {formats[item.media.format]}
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
                              {formats[item.media.format]}
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
                              {formats[item.media.format]}
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
        Paused anime lists. Just a heads up -- these lists are very long.
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
                {anime.details.completed === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={5}>
                      There is no anime in the Completed at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.details.completed.map((item,) => {
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
                {anime.details.planning === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={4}>
                      There is no anime in my Planning list at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.details.planning.map((item,) => {
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
                {anime.details.paused === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={5}>
                      I am not watching any anime at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.details.paused.map((item,) => {
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
                {anime.details.dropped === null
                  ? <TableRow index={1}>
                    <TableColumn colSpan={5}>
                      I have no dropped anime at this time.
                    </TableColumn>
                  </TableRow>
                  : anime.details.dropped.map((item,) => {
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
      <hr/>
      <Paragraph>{`Page Last Updated at ${updatedAt}`}</Paragraph>
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
  const dateOptions = {
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
    timeZone: "America/New_York",
  };
  const updatedAt = new Date().toLocaleString("en-US", dateOptions,);
  return { props: { anime, updatedAt, }, };
}
