import {
  Heading1,
  Paragraph,
} from "../components/layout/Typography";
import { ButtonLink, } from "../components/layout/Buttons";
import HomeView from "../components/views/HomeView";
import { NextSeo, } from "next-seo";
import PostList from "../components/blog/PostList";
import YouTube from "react-youtube";
import { getHomePageBlogPosts, } from "../lib/contentful/blogpost";
import { getLatestYouTubeVideo, } from "../lib/google/youtube";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

export default function Home ({ posts, youTubeVideoId, },) {
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
      { posts.length > 0
        && <>
          <Paragraph>
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
      { posts.length === 0
        && <>
          <Paragraph>
            ...I mean there&apos;s nothing there yet, but there will be soon.
          </Paragraph>
        </>
      }
      <Heading1>I Make Videos</Heading1>
      <Paragraph>
        Mostly just gaming videos, but maybe some music in the future...
      </Paragraph>
      <div style={{ width: 400, height: 225, }}>
        <YouTube
          videoId={youTubeVideoId}
          opts={playerOptions}
        />
      </div>
      <ButtonLink
        href={"https://www.youtube.com/channel/UCBBx2jqpysI7Yte3Lj96iWw"}
        external={true}>
        More on YouTube
      </ButtonLink>
      <Heading1>I Play GTA Online</Heading1>
      <Paragraph>
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
      <Paragraph>Whether it&apos;s the culture or the language...</Paragraph>
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

Home.getView = function getView (page,) {
  return (
    <HomeView>
      {page}
    </HomeView>
  );
};

export async function getStaticProps () {
  let posts = await getHomePageBlogPosts();
  if (typeof posts === "undefined") {
    posts = null;
  }
  const youTubeVideoId = await getLatestYouTubeVideo();
  const props = {
    posts,
    youTubeVideoId,
  };
  
  return { props, };
}
