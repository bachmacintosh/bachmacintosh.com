import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  ButtonLink, NsfwButtonLink,
  NsfwSpoilerButtonLink, SpoilerButtonLink,
} from "../../../components/layout/Buttons";
import {
  Heading1,
  Paragraph, PostTitle,
} from "../../../components/layout/Typography";
import {
  getBlogArchivePosts,
  getTotalBlogPosts,
} from "../../../lib/contentful/blogpost";
import CoverImage from "../../../components/contentful/CoverImage";
import DefaultLayout from "../../../components/DefaultLayout";
import PageSelector from "../../../components/blog/PageSelector";
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
      {posts && posts.map((post,) => {
        const {
          coverImage, summary, publishDate, updateDate, slug,
          notSafeForWork, spoilers, spoilerName,
        } = post;
        let header = <PostTitle>{post.title}</PostTitle>;
        if (coverImage !== null) {
          header = <CoverImage asset={coverImage} />;
        }
        const dateOptions = {
          dateStyle: "long",
          timeStyle: "short",
          hour12: true,
          timeZone: "America/New_York",
        };
        let postInfo = <span className="text-sm md:text-base text-white">
          {`Posted ${new Date(publishDate,).toLocaleString("en-US", dateOptions,)} by Collin Bachman`}
        </span>;
        if (updateDate !== null) {
          postInfo = <>
            <span className="text-sm md:text-base text-white">
              {`Posted ${new Date(publishDate,).toLocaleString("en-US", dateOptions,)}`}
            </span>
            <br />
            <span className="text-sm md:text-base text-white">
              {`Updated ${new Date(updateDate,).toLocaleString("en-US", dateOptions,)} by Collin Bachman`}
            </span>
          </>;
        }
        let readMore = <ButtonLink href={`blog/post/${slug}`} external={false}>
          Read More
        </ButtonLink>;
        if (!notSafeForWork && spoilers) {
          readMore = <SpoilerButtonLink href={`blog/post/${slug}`} external={false}>
            {`Read More (${spoilerName} SPOILERS)`}
          </SpoilerButtonLink>;
        } else if (notSafeForWork && !spoilers) {
          readMore = <NsfwButtonLink href={`blog/post/${slug}`} external={false}>
            Read More (NSFW)
          </NsfwButtonLink>;
        } else if (notSafeForWork && spoilers) {
          readMore = <NsfwSpoilerButtonLink href={`blog/post/${slug}`} external={false}>
            {`Read More (NSFW / ${spoilerName} SPOILERS)`}
          </NsfwSpoilerButtonLink>;
        }
        return <>
          <div className="max-w-4xl mx-auto">
            {header}
            <br />
            {postInfo}
            <hr className="mb-3" />
            <Paragraph indent={false}>
              {summary}
            </Paragraph>
            {readMore}
          </div>
          <hr className="my-5" />
        </>;
      },)}
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
