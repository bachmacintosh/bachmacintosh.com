import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2, Hyperlink,
  Paragraph,
} from "../../components/layout/Typography";
import DefaultView from "../../components/views/DefaultView";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function Jpn () {
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
      <Heading1 style={{ fontFamily: "Noto Sans JP", }}>
        Japanese - 日本語
      </Heading1>
      <Paragraph>
        I have an interest in things related to Japan. I enjoy watching anime,
        {" "}
        as well as learning the Japanese language. This section of the site
        {" "}
        contains multiple pages pertaining to these things.
      </Paragraph>
      <Paragraph>
        This page is a stub; I hope to improve on its detail someday...
      </Paragraph>
      <Heading2>Anime</Heading2>
      <Paragraph>
        This page pulls info from my AniList profile to show what anime I am
        {" "}
        watching, have completed/dropped, and how it compares to others. The
        {" "}
        page even helps me choose which anime to watch next.
      </Paragraph>
      <Hyperlink href="/jpn/anime" external={false}>Go to Anime</Hyperlink>
      <hr />
      <Heading2>WaniKani</Heading2>
      <Paragraph>
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

Jpn.getView = function getView (page,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};
