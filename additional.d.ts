import { Asset, Entry, } from "contentful";
import { Document, } from "@contentful/rich-text-types";

export type ContentfulRichText = {
    json: Document,
    links?: {
        entries?: {
            inline?: Entry[],
            block?: Entry[],
            hyperlink?: Entry[],
        },
        assets?: {
            block?: Asset[],
            hyperlink?: Asset[],
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

export type ContentfulBlogPost = {
    title: string,
    slug: string,
    publishDate: string,
    updateDate: string,
    notSafeForWork: boolean,
    notSafeForWorkContext: string[],
    spoilers: boolean,
    spoilerContext: string[],
    coverImage?: Asset,
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
