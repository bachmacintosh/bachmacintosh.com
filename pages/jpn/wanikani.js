import {
  Heading1, Heading2,
  Heading3, Hyperlink, Paragraph,
} from "../../components/layout/Typography";
import { Table, TableColumn, TableRow, } from "../../components/layout/Table";
import DefaultLayout from "../../components/DefaultLayout";
import { Disclosure, } from "@headlessui/react";
import FlexWrapper from "../../components/layout/FlexWrapper";
import { NextSeo, } from "next-seo";
import ProgressBar from "../../components/layout/ProgressBar";
import React from "react";
import
WanikaniRadicalImage
  from "../../components/wanikani/WanikaniRadicalImage";
import WanikaniSubject from "../../components/wanikani/WanikaniSubject";
import { getWkSheets, } from "../../lib/google/sheets";

export default function Wanikani ({ content, },) {
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
      <NextSeo
        title="WaniKani"
        description={`Learning kanji ain't easy, but we can make it better with
          spaced repetition... and burning things, sort of.`}
      />
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
      <ProgressBar percent={Math.floor(content.level / 60 * 100,)}>{`${content.level} / 60`}</ProgressBar>
      <Heading3>SRS Distribution</Heading3>
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
              <Table headers={["Level", "Type", "Count", "Items",]}>
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
                          <TableColumn>Kanji</TableColumn>
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
              <Table headers={["Level", "Type", "Count", "Items",]}>
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
                          <TableColumn>Kanji</TableColumn>
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
              <Table headers={["Level", "Type", "Count", "Items",]}>
                {
                  content.recentlyBurned === null
                    ? <TableRow index={1}>
                      <TableColumn
                        colSpan={4}>
                        There are no recent unlocks in the past 30 days.
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
                          <TableColumn>Kanji</TableColumn>
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
              <Heading3>Lessons Available Now</Heading3>
              <Table headers={["Level", "Type", "Count", "Items",]}>
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
                          <TableColumn>Kanji</TableColumn>
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
                  <Table headers={["Level", "Type", "Count", "Items",]}>
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
                    <Table headers={["Level", "Type", "Count", "Items",]}>
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
                              <TableColumn>Kanji</TableColumn>
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
              <Table headers={["Level", "Type", "Count", "Items",]}>
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
                          <TableColumn>Kanji</TableColumn>
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

  return { props: { content, }, };
}
