import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import type { GetStaticPaths, GetStaticProps, } from "next";
import
{ NsfwButton, NsfwSpoilerButton, SpoilerButton, }
  from "../../../components/layout/Buttons";
import
{ NsfwWarning, PostLede, PostTitle, SpoilerWarning, }
  from "../../../components/layout/Typography";
import {
  getBlogPost, getBlogPostSlugs,
  getPreviewBlogPost,
} from "../../../lib/contentful/blogpost";
import type { ContentfulBlogPost, } from "../../../additional";
import CoverImage from "../../../components/contentful/CoverImage";
import { Disclosure, } from "@headlessui/react";
import LongContentView from "../../../components/views/LongContentView";
import React from "react";
import type { ReactElement, } from "react";
import RichText from "../../../components/contentful/RichText";
import Warning from "../../../components/layout/Warning";
import { getBlogPostSeo, } from "../../../lib/seo";
import { useRouter, } from "next/router";

interface PageProps {
  post: ContentfulBlogPost;
  preview: boolean;
}

interface DateOptions {
  dateStyle: "long" | "medium" | "short";
  timeStyle: "long" | "medium" | "short";
  hour12: boolean;
  timeZone: string;
}


// eslint-disable-next-line complexity
export default function BlogPost
({ post, preview, }: PageProps,): ReactElement {
  if (typeof process.env.baseUrl === "undefined") {
    throw new Error("Base URL not set! Cannot build pages!",);
  }
  const {
    title, coverImage, summary, publishDate, updateDate, notSafeForWork,
    notSafeForWorkContext, spoilers, spoilerContext,
  } = post;
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: "Blog",
      item: `${process.env.baseUrl}/blog`,
    },
    {
      position: 3,
      name: title,
      item: process.env.baseUrl + router.asPath,
    },
  ];
  let header = <PostTitle>{title}</PostTitle>;
  if (typeof coverImage !== "undefined") {
    header = <>
      <CoverImage asset={coverImage} />
      <PostTitle>{title}</PostTitle>
    </>;
  }
  const dateOptions: DateOptions = {
    dateStyle: "long",
    timeStyle: "short",
    hour12: true,
    timeZone: "America/New_York",
  };
  let postInfo = <span className="text-sm md:text-base text-white">
    {`Posted ${new Date(publishDate,).toLocaleString("en-US", dateOptions,)} by Collin Bachman`}
  </span>;
  if (updateDate !== "") {
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
  let content = <RichText content={post.content} indentParagraphs={true} />;
  if (!notSafeForWork && spoilers) {
    content = <>
      <Disclosure>
        {({ open, },) => {
          return <>
            {!open
              && <>
                <SpoilerWarning spoilerContext={spoilerContext} />
                <Disclosure.Button as="div">
                  <SpoilerButton />
                </Disclosure.Button>
              </>
            }
            <Disclosure.Panel>
              <RichText content={post.content} indentParagraphs={true} />
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
    </>;
  } else if (notSafeForWork && !spoilers) {
    content = <>
      <Disclosure>
        {({ open, },) => {
          return <>
            {!open
              && <>
                <NsfwWarning notSafeForWorkContext={notSafeForWorkContext} />
                <Disclosure.Button as="div">
                  <NsfwButton />
                </Disclosure.Button>
              </>
            }
            <Disclosure.Panel>
              <RichText content={post.content} indentParagraphs={true} />
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
    </>;
  } else if (notSafeForWork && spoilers) {
    content = <>
      <Disclosure>
        {({ open, },) => {
          return <>
            {!open
              && <>
                <NsfwWarning notSafeForWorkContext={notSafeForWorkContext} />
                <SpoilerWarning spoilerContext={spoilerContext} />
                <Disclosure.Button as="div">
                  <NsfwSpoilerButton />
                </Disclosure.Button>
              </>
            }
            <Disclosure.Panel>
              <RichText content={post.content} indentParagraphs={true} />
            </Disclosure.Panel>
          </>;
        }
        }
      </Disclosure>
    </>;
  }
  return (
    <>
      <NextSeo {...getBlogPostSeo(post, router, preview,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      {preview && <Warning title="Preview Mode">
        This content has not been published yet.
        {` `}
        Make sure to publish it before going live.
      </Warning>}
      <article>
        <header>
          {header}
          <br />
          {postInfo}
        </header>
        <hr className="mb-3" />
        <main>
          <PostLede>{summary}</PostLede>
          <br />
          <br />
          {content}
        </main>
      </article>
    </>
  );
}

BlogPost.getView = function getView (page: ReactElement,) {
  return (
    <LongContentView>
      {page}
    </LongContentView>
  );
};

export const getStaticProps: GetStaticProps = async (
  { params, preview = false, },
) => {
  let post = null;
  if (preview) {
    post = await getPreviewBlogPost(params?.slug as string,);
  } else {
    post = await getBlogPost(params?.slug as string,);
  }

  if (typeof post === "undefined") {
    return { notFound: true, };
  }
  
  return {
    props: {
      preview,
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getBlogPostSlugs();
  return {
    paths: slugs?.map(({ slug, },) => {
      if (typeof slug === "undefined") {
        throw new Error("Missing slug on ContentfulSlug collection!",);
      } else {
        return `/${slug}`;
      }
    },) ?? [],
    fallback: "blocking",
  };
};
