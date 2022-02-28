import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1,
  Paragraph,
} from "../../../components/layout/Typography";
import {
  getBlogArchivePosts,
  getTotalBlogPosts,
} from "../../../lib/contentful/blogpost";
import { ButtonLink, } from "../../../components/layout/Buttons";
import DefaultLayout from "../../../components/DefaultLayout";
import PageSelector from "../../../components/blog/PageSelector";
import PostList from "../../../components/blog/PostList";
import { getPageSEO, } from "../../../lib/seo";
import { useRouter, } from "next/router";

export default function Archive ({ posts, page, pageCount, },) {
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

Archive.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps ({ params, },) {
  const totalPosts = await getTotalBlogPosts();
  const pageCount = Math.ceil(totalPosts / 10,) - 1;
  if (parseInt(params.page, 10,) > pageCount) {
    return { notFound: true, };
  }

  const posts = await getBlogArchivePosts(params.page,);
  
  if (typeof posts === "undefined") {
    return { notFound: true, };
  }
  
  return {
    props: {
      posts,
      page: params.page,
      pageCount,
    },
  };
}

export async function getStaticPaths () {
  const paths = [];
  
  const totalPosts = await getTotalBlogPosts();
  
  if (totalPosts > 10) {
    const pageCount = Math.ceil(totalPosts / 10,) - 1;
    for (let page = 1; page <= pageCount; page++) {
      paths.push({ params: { page: page.toString(), }, },);
    }
  }
  
  return {
    paths,
    fallback: "blocking",
  };
}
