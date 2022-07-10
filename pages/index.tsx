import {
  Heading1,
  Paragraph,
} from "../components/layout/Typography";
import { ButtonLink, } from "../components/layout/Buttons";
import type { ContentfulBlogPost, } from "../additional";
import type { GetStaticProps, } from "next";
import HomeView from "../components/views/HomeView";
import { NextSeo, } from "next-seo";
import PostList from "../components/blog/PostList";
import type { ReactElement, } from "react";
import YouTube from "react-youtube";
import { getHomePageBlogPosts, } from "../lib/contentful/blogpost";
import { getLatestYouTubeVideo, } from "../lib/google/youtube";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

interface PageProps {
  posts: ContentfulBlogPost[] | null;
  youTubeVideoId: string;
}

export default function Home (
  { posts, youTubeVideoId, }: PageProps,): ReactElement {
  const title = "Home";
  const description = "The Website of Collin G. Bachman";
  const router = useRouter();
  const playerOptions = {
    width: "400",
    height: "225",
  };
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <Heading1>I Write Blogs</Heading1>
      { posts !== null && posts.length > 0
        && <>
          <Paragraph indent={false}>
            Here&apos;s the latest one.
          </Paragraph>
          <PostList posts={posts} />
          <ButtonLink
            href="/blog"
            external={false}>
            More Blog Posts
          </ButtonLink>
        </>
      }
      { posts !== null && posts.length === 0
        && <>
          <Paragraph indent={false}>
            ...I mean there&apos;s nothing there yet, but there will be soon.
          </Paragraph>
        </>
      }
      <Heading1>I&apos;m on YouTube</Heading1>
      <Paragraph indent={false}>
        Mostly just gaming videos, both on my own channel and with Lord Galen.
        {" "}
          Here is the latest one that I either made or was featured in.
      </Paragraph>
      <div style={{ width: 400, height: 225, }}>
        <YouTube
          videoId={youTubeVideoId}
          opts={playerOptions}
        />
      </div>
      <ButtonLink
        href="/media/videos"
        external={false}>
        More Videos Featuring Me
      </ButtonLink>
      <Heading1>I Play GTA Online</Heading1>
      <Paragraph indent={false}>
        Party Cannon Inc. &mdash; Making Los Santos, San Andreas a better place
        {" "}
        (to die) since 2016
      </Paragraph>
      <ButtonLink
        href="/gaming/gta-online"
        external={false}>
        GTA Stats
      </ButtonLink>
      <Heading1>I Like Japan</Heading1>
      <Paragraph indent={false}>
          Whether it&apos;s the culture or the language...
      </Paragraph>
      <ButtonLink
        href="/jpn/anime"
        external={false}>
        Anime Stats
      </ButtonLink>
      <ButtonLink
        href="/jpn/wanikani"
        external={false}>
        WaniKani Stats
      </ButtonLink>
    </>
  );
}

Home.getView = (page: ReactElement,) => {
  return (
    <HomeView>
      {page}
    </HomeView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getHomePageBlogPosts();
  const youTubeVideoId = await getLatestYouTubeVideo() as string;
  if (typeof posts === "undefined") {
    return { props: { posts: null, youTubeVideoId, }, };
  }
  const props = {
    posts,
    youTubeVideoId,
  };

  return { props, };
};
