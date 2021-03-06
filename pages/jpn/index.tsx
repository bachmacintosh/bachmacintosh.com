import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2, Hyperlink,
  Paragraph,
} from "../../components/layout/Typography";
import DefaultView from "../../components/views/DefaultView";
import type { ReactElement, } from "react";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function Jpn (): ReactElement {
  if (typeof process.env.baseUrl === "undefined") {
    throw new Error("Base URL not set! Cannot build pages!",);
  }
  const title = "Japanese";
  const description = "All the latest info on Collin Bachman's Japanese "
    + "learning";
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: title,
      item: process.env.baseUrl + router.asPath,
    },
  ];
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      <Heading1>
        Japanese - 日本語
      </Heading1>
      <Paragraph indent={false}>
        I have an interest in things related to Japan. I enjoy watching anime,
        {" "}
        as well as learning the Japanese language. This section of the site
        {" "}
        contains multiple pages pertaining to these things.
      </Paragraph>
      <Paragraph indent={false}>
        This page is a stub; I hope to improve on its detail someday...
      </Paragraph>
      <Heading2>Anime</Heading2>
      <Paragraph indent={false}>
        This page pulls info from my AniList profile to show what anime I am
        {" "}
        watching, have completed/dropped, and how it compares to others. The
        {" "}
        page even helps me choose which anime to watch next.
      </Paragraph>
      <Hyperlink href="/jpn/anime" external={false}>Go to Anime</Hyperlink>
      <hr />
      <Heading2>WaniKani</Heading2>
      <Paragraph indent={false}>
        WaniKani is a service that helps you learn kanji by giving you lessons
        {" "}
        in radicals, that build kanji, that build vocabulary. It uses spaced
        {" "}
        repetition to help you review and memorize these subjects. This page
        {" "}
        shows my progress through WaniKani.
      </Paragraph>
      <Hyperlink
        href="/jpn/wanikani"
        external={false}>
        Go to WaniKani Stats
      </Hyperlink>
      <br />
    </>
  );
}

Jpn.getView = function getView (page: ReactElement,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};
