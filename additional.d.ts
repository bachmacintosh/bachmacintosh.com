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
  updateDate: string;
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
