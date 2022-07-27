import type { Document, } from "@contentful/rich-text-types";

declare interface ContentfulEntryLink {
  sys: {
    id: string;
  };
  __typename: string;
  title: string;
  slug: string;
}

declare interface ContentfulAssetLink {
  sys: {
    id: string;
  };
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

declare interface ContentfulRichText {
  json: Document;
  links?: {
    entries?: {
      hyperlink?: ContentfulEntryLink[];
    };
    assets?: {
      block?: ContentfulAssetLink[];
    };
  };
}

declare interface ContentfulPage {
  title: string;
  description: string;
  slug: string;
  content: ContentfulRichText;
}

declare interface ContentfulSlug {
  slug?: string;
}

declare interface ContentfulCoverImage {
  url: string;
  width: number;
  height: number;
  description: string;
}

declare interface ContentfulBlogPost {
  title: string;
  slug: string;
  publishDate: string;
  updateDate: string | null;
  notSafeForWork: boolean;
  notSafeForWorkContext: string[];
  spoilers: boolean;
  spoilerContext: string[];
  coverImage: ContentfulCoverImage | null;
  summary: string;
  content: ContentfulRichText;
}

declare interface ContentfulGraphQLErrorLocation {
  line: number;
  column: number;
}

declare interface ContentfulGraphQLError {
  message: string;
  location: ContentfulGraphQLErrorLocation[];
  path: string[];
  extensions: {
    contentful: {
      code: string;
      requestId: string;
      details?: object;
    };
  };
}

declare interface ContentfulGraphQLResponse {
  data?: {
    pageCollection?: {
      items?: ContentfulPage[] | ContentfulSlug[];
    };
    blogPostCollection?: {
      total: number;
      items?: ContentfulBlogPost[] | ContentfulSlug[];
    };
  };
  errors?: ContentfulGraphQLError[];
}

declare interface DanganronpaChapterLogSubject {
  id: number;
  name: string;
  thumb: string;
  width: number;
  height: number;
}

declare interface DanganronpaChapterLogEvent {
  event: string;
  subject1: DanganronpaChapterLogSubject;
  action: string;
  subject2: DanganronpaChapterLogSubject;
  notes: string;
}

declare interface DanganronpaChapter {
  chapter: number;
  complete: "No" | "Yes";
  videoId: string;
  episodeLink: string;
  hiddenTitle: string;
  title: string;
  logs: DanganronpaChapterLogEvent[];
}

declare interface DanganronpaCharacter {
  name: string;
  role: string;
  thumb: string;
  width: number;
  height: number;
}

declare interface DanganronpaRankedCharacter extends DanganronpaCharacter {
  rank: number;
}

declare interface DanganronpaBlogPost {
  title: string;
  slug: string;
}

declare interface DanganronpaSeries {
  series: number;
  type: "Anime" | "Game";
  hiddenName: string;
  name: string;
  characters: DanganronpaCharacter[];
  favorites: DanganronpaRankedCharacter[];
  chapters: DanganronpaChapter[];
  posts: DanganronpaBlogPost[];
}
