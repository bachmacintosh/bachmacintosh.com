import { Heading1, Heading2, Heading3, Hyperlink, Paragraph, } from "../../components/layout/Typography";
import { Table, TableColumn, TableRow, } from "../../components/layout/Table";
import DefaultLayout from "../../components/DefaultLayout";
import { Disclosure, } from "@headlessui/react";
import { ExternalLinkIcon, } from "@heroicons/react/outline";
import FlexWrapper from "../../components/layout/FlexWrapper";
import { NextSeo, } from "next-seo";
import ProgressBar from "../../components/layout/ProgressBar";
import React from 'react';
import { SmallButtonLink, } from "../../components/layout/Buttons";
import WanikaniSubject from "../../components/wanikani/WanikaniSubject";
import { getWkSheets, } from "../../lib/google/sheets";

export default function Wanikani({ content, },) {
  return(
    <>
      <NextSeo
        title="WaniKani"
        description="Learning kanji ain't easy, but we can make it better with spaced repitition... and burning things, sort of."
      />
      <Heading1>WaniKani</Heading1>
      <Paragraph indent={false}>Showing stats for user: <Hyperlink external={true} href={content.profileUrl}>{content.username}</Hyperlink></Paragraph>
      <Heading2>Level Progression</Heading2>
      <ProgressBar percent={Math.floor(((content.level) / 60) * 100,)}>{`${content.level  } / 60`}</ProgressBar>
      <Table headers={['Level', 'Type', 'Count', 'Items',]}>
        <TableRow index={1}>
          <TableColumn rowSpan={3}>1</TableColumn>
          <TableColumn>Radicals</TableColumn>
          <TableColumn>10</TableColumn>
          <TableColumn>
            <FlexWrapper>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
              <WanikaniSubject subjectType="radical" meanings={'Eye'} href="https://www.wanikani.com/radicals/ground">目</WanikaniSubject>
            </FlexWrapper>
          </TableColumn>
        </TableRow>
        <TableRow index={2}>
          <TableColumn>Kanji</TableColumn>
          <TableColumn>20</TableColumn>
          <TableColumn>
            <FlexWrapper>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
              <WanikaniSubject subjectType="kanji" meanings="One, Two, Three, Four" href="https://www.wanikani.com/radicals/ground">死</WanikaniSubject>
            </FlexWrapper>
          </TableColumn>
        </TableRow>
        <TableRow index={3}>
          <TableColumn>Vocabulary</TableColumn>
          <TableColumn>20</TableColumn>
          <TableColumn>
            <FlexWrapper>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
              <WanikaniSubject subjectType="vocabulary" meanings="Full Power, With All One's Strength, Topped Out" href="https://www.wanikani.com/radicals/ground">力いっぱい</WanikaniSubject>
            </FlexWrapper>
          </TableColumn>
        </TableRow>
      </Table>
    </>
  );
}

Wanikani.getLayout = function getLayout(page,) {
  return(
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const content = await getWkSheets();

  return {
    props: {
      content,
    },
  };
}
