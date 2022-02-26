import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  ButtonLink, NsfwButtonLink,
  NsfwSpoilerButtonLink, SpoilerButtonLink,
} from "../../components/layout/Buttons";
import {
  Heading1,
  Paragraph, PostTitle,
} from "../../components/layout/Typography";
import CoverImage from "../../components/contentful/CoverImage";
import DefaultLayout from "../../components/DefaultLayout";
import { getBlogPagePosts, } from "../../lib/contentful/blogpost";
import { getPageSEO, } from "../../lib/seo";
import { useRouter, } from "next/router";

export default function Blog ({ posts, },) {
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
      <Paragraph indent={false}>
        This page shows the 10 most recent posts; for more, visit the Archive.
      </Paragraph>
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
    </>
  );
}

Blog.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps () {
  const posts = await getBlogPagePosts();
  
  if (typeof posts === "undefined") {
    return { props: { posts: null, }, };
  }
  
  return { props: { posts, }, };
}
