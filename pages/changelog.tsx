import { GetStaticProps, } from "next";
import LongContentView from "../components/views/LongContentView";
import Markdown from "../components/layout/Markdown";
import { NextSeo, } from "next-seo";
import { ReactElement, } from "react";
import { promises as fs, } from "fs";
import { getPageSEO, } from "../lib/seo";
import path from "path";
import { useRouter, } from "next/router";

type PageProps = {
  changelogMarkdown: string,
};


export default function Changelog ({ changelogMarkdown, }: PageProps,) {
  const title = "Changelog";
  const description = "See the wonderful version history of this website.";
  const router = useRouter();

  return <>
    <NextSeo {...getPageSEO(title, description, router,)} />
    {/* eslint-disable-next-line react/no-children-prop */}
    <Markdown children={changelogMarkdown} />
  </>;
}

Changelog.getView = (page: ReactElement,) => {
  return (
    <LongContentView>
      {page}
    </LongContentView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const changelogFile = path.join(process.cwd(), "CHANGELOG.md",);
  const changelogMarkdown = await fs.readFile(changelogFile, "utf8",);
  return { props: { changelogMarkdown, }, };
};
