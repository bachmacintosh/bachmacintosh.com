import { Document, } from "@contentful/rich-text-types";

export type ContentfulEntryLink = {
    sys: {
        id: string,
    },
    __typename: string,
    title: string,
    slug: string,
};

export type ContentfulAssetLink = {
    sys: {
        id: string,
    },
    url: string,
    title: string,
    description: string,
    width: number,
    height: number,
};

export type ContentfulRichText = {
    json: Document,
    links?: {
        entries?: {
            hyperlink?: ContentfulEntryLink[],
        },
        assets?: {
            block?: ContentfulAssetLink[],
        }
    }
}

export type ContentfulPage = {
    title: string,
    description: string,
    slug: string,
    content: ContentfulRichText,
};

export type ContentfulSlug = {
    slug?: string,
};

export type ContentfulCoverImage = {
    url: string,
    width: number,
    height: number,
    description: string,
};

export type ContentfulBlogPost = {
    title: string,
    slug: string,
    publishDate: string,
    updateDate: string,
    notSafeForWork: boolean,
    notSafeForWorkContext: string[],
    spoilers: boolean,
    spoilerContext: string[],
    coverImage?: ContentfulCoverImage,
    summary: string,
    content: ContentfulRichText,
};

type ContentfulGraphQLErrorLocation = {
    line: number,
    column: number,
}

type ContentfulGraphQLError = {
    message: string,
    location: ContentfulGraphQLErrorLocation[],
    path: string[],
    extensions: {
        contentful: {
            code: string,
            requestId: string,
            details?: object,
        }
    }
}

export type ContentfulGraphQLResponse = {
    data?: {
        pageCollection?: {
            items?: ContentfulPage[] | ContentfulSlug[],
        },
        blogPostCollection?: {
            total: number,
            items?: ContentfulBlogPost[] | ContentfulSlug[]
        }
    },
    errors?: ContentfulGraphQLError[],
}
