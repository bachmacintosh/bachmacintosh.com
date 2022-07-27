import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2, Heading3, Heading4,
  Hyperlink, ListItem, Paragraph, UnorderedList,
} from "../../components/layout/Typography";
import {
  Table,
  TableColumn,
  TableRow,
} from "../../components/layout/Table.jsx";
import { ButtonLink, } from "../../components/layout/Buttons";
import CloudinaryImage from "../../components/cloudinary/CloudinaryImage";
import type { DanganronpaSeries, } from "../../additional";
import DefaultView from "../../components/views/DefaultView";
import { Disclosure, } from "@headlessui/react";
import FlexWrapper from "../../components/layout/FlexWrapper";
import type { GetStaticProps, } from "next";
import React from "react";
import type { ReactElement, } from "react";
import YouTube from "react-youtube";
import { getDanganronpaSheets, } from "../../lib/google/sheets";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

interface PageProps {
  series: DanganronpaSeries[];
}

export default function Danganronpa ({ series, }: PageProps,): ReactElement {
  if (typeof process.env.baseUrl === "undefined") {
    throw new Error("Base URL not set! Cannot build pages!",);
  }
  const title = "Danganronpa";
  const description = "Time for a fun school year at Hope's Peak Academy!";
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: "Gaming",
      item: `${process.env.baseUrl}/gaming`,
    },
    {
      position: 3,
      name: title,
      item: process.env.baseUrl + router.asPath,
    },
  ];
  const playerOptions = {
    width: "480",
    height: "270",
  };
  return <>
    <NextSeo {...getPageSEO(title, description, router,)} />
    <BreadcrumbJsonLd itemListElements={breadcrumbs} />
    <Heading1>
        Danganronpa
    </Heading1>
    <Paragraph indent={false}>
      Some games are easily spoiled, even just going to their wiki or subreddit.
      {` `}
      So this page is a spoiler-resistant hub for our Danganronpa series
      {` `}
      watch/playthrough starting August 2022. Only the Prologue of the
      {` `}
      first game is viewable to start, and
      {` `}
      <strong>clicking a game/chapter will expand its title and
        {` `}
        related content.
      </strong>
    </Paragraph>
    <Paragraph indent={false}>
      Stick to this page and
      {` `}
      <Hyperlink external={false} href="/blog">
        the Blog
      </Hyperlink>
      {` `}
      for the latest spoiler-aware updates as we work our way through the
      {` `}
      games and anime!
    </Paragraph>
    { series.map((srs, idx,) => {
      return (
        <React.Fragment key={srs.name}>
          {srs.chapters.length === 0 && <>
            <Heading2>{srs.hiddenName}</Heading2>
            <Paragraph indent={false}>
            Coming Soon!
            </Paragraph>
          </>}
          {srs.chapters.length > 0 && <>
            <Disclosure defaultOpen={idx === 0}>
              {({ open, }, ) => {
                return <>
                  <Disclosure.Button>
                    <Heading2>{open ? `[-] ${srs.name}` : `[+] ${srs.hiddenName}`}</Heading2>
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    <Heading3>Related Blog Posts</Heading3>
                    <Paragraph indent={false}>
      This section will be updated with quick links to related blog posts.
                    </Paragraph>
                    {srs.posts.length === 0 && <>
                      <UnorderedList>
                        <ListItem>(none yet)</ListItem>
                      </UnorderedList>
                    </>}
                    {srs.posts.length > 0 && <>
                      <UnorderedList>
                        {srs.posts.map((post,) => {
                          return <ListItem key={post.slug}>
                            <Hyperlink
                              href={`/blog/post/${post.slug}`}
                              external={false}
                            >
                              {post.title}
                            </Hyperlink>
                          </ListItem>;
                        },)}
                      </UnorderedList>
                    </>}
                    {srs.characters.length > 0 && <>
                      <Disclosure>
                        { /*
                        eslint-disable-next-line @typescript-eslint/no-shadow
                        */}
                        {({ open, }, ) => {
                          return <>
                            <Disclosure.Button>
                              <Heading3>
                            [{open ? "-" : "+"}] Characters
                              </Heading3>
                            </Disclosure.Button>
                            { !open && <Paragraph indent={false}>
                              View the main characters and their roles in this
                              {` `}
                              series
                            </Paragraph>}
                            <Disclosure.Panel>
                              <FlexWrapper>
                                {srs.characters.map((character,) => {
                                  return <div
                                    key={character.name}
                                    className="w-24 mx-12 flex flex-wrap mb-5"
                                  >
                                    <div className="mb-1">
                                      <CloudinaryImage
                                        src={`danganronpa/${character.thumb}`}
                                        width={Math.floor(
                                          character.width * 0.2,)}
                                        height={Math.floor(
                                          character.height * 0.2,)}
                                        alt={character.name}
                                      />
                                    </div>
                                    <br />
                                    <span
                                      className=
                                        "text-base md:text-lg text-white">
                                      {character.name}
                                    </span>
                                    <span
                                      className=
                                        "text-base md:text-lg text-gray-400">
                                      {character.role}
                                    </span>
                                  </div>;
                                },)}
                              </FlexWrapper>
                            </Disclosure.Panel>
                          </>;
                        }}
                      </Disclosure>
                    </>
                    }
                    {srs.favorites.length > 0 && <>
                      <Disclosure>
                        { /*
                        eslint-disable-next-line @typescript-eslint/no-shadow
                        */}
                        {({ open, }, ) => {
                          return <>
                            <Disclosure.Button>
                              <Heading3>
                            [{open ? "-" : "+"}] Free Time Favorites
                              </Heading3>
                            </Disclosure.Button>
                            { !open && <Paragraph indent={false}>
                              View the characters I chose for us to spend
                              {` `}
                              Free Time together with
                            </Paragraph>}
                            <Disclosure.Panel>
                              <Paragraph indent={false}>
                                I sent all other students through a
                                {` `}
                                Preference Revealer that sorted them using
                                {` `}
                                binary insertion (e.g. asking which of 2 I
                                {` `}
                                preferred over and over until it was sorted).
                                {` `}
                                We will spend our Free Time with these students
                                {` `}
                                if they are available in this order, until
                                {` `}
                                their Report Card is completed.
                              </Paragraph>
                              <Table
                                id={`ft-votes-${idx}`}
                                headers={[
                                  "Rank",
                                  "",
                                  "Name",
                                  "Role",
                                ]}
                              >
                                {srs.favorites.map((character, fidx,) => {
                                  return <TableRow
                                    key={fidx}
                                    index={fidx}
                                  >
                                    <TableColumn
                                      rowSpan={1}
                                      colSpan={1}
                                    >
                                      {character.rank}
                                    </TableColumn>
                                    <TableColumn
                                      rowSpan={1}
                                      colSpan={1}
                                    >
                                      <CloudinaryImage
                                        src={`danganronpa/${character.thumb}`}
                                        width={Math.floor(
                                          character.width * 0.1,
                                        )}
                                        height={Math.floor(
                                          character.height * 0.1,
                                        )}
                                        alt={character.name}
                                      />
                                    </TableColumn>
                                    <TableColumn
                                      rowSpan={1}
                                      colSpan={1}
                                    >
                                      {character.name}
                                    </TableColumn>
                                    <TableColumn
                                      rowSpan={1}
                                      colSpan={1}
                                    >
                                      {character.role}
                                    </TableColumn>
                                  </TableRow>;
                                },)}
                              </Table>
                            </Disclosure.Panel>
                          </>;
                        }}
                      </Disclosure>
                    </>
                    }
                    {srs.type === "Game" && <>
                      <Heading3>Chapters</Heading3>
                      <Paragraph indent={false}>
                        Completed game chapters will have a video above its
                        {` `}
                        name and/or a log of major events that occurred -- in
                        {` `}
                        case you don&apos;t have time to watch the videos.
                        {` `}
                        Clicking the chapter reveals the name and log.
                      </Paragraph>
                      {srs.chapters.map((chapter, cidx,) => {
                        return <React.Fragment key={chapter.chapter}>
                          {chapter.complete === "No" && <>
                            <Heading4>{chapter.hiddenTitle}</Heading4>
                            <Paragraph indent={false}>
                              Coming Soon!
                            </Paragraph>
                          </>}
                          {chapter.complete === "Yes" && <>
                            {chapter.videoId !== "" && <>
                              <YouTube
                                videoId={chapter.videoId}
                                opts={playerOptions}
                              />
                            </>}
                            <Disclosure>
                              { /*
                          eslint-disable-next-line @typescript-eslint/no-shadow
                               */}
                              {({ open, },) => {
                                return <>
                                  <Disclosure.Button>
                                    <Heading4>
                                      {open ? `[-] ${chapter.title}` : `[+] ${chapter.hiddenTitle}`}
                                    </Heading4>
                                  </Disclosure.Button>
                                  {cidx === 0 && <>
                                    <Paragraph indent={false}>
                                      (There&apos;s no log under the Prologue,
                                      {` `}
                                      expanding it just reveals the name.)
                                    </Paragraph>
                                  </>}
                                  <Disclosure.Panel>
                                    {chapter.logs.length > 0 && <>
                                      <Paragraph indent={false}>
                                      Here is a log of any major events during
                                        {` `}
                                      the chapter.
                                      </Paragraph>
                                      <Table
                                        id={`chapter-logs-${idx}`}
                                        headers={[
                                          "Event",
                                          "Subject",
                                          "Action",
                                          "Subject",
                                          "Notes",
                                        ]}
                                      >
                                        {chapter.logs.map((entry, eidx,) => {
                                          return <TableRow
                                            key={eidx}
                                            index={eidx}>
                                            <TableColumn
                                              rowSpan={1}
                                              colSpan={1}
                                            >
                                              {entry.event}
                                            </TableColumn>
                                            <TableColumn
                                              rowSpan={1}
                                              colSpan={1}
                                            >
                                              {entry.subject1.name}
                                              <br />
                                              <CloudinaryImage
                                                src={`danganronpa/${entry.subject1.thumb}`}
                                                width={Math.floor(
                                                  entry.subject1.width * 0.1,
                                                )}
                                                height={Math.floor(
                                                  entry.subject1.height * 0.1,
                                                )}
                                                alt={entry.subject1.name}
                                              />
                                            </TableColumn>
                                            <TableColumn
                                              rowSpan={1}
                                              colSpan={1}
                                            >
                                              {entry.action}
                                            </TableColumn>
                                            <TableColumn
                                              rowSpan={1}
                                              colSpan={1}
                                            >
                                              {entry.subject2.name}
                                              <br />
                                              <CloudinaryImage
                                                src={`danganronpa/${entry.subject2.thumb}`}
                                                width={Math.floor(
                                                  entry.subject2.width * 0.1,
                                                )}
                                                height={Math.floor(
                                                  entry.subject2.height * 0.1,
                                                )}
                                                alt={entry.subject2.name}
                                              />
                                            </TableColumn>
                                            <TableColumn
                                              rowSpan={1}
                                              colSpan={1}
                                            >
                                              {entry.notes === ""
                                                ? "(none)"
                                                : entry.notes}
                                            </TableColumn>
                                          </TableRow>;
                                        },)}
                                      </Table>
                                    </>}
                                  </Disclosure.Panel>
                                </>;
                              }}
                            </Disclosure>
                          </>}
                        </React.Fragment>;
                      },)}
                    </>}
                    {srs.type === "Anime" && <>
                      <Heading3>Episodes</Heading3>
                      <Paragraph indent={false}>
                      This is an anime; its episodes are listed in watch order.
                      </Paragraph>
                      <Table id={`anime-table-${idx}`} headers={["Watch", "Title",]}>
                        {srs.chapters.map((chapter, cidx,) => {
                          return <TableRow key={cidx} index={cidx} >
                            <TableColumn rowSpan={1} colSpan={1}>
                              <ButtonLink
                                href={chapter.episodeLink}
                                external={true}
                              >
                                Watch
                              </ButtonLink>
                            </TableColumn>
                            <TableColumn rowSpan={1} colSpan={1}>
                              {chapter.title}
                            </TableColumn>
                          </TableRow>;
                        },)}
                      </Table>
                    </>}
                  </Disclosure.Panel>
                </>;
              }
              }
            </Disclosure>
          </>}
        </React.Fragment>);
    },)
    }
  </>;
}

Danganronpa.getView = function getView (page: ReactElement,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const series = await getDanganronpaSheets() as DanganronpaSeries[];
  return { props: { series, }, };
};
