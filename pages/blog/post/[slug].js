import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
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
import CoverImage from "../../../components/contentful/CoverImage";
import DefaultLayout from "../../../components/DefaultLayout";
import { Disclosure, } from "@headlessui/react";
import React from "react";
import RichText from "../../../components/contentful/RichText";
import Warning from "../../../components/layout/Warning";
import { getBlogPostSeo, } from "../../../lib/seo";
import { useRouter, } from "next/router";

export default function BlogPost ({ post, preview, },) {
  const {
    title, coverImage, summary, publishDate, updateDate, notSafeForWork,
    spoilers, spoilerName,
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
  let content = <RichText content={post.content} indentParagraphs={true} />;
  if (!notSafeForWork && spoilers) {
    content = <>
      <Disclosure>
        {({ open, },) => {
          return <>
            {!open
              && <>
                <SpoilerWarning spoilerName={spoilerName} />
                <Disclosure.Button>
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
                <NsfwWarning />
                <Disclosure.Button>
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
                <NsfwWarning />
                <SpoilerWarning spoilerName={spoilerName} />
                <Disclosure.Button>
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
      <NextSeo {...getBlogPostSeo(post, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      {preview && <Warning title="Preview Mode">
        This content has not been published yet.
        {` `}
        Make sure to publish it before going live.
      </Warning>}
      {header}
      <br />
      {postInfo}
      <hr className="mb-3" />
      <PostLede>{summary}</PostLede>
      <br />
      <br />
      {content}
    </>
  );
}

BlogPost.getLayout = function getLayout (page,) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps ({ params, preview = false, },) {
  let post = null;
  if (preview) {
    post = await getPreviewBlogPost(params.slug,);
  } else {
    post = await getBlogPost(params.slug,);
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
}

export async function getStaticPaths () {
  const paths = [];
  const slugs = await getBlogPostSlugs();
  slugs.forEach((item,) => {
    paths.push({ params: { slug: item.slug, }, },);
  },);
  return {
    paths,
    fallback: "blocking",
  };
}
