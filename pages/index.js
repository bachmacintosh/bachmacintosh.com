import {
  Heading1, Japanese,
  Paragraph,
} from "../components/layout/Typography";
import HomeView from "../components/views/HomeView";
import { NextSeo, } from "next-seo";
import PostList from "../components/blog/PostList";
import { getHomePageBlogPosts, } from "../lib/contentful/blogpost";
import { getPageSEO, } from "../lib/seo";
import { useRouter, } from "next/router";

export default function Home ({ posts, },) {
  const title = "Home";
  const description = "The Website of Collin G. Bachman";
  const router = useRouter();
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <Heading1>We Write Blogs</Heading1>
      <Paragraph>
        Here&apos;s the latest one.
      </Paragraph>
      { posts && <PostList posts={posts} /> }
      <Heading1>We Make Videos</Heading1>
      <Paragraph>
        Mostly just gaming videos, but maybe some music in the future...
      </Paragraph>
      <Heading1>We Play GTA Online</Heading1>
      <Paragraph>Party Cannon -- Making Los Santos better since 2016</Paragraph>
      <Heading1>We Watch Anime</Heading1>
      <Paragraph>And a lot of it, too.</Paragraph>
      <Heading1>We Study Japanese</Heading1>
      <Japanese>重要な日本語で話すのが上手だと思う。</Japanese>
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
  const posts = await getHomePageBlogPosts();

  if (typeof posts === "undefined") {
    return { props: { posts: null, }, };
  }
  
  return { props: { posts, }, };
}
