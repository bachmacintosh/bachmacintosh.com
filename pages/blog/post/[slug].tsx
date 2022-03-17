import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import { GetStaticPaths, GetStaticProps, } from "next";
import
{ NsfwButton, NsfwSpoilerButton, SpoilerButton, }
  from "../../../components/layout/Buttons";
import
{ NsfwWarning, PostLede, PostTitle, SpoilerWarning, }
  from "../../../components/layout/Typography";
import React, { ReactElement, } from "react";
import {
  getBlogPost, getBlogPostSlugs,
  getPreviewBlogPost,
} from "../../../lib/contentful/blogpost";
import { ContentfulBlogPost, } from "../../../additional";
import CoverImage from "../../../components/contentful/CoverImage";
import DefaultView from "../../../components/views/DefaultView";
import { Disclosure, } from "@headlessui/react";
import RichText from "../../../components/contentful/RichText";
import Warning from "../../../components/layout/Warning";
import { getBlogPostSeo, } from "../../../lib/seo";
import { useRouter, } from "next/router";

type PageProps = {
  post: ContentfulBlogPost,
  preview: boolean,
};

type DateOptions = {
  dateStyle: "long" | "medium" | "short",
  timeStyle: "long" | "medium" | "short",
  hour12: boolean,
  timeZone: string,
}


export default function BlogPost ({ post, preview, }: PageProps,) {
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
  if (coverImage !== null) {
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
    <DefaultView>
      {page}
    </DefaultView>
  );
};

export const getStaticProps: GetStaticProps = async (
  { params, preview = false, },
) => {
  let post = null;
  if (preview) {
    post = await getPreviewBlogPost(params?.slug,);
  } else {
    post = await getBlogPost(params?.slug,);
  }

  if (typeof post === "undefined") {
    return { notFound: true, };
  }
  
  return {
    props: {
      preview,
      post: post ?? null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getBlogPostSlugs();
  return {
    paths: slugs?.map(({ slug, },) => {
      return `/blog/post/${slug}`;
    },) ?? [],
    fallback: "blocking",
  };
};
