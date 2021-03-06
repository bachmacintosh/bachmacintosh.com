import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2, Hyperlink,
  Paragraph,
} from "../../components/layout/Typography";
import DefaultView from "../../components/views/DefaultView";
import type { ReactElement, } from "react";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function Gaming (): ReactElement {
  if (typeof process.env.baseUrl === "undefined") {
    throw new Error("Base URL not set! Cannot build pages!",);
  }
  const title = "Gaming";
  const description = "Collin G. Bachman's gaming-related stuff goes here.";
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
        Gaming
      </Heading1>
      <Paragraph indent={false}>
        You seem to be interested in my gaming stuff. I mostly play
        {" "}
        single-player games in my free time, but do enjoy playing with friends
        {" "}
        on the weekends. Below are some sub-pages that go into greater detail.
      </Paragraph>
      <Paragraph indent={false}>
        This page is a stub; I hope to improve on its detail someday...
      </Paragraph>
      <Heading2>Danganronpa</Heading2>
      <Paragraph indent={false}>
        In August 2022, I played/watched all main titles in this series. Here
        {` `}
        is a spoiler-aware hub to see what happened.
      </Paragraph>
      <Hyperlink href="/gaming/danganronpa" external={false}>
        Go to Danganronpa
      </Hyperlink>
      <Heading2>GTA Online</Heading2>
      <Paragraph indent={false}>
        I&apos;ve been playing GTA Online for several years, and have
        {" "}
        accumulated a large wealth of virtual money and property. You can view
        {" "}
        that info on its respective page.
      </Paragraph>
      <Hyperlink href="/gaming/gta-online" external={false}>
        Go to GTA Online
      </Hyperlink>
      <br />
    </>
  );
}

Gaming.getView = function getView (page: ReactElement,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};
