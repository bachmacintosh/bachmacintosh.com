import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2,
  Heading3, Hyperlink, Paragraph,
} from "../../components/layout/Typography";
import { Table, TableColumn, TableRow, } from "../../components/layout/Table";
import DefaultLayout from "../../components/DefaultLayout";
import { Disclosure, } from "@headlessui/react";
import FlexWrapper from "../../components/layout/FlexWrapper";
import ProgressBar from "../../components/layout/ProgressBar";
import React from "react";
import
WanikaniRadicalImage
  from "../../components/wanikani/WanikaniRadicalImage";
import WanikaniSubject from "../../components/wanikani/WanikaniSubject";
import { getPageSEO, } from "../../lib/seo";
import { getWkSheets, } from "../../lib/google/sheets";
import { useRouter, } from "next/router";

export default function Wanikani ({ content, },) {
  const title = "WaniKani";
  const description = "Learning kanji ain't easy, but we can make it better "
    + "spaced repetition... and burning things, sort of.";
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

  let reviews = [];
  for (const [key, value,] of Object.entries(content.studyQueue.reviews,)) {
    if (content.studyQueue.reviews[key] !== null) {
      reviews.push({ time: key, items: value, },);
    }
  }
  if (reviews.length === 0) {
    reviews = null;
  }
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      <Heading1>WaniKani</Heading1>
      <Paragraph
        indent={false}>
        Showing stats for user:
        {" "}
        <Hyperlink
          external={true}
          href={content.profileUrl}>
          {content.username}
        </Hyperlink>
      </Paragraph>
      <Heading2>Summary</Heading2>
      <Heading3>Level Progression</Heading3>
      <Paragraph>
        WaniKani has 60 levels to go through. This is my progress.
      </Paragraph>
      <ProgressBar percent={Math.floor(content.level / 60 * 100,)}>{`${content.level} / 60`}</ProgressBar>
      <Heading3>SRS Distribution</Heading3>
      <Paragraph>
        As you learn items in WaniKani, they are reviewed again at different
        {" "}
        intervals. Unlocked items still need to be learned in lessons.
        {" "}
        Burned items no longer need reviews as they are learned.
      </Paragraph>
      <Table
        headers={["Stage Name", "Radicals", "Kanji", "Vocabulary", "Total",]}>
        {content.srsDistribution.map((row, index,) => {
          return (row.radicals > 0 || row.kanji > 0 || row.vocabulary > 0)
          && <TableRow key={index} index={index}>
            <TableColumn><strong>{row.name}</strong></TableColumn>
            <TableColumn>{row.radicals}</TableColumn>
            <TableColumn>{row.kanji}</TableColumn>
            <TableColumn>{row.vocabulary}</TableColumn>
            <TableColumn>{row.total}</TableColumn>
          </TableRow>;
        },)}
      </Table>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Recent Unlocks</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                These are items that were unlocked in the past 30 days.
              </Paragraph>
              <Table id={"recent-unlocks-table"}
                headers={["Level", "Type", "Count", "Items",]}>
                {
                  content.recentUnlocks === null
                    ? <TableRow index={1}>
                      <TableColumn
                        colSpan={4}>
                        There are no recent unlocks in the past 30 days.
                      </TableColumn>
                    </TableRow>
                    : content.recentUnlocks.map((group, index,) => {
                      return <React.Fragment key={group.level}>
                        <TableRow index={index}>
                          <TableColumn rowSpan={3}>{group.level}</TableColumn>
                          <TableColumn>Radicals</TableColumn>
                          <TableColumn>{group.radicals.length}</TableColumn>
                          <TableColumn>{group.radicals.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.radicals.map((radical, radIdx,) => {
                                return <WanikaniSubject
                                  key={radIdx} subjectType="radical"
                                  meanings={radical.meanings}
                                  href={radical.url}>
                                  {radical.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-kanji`} index={index}>
                          <TableColumn>Kanji</TableColumn>
                          <TableColumn>{group.kanji.length}</TableColumn>
                          <TableColumn>{group.kanji.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.kanji.map((kanji, kanIdx,) => {
                                return <WanikaniSubject
                                  key={kanIdx} subjectType="kanji"
                                  meanings={kanji.meanings}
                                  href={kanji.url}>
                                  {kanji.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-vocabulary`} index={index}>
                          <TableColumn>Vocabulary</TableColumn>
                          <TableColumn>{group.vocabulary.length}</TableColumn>
                          <TableColumn>{group.vocabulary.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.vocabulary.map((vocab, vocIdx,) => {
                                return <WanikaniSubject
                                  key={vocIdx} subjectType="vocabulary"
                                  meanings={vocab.meanings}
                                  href={vocab.url}>
                                  {vocab.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                      </React.Fragment>;
                    },)
                }
              </Table>
            </Disclosure.Panel>
          </>;
        }}
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Critical Condition Items</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                Any items here have a percentage correct {"<"} 75%, and may
                {" "}
                require additional review to learn them.
              </Paragraph>
              <Table id={"critical-condition-table"}
                headers={["Level", "Type", "Count", "Items",]}>
                {
                  content.criticalCondition === null
                    ? <TableRow index={1}>
                      <TableColumn
                        colSpan={4}>
                        There are no items in Critical Condition, i.e. correct
                        {" "}
                        percentage less than 75%.
                      </TableColumn>
                    </TableRow>
                    : content.criticalCondition.map((group, index,) => {
                      return <React.Fragment key={group.level}>
                        <TableRow index={index}>
                          <TableColumn rowSpan={3}>{group.level}</TableColumn>
                          <TableColumn>Radicals</TableColumn>
                          <TableColumn>{group.radicals.length}</TableColumn>
                          <TableColumn>{group.radicals.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.radicals.map((radical, radIdx,) => {
                                return <WanikaniSubject
                                  key={radIdx} subjectType="radical"
                                  meanings={radical.meanings}
                                  href={radical.url}>
                                  {radical.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-kanji`} index={index}>
                          <TableColumn>Kanji</TableColumn>
                          <TableColumn>{group.kanji.length}</TableColumn>
                          <TableColumn>{group.kanji.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.kanji.map((kanji, kanIdx,) => {
                                return <WanikaniSubject
                                  key={kanIdx} subjectType="kanji"
                                  meanings={kanji.meanings}
                                  href={kanji.url}>
                                  {kanji.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-vocabulary`} index={index}>
                          <TableColumn>Vocabulary</TableColumn>
                          <TableColumn>{group.vocabulary.length}</TableColumn>
                          <TableColumn>{group.vocabulary.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.vocabulary.map((vocab, vocIdx,) => {
                                return <WanikaniSubject
                                  key={vocIdx} subjectType="vocabulary"
                                  meanings={vocab.meanings}
                                  href={vocab.url}>
                                  {vocab.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                      </React.Fragment>;
                    },)
                }
              </Table>
            </Disclosure.Panel>
          </>;
        }}
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Recently Burned Items</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                These items have recently left the review queue, as I have
                {" "}
                demonstrated their being committed to memory, i.e. they are
                {" "}
                learned.
              </Paragraph>
              <Table id={"recently-burned-table"}
                headers={["Level", "Type", "Count", "Items",]}>
                {
                  content.recentlyBurned === null
                    ? <TableRow index={1}>
                      <TableColumn
                        colSpan={4}>
                        There are no recently burned items in the past 30 days.
                      </TableColumn>
                    </TableRow>
                    : content.recentlyBurned.map((group, index,) => {
                      return <React.Fragment key={group.level}>
                        <TableRow index={index}>
                          <TableColumn rowSpan={3}>{group.level}</TableColumn>
                          <TableColumn>Radicals</TableColumn>
                          <TableColumn>{group.radicals.length}</TableColumn>
                          <TableColumn>{group.radicals.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.radicals.map((radical, radIdx,) => {
                                return radical.characters
                                  ? <WanikaniSubject
                                    key={radIdx} subjectType="radical"
                                    meanings={radical.meanings}
                                    href={radical.url}>
                                    {radical.characters}
                                  </WanikaniSubject>
                                  : <WanikaniRadicalImage
                                    key={radIdx} subjectType="radical"
                                    meanings={radical.meanings}
                                    href={radical.url}
                                    svg={radical.characterImage}/>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-kanji`} index={index}>
                          <TableColumn>Kanji</TableColumn>
                          <TableColumn>{group.kanji.length}</TableColumn>
                          <TableColumn>{group.kanji.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.kanji.map((kanji, kanIdx,) => {
                                return <WanikaniSubject
                                  key={kanIdx} subjectType="kanji"
                                  meanings={kanji.meanings}
                                  href={kanji.url}>
                                  {kanji.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-vocabulary`} index={index}>
                          <TableColumn>Vocabulary</TableColumn>
                          <TableColumn>{group.vocabulary.length}</TableColumn>
                          <TableColumn>{group.vocabulary.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.vocabulary.map((vocab, vocIdx,) => {
                                return <WanikaniSubject
                                  key={vocIdx} subjectType="vocabulary"
                                  meanings={vocab.meanings}
                                  href={vocab.url}>
                                  {vocab.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                      </React.Fragment>;
                    },)
                }
              </Table>
            </Disclosure.Panel>
          </>;
        }}
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] Study Queue</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                These items are ready to be learned/reviewed sometime today.
              </Paragraph>
              <Paragraph>
                This section is updated every day around 12:00AM and 4:00PM ET.
              </Paragraph>
              <Heading3>Lessons Available Now</Heading3>
              <Table id={"study-queue-table-l"}
                headers={["Level", "Type", "Count", "Items",]}>
                {
                  content.studyQueue.lessons === null
                    ? <TableRow index={1}>
                      <TableColumn
                        colSpan={4}>
                        There are no Lessons in the queue for today.
                      </TableColumn>
                    </TableRow>
                    : content.studyQueue.lessons.map((group, index,) => {
                      return <React.Fragment key={group.level}>
                        <TableRow index={index}>
                          <TableColumn rowSpan={3}>{group.level}</TableColumn>
                          <TableColumn>Radicals</TableColumn>
                          <TableColumn>{group.radicals.length}</TableColumn>
                          <TableColumn>{group.radicals.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.radicals.map((radical, radIdx,) => {
                                return radical.characters
                                  ? <WanikaniSubject
                                    key={radIdx}
                                    subjectType={radical.stage === null
                                      ? "locked"
                                      : "radical"}
                                    meanings={radical.meanings}
                                    href={radical.url}>
                                    {radical.characters}
                                  </WanikaniSubject>
                                  : <WanikaniRadicalImage
                                    key={radIdx}
                                    subjectType={radical.stage === null
                                      ? "locked"
                                      : "radical"}
                                    meanings={radical.meanings}
                                    href={radical.url}
                                    svg={radical.characterImage}/>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-kanji`} index={index}>
                          <TableColumn>Kanji</TableColumn>
                          <TableColumn>{group.kanji.length}</TableColumn>
                          <TableColumn>{group.kanji.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.kanji.map((kanji, kanIdx,) => {
                                return <WanikaniSubject
                                  key={kanIdx}
                                  subjectType={kanji.stage === null
                                    ? "locked"
                                    : "kanji"}
                                  meanings={kanji.meanings}
                                  href={kanji.url}>
                                  {kanji.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-vocabulary`} index={index}>
                          <TableColumn>Vocabulary</TableColumn>
                          <TableColumn>{group.vocabulary.length}</TableColumn>
                          <TableColumn>{group.vocabulary.length === 0
                            ? "(None)"
                            : <FlexWrapper>{group.vocabulary.map((vocab,
                              vocIdx,) => {
                              return <WanikaniSubject
                                key={vocIdx}
                                subjectType={vocab.stage === null
                                  ? "locked"
                                  : "vocabulary"}
                                meanings={vocab.meanings}
                                href={vocab.url}>
                                {vocab.characters}
                              </WanikaniSubject>;
                            },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                      </React.Fragment>;
                    },)
                }
              </Table>
              { reviews === null
                ? <>
                  <Heading3>Reviews</Heading3>
                  <Table id={"study-queue-table-r0"}
                    headers={["Level", "Type", "Count", "Items",]}>
                    <TableRow index={1}>
                      <TableColumn colSpan={4}>
                        There are no Reviews in the queue for today.
                      </TableColumn>
                    </TableRow>
                  </Table>
                </>
                : reviews.map((collection, colIdx,) => {
                  return <React.Fragment key={colIdx}>
                    <Heading3>{`Reviews Available Today At ${collection.time}`}</Heading3>
                    <Table id={`study-queue-table-r${colIdx}`}
                      headers={["Level", "Type", "Count", "Items",]}>
                      {
                        collection.items.map((group, index,) => {
                          return <React.Fragment key={group.level}>
                            <TableRow index={index}>
                              <TableColumn
                                rowSpan={3}>
                                {group.level}
                              </TableColumn>
                              <TableColumn>Radicals</TableColumn>
                              <TableColumn>{group.radicals.length}</TableColumn>
                              <TableColumn>{group.radicals.length === 0
                                ? "(None)"
                                : <FlexWrapper>
                                  {group.radicals.map((radical, radIdx,) => {
                                    return radical.characters
                                      ? <WanikaniSubject
                                        key={radIdx}
                                        subjectType={radical.stage === null
                                          ? "locked"
                                          : "radical"}
                                        meanings={radical.meanings}
                                        href={radical.url}>
                                        {radical.characters}
                                      </WanikaniSubject>
                                      : <WanikaniRadicalImage
                                        key={radIdx}
                                        subjectType={radical.stage === null
                                          ? "locked"
                                          : "radical"}
                                        meanings={radical.meanings}
                                        href={radical.url}
                                        svg={radical.characterImage}/>;
                                  },)}</FlexWrapper>}</TableColumn>
                            </TableRow>
                            <TableRow key={`${group.level}-kanji`} index={index}>
                              <TableColumn>Kanji</TableColumn>
                              <TableColumn>{group.kanji.length}</TableColumn>
                              <TableColumn>{group.kanji.length === 0
                                ? "(None)"
                                : <FlexWrapper>
                                  {group.kanji.map((kanji, kanIdx,) => {
                                    return <WanikaniSubject
                                      key={kanIdx}
                                      subjectType={kanji.stage === null
                                        ? "locked"
                                        : "kanji"}
                                      meanings={kanji.meanings}
                                      href={kanji.url}>
                                      {kanji.characters}
                                    </WanikaniSubject>;
                                  },)}</FlexWrapper>}</TableColumn>
                            </TableRow>
                            <TableRow key={`${group.level}-vocabulary`} index={index}>
                              <TableColumn>Vocabulary</TableColumn>
                              <TableColumn>
                                {group.vocabulary.length}
                              </TableColumn>
                              <TableColumn>{group.vocabulary.length === 0
                                ? "(None)"
                                : <FlexWrapper>
                                  {group.vocabulary.map((vocab, vocIdx,) => {
                                    return <WanikaniSubject
                                      key={vocIdx}
                                      subjectType={vocab.stage === null
                                        ? "locked"
                                        : "vocabulary"}
                                      meanings={vocab.meanings}
                                      href={vocab.url}>
                                      {vocab.characters}
                                    </WanikaniSubject>;
                                  },)}</FlexWrapper>}</TableColumn>
                            </TableRow>
                          </React.Fragment>;
                        },)
                      }
                    </Table>
                  </React.Fragment>;
                },)}
            </Disclosure.Panel>
          </>;
        }}
      </Disclosure>
      <hr />
      <Disclosure>
        {({ open, },) => {
          return <>
            <Disclosure.Button>
              <Heading2>[{open ? "-" : "+"}] All Level Details</Heading2>
            </Disclosure.Button>
            <Disclosure.Panel>
              <Paragraph>
                This is every subject taught by WaniKani, up to my current
                {" "}
                level. Gold items are Burned. Gray items are not in the lesson
                {" "}
                queue yet.
              </Paragraph>
              <Table id={"details-table"}
                headers={["Level", "Type", "Count", "Items",]}>
                {
                  content.details === null
                    ? <TableRow index={1}>
                      <TableColumn
                        colSpan={4}>
                        There are no details to display.
                      </TableColumn>
                    </TableRow>
                    : content.details.map((group, index,) => {
                      return <React.Fragment key={group.level}>
                        <TableRow index={index}>
                          <TableColumn rowSpan={3}>{group.level}</TableColumn>
                          <TableColumn>Radicals</TableColumn>
                          <TableColumn>{group.radicals.length}</TableColumn>
                          <TableColumn>{group.radicals.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.radicals.map((radical, radIdx,) => {
                                return radical.characters
                                  ? <WanikaniSubject
                                    key={radIdx}
                                    subjectType={radical.stage === null
                                      ? "locked"
                                      : "radical"}
                                    stage={radical.stage}
                                    meanings={radical.meanings}
                                    href={radical.url}>
                                    {radical.characters}
                                  </WanikaniSubject>
                                  : <WanikaniRadicalImage
                                    key={radIdx}
                                    subjectType={radical.stage === null
                                      ? "locked"
                                      : "radical"}
                                    stage={radical.stage}
                                    meanings={radical.meanings}
                                    href={radical.url}
                                    svg={radical.characterImage}/>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-kanji`} index={index}>
                          <TableColumn>Kanji</TableColumn>
                          <TableColumn>{group.kanji.length}</TableColumn>
                          <TableColumn>{group.kanji.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.kanji.map((kanji, kanIdx,) => {
                                return <WanikaniSubject
                                  key={kanIdx}
                                  subjectType={kanji.stage === null
                                    ? "locked"
                                    : "kanji"}
                                  stage={kanji.stage}
                                  meanings={kanji.meanings}
                                  href={kanji.url}>
                                  {kanji.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                        <TableRow key={`${group.level}-vocabulary`} index={index}>
                          <TableColumn>Vocabulary</TableColumn>
                          <TableColumn>{group.vocabulary.length}</TableColumn>
                          <TableColumn>{group.vocabulary.length === 0
                            ? "(None)"
                            : <FlexWrapper>
                              {group.vocabulary.map((vocab, vocIdx,) => {
                                return <WanikaniSubject
                                  key={vocIdx}
                                  subjectType={vocab.stage === null
                                    ? "locked"
                                    : "vocabulary"}
                                  stage={vocab.stage}
                                  meanings={vocab.meanings}
                                  href={vocab.url}>
                                  {vocab.characters}
                                </WanikaniSubject>;
                              },)}</FlexWrapper>}</TableColumn>
                        </TableRow>
                      </React.Fragment>;
                    },)
                }
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

Wanikani.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps () {
  const content = await getWkSheets();
  const dateOptions = {
    dateStyle: "short",
    timeStyle: "short",
    hour12: false,
    timeZone: "America/New_York",
  };
  const updatedAt = new Date().toLocaleString("en-US", dateOptions,);

  return { props: { content, updatedAt, }, };
}
