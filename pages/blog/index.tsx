import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1, Heading2,
  Paragraph,
} from "../../components/layout/Typography";
import {
  getBlogPagePosts,
  getTotalBlogPosts,
} from "../../lib/contentful/blogpost";
import { ButtonLink, } from "../../components/layout/Buttons";
import { ContentfulBlogPost, } from "../../additional";
import DefaultView from "../../components/views/DefaultView";
import { GetStaticProps, } from "next";
import PostList from "../../components/blog/PostList";
import { ReactElement, } from "react";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

type PageProps = {
  posts: Array<ContentfulBlogPost>,
  totalPosts: number,
};

export default function Blog ({ posts, totalPosts, }: PageProps,) {
  const title = "Blog";
  const description = "Collin G. Bachman's latest blog posts";
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
        Blog
      </Heading1>
      <Paragraph indent={false}>
        This is where I sometimes share my personal thoughts, usually cause I
        {" "}
        want to share them with a broader audience than just my friends, or
        {" "}
        it is long-form content that isn&apos;t suitable for Facebook or
        {" "}
        Twitter. It gets updated when it gets updated; I make zero promises on
        {" "}
        that.
      </Paragraph>
      {totalPosts > 10
        && <>
          <Paragraph indent={false}>
            This page shows the 10 most recent posts; for more, visit the
            {" "}
            Archive.
          </Paragraph>
          <ButtonLink href="/blog/archive/1" external={false}>
            Go to Archive
          </ButtonLink>
          <br />
          <br />
        </>
      }
      <hr className="mb-5" />
      {posts && <PostList posts={posts} /> }
      {posts.length === 0
        && <>
          <Heading2>No Posts Yet!</Heading2>
          <Paragraph indent={false}>
            Don&apos;t worry though, they&apos;ll be here soon enough...
          </Paragraph>
        </>
      }
      {totalPosts > 10
        && <>
          <Paragraph indent={false}>
            This page shows the 10 most recent posts; for more, visit the
            {" "}
            Archive.
          </Paragraph>
          <ButtonLink href="/blog/archive/1" external={false}>
            Go to Archive
          </ButtonLink>
          <br />
          <br />
        </>
      }
    </>
  );
}

Blog.getView = function getView (page: ReactElement,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getBlogPagePosts();
  const totalPosts = await getTotalBlogPosts();
  
  if (typeof posts === "undefined") {
    return { props: { posts: null, }, };
  }
  
  return {
    props: {
      posts,
      totalPosts,
    },
  };
};