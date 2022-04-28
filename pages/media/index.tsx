import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2, Hyperlink,
  Paragraph,
} from "../../components/layout/Typography";
import DefaultView from "../../components/views/DefaultView";
import { ReactElement, } from "react";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function Media () {
  const title = "Media";
  const description = "Learn about media that I made or took part in making.";
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
        Media
      </Heading1>
      <Paragraph indent={false}>
        Eventually I hope to have various forms of media under my belt. Right
        {" "}
          now I make and partake in YouTube videos. I am working on music-
        {""}
          related stuff, but have not released it yet.
      </Paragraph>
      <Paragraph indent={false}>
        This page is a stub; I hope to improve on its detail someday...
      </Paragraph>
      <Heading2>Videos</Heading2>
      <Paragraph indent={false}>
        You can view the 50 latest videos I have made or am featured in
        {" "}
          here.
      </Paragraph>
      <Hyperlink href="/media/videos" external={false}>
        Go to Videos
      </Hyperlink>
      <br />
    </>
  );
}

Media.getView = function getView (page: ReactElement,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};
