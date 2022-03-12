import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import { GetStaticPaths, GetStaticProps, } from "next";
import {
  Heading1,
  Paragraph,
} from "../../../components/layout/Typography";
import {
  getBlogArchivePosts,
  getTotalBlogPosts,
} from "../../../lib/contentful/blogpost";
import { ButtonLink, } from "../../../components/layout/Buttons";
import { ContentfulBlogPost, } from "../../../additional";
import DefaultView from "../../../components/views/DefaultView";
import PageSelector from "../../../components/blog/PageSelector";
import PostList from "../../../components/blog/PostList";
import { ReactElement, } from "react";
import { getPageSEO, } from "../../../lib/seo";
import { useRouter, } from "next/router";

type PageProps = {
  posts: Array<ContentfulBlogPost>,
  page: string,
  pageCount: number,
};

export default function Archive ({ posts, page, pageCount, }: PageProps,) {
  const title = `Blog - Archive - Page ${page}`;
  const description = "Collin G. Bachman's blog entries from some time ago...";
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 1,
      name: "Blog",
      item: `${process.env.baseUrl}/blog`,
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
        Blog - Archive
      </Heading1>
      <ButtonLink href="/blog" external={false}>
        Back to Recent Posts
      </ButtonLink>
      <br />
      <br />
      <PageSelector page={page} pageCount={pageCount} scroll={false} />
      <br />
      { page === "1"
        && <Paragraph indent={false}>
          Sounds like a trip down Memory Lane is in order. Or at the very least,
          {" "}
          to look at some older Blog Posts (i.e. older than the 10 most recent
          {" "}
          ones). These Archive pages are dynamic as more things get posted,
          {" "}
          but these posts themselves? Timeless (and perma-linked).
        </Paragraph>
      }
      <hr className="mb-5" />
      {posts && <PostList posts={posts} /> }
      <PageSelector page={page} pageCount={pageCount} scroll={true} />
      <br />
    </>
  );
}

Archive.getView = function getView (page: ReactElement,) {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, },) => {
  const totalPosts = await getTotalBlogPosts();
  let pageCount = 0;
  if (totalPosts) {
    pageCount = Math.ceil(totalPosts / 10,) - 1;
  }
  let pageNum = 0;
  if (typeof params !== "undefined"
      && typeof params.page === "string"
      && !Array.isArray(params,)
      && params.page && parseInt(params.page, 10,) > pageCount) {
    pageNum = parseInt(params.page, 10,);
  }
  
  if (pageNum > pageCount || pageNum === 0) {
    return { notFound: true, };
  }

  const posts = await getBlogArchivePosts(params?.page,);
  
  if (typeof posts === "undefined") {
    return { notFound: true, };
  }
  
  return {
    props: {
      posts,
      page: params?.page,
      pageCount,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  
  const totalPosts = await getTotalBlogPosts();
  
  if (totalPosts && totalPosts > 10) {
    const pageCount = Math.ceil(totalPosts / 10,) - 1;
    for (let page = 1; page <= pageCount; page++) {
      paths.push({ params: { page: page.toString(), }, },);
    }
  }
  
  return {
    paths,
    fallback: "blocking",
  };
};
