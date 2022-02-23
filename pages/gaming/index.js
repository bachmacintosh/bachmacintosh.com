import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2, Hyperlink,
  Paragraph,
} from "../../components/layout/Typography";
import DefaultLayout from "../../components/DefaultLayout";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function Gaming () {
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
      <Paragraph>
        You seem to be interested in my gaming stuff. I mostly play
        {" "}
        single-player games in my free time, but do enjoy playing with friends
        {" "}
        on the weekends. Below are some sub-pages that go into greater detail.
      </Paragraph>
      <Paragraph>
        This page is a stub; I hope to improve on its detail someday...
      </Paragraph>
      <Heading2>GTA Online</Heading2>
      <Paragraph>
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

Gaming.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};
