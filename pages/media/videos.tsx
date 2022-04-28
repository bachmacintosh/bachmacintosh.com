import { BreadcrumbJsonLd, NextSeo, } from "next-seo";
import {
  Heading1,
  Hyperlink,
  Paragraph,
} from "../../components/layout/Typography";
import DefaultView from "../../components/views/DefaultView";
import FlexWrapper from "../../components/layout/FlexWrapper";
import { GetStaticProps, } from "next";
import Image from "next/image";
import { ReactElement, } from "react";
import { getPageSEO, } from "../../lib/seo";
import { getVideosFeaturingMe, } from "../../lib/google/youtube";
import { useRouter, } from "next/router";
// eslint-disable-next-line camelcase
import { youtube_v3, } from "googleapis";
// eslint-disable-next-line camelcase
import Schema$PlaylistItem = youtube_v3.Schema$PlaylistItem;

type PageProps = {
  videos: Schema$PlaylistItem[];
};

export default function Videos ({ videos, }: PageProps,) {
  const title = "Videos";
  const description = "A bunch of videos that I either made or appear in";
  const router = useRouter();
  const breadcrumbs = [
    {
      position: 1,
      name: "BachMacintosh",
      item: process.env.baseUrl,
    },
    {
      position: 2,
      name: "Media",
      item: `${process.env.baseUrl}/media`,
    },
    {
      position: 3,
      name: title,
      item: process.env.baseUrl + router.asPath,
    },
  ];
  return (
    <>
      <NextSeo {...getPageSEO(title, description, router,)} />
      <BreadcrumbJsonLd itemListElements={breadcrumbs} />
      <Heading1>Videos</Heading1>
      <Paragraph indent={false}>
        These are the 50 latest YouTube videos I either made or appeared in
        {" "}
        alongside other people.
      </Paragraph>
      <hr />
      <div className="my-5">
        <FlexWrapper>
          { videos.map((video,) => {
            return (
              <div
                key={video.snippet?.title}
                className="w-80 mx-12 flex flex-wrap mb-5"
              >
                <div className="mb-1">
                  <Image
                    src={video.snippet?.thumbnails?.medium?.url as string}
                    width={video.snippet?.thumbnails?.medium?.width as number}
                    height={video.snippet?.thumbnails?.medium?.height as number}
                    alt={video.snippet?.description
                        ?? "No description was provided for this video."}
                    unoptimized
                  />
                </div>
                <Hyperlink href={`https://www.youtube.com/watch?v=${video.snippet?.resourceId?.videoId}`} external={true} >{video.snippet?.title}</Hyperlink>
                <span
                  className="text-sm md:text-base text-gray-400"
                >
                  {video.snippet?.videoOwnerChannelTitle}
                </span>
              </div>
            );
          },)}
          <div className="w-80 mx-12 flex flex-wrap mb-5">
            <div className="mb-1">
              <Image
                src="https://images.ctfassets.net/kv526tbd0cl9/4Gx0HDLdpZT5qEBPQkRS11/d548c2911794f554425ac01db06c318d/view_more_videos_youtube.png"
                width={320}
                height={180}
                alt="View More on YouTube"
                unoptimized
              />
            </div>
            <Hyperlink href="https://www.youtube.com/playlist?list=PLPKLafu8C8JeCkoRnEbkk8zCWBIYMRUy1" external={true}>View More on YouTube</Hyperlink>
          </div>
        </FlexWrapper>
      </div>
    </>
  );
}

Videos.getView = (page: ReactElement,) => {
  return (
    <DefaultView>
      {page}
    </DefaultView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const videos = await getVideosFeaturingMe();
  return { props: { videos, }, };
};
