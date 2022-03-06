import {
  ButtonLink, NsfwButtonLink, NsfwSpoilerButtonLink,
  SpoilerButtonLink,
} from "../layout/Buttons";
import { Paragraph, PostTitle, } from "../layout/Typography";
import CoverImage from "../contentful/CoverImage";

export default function PostList ({ posts, },) {
  return (
    posts.map((post,) => {
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
    },)
  );
}
