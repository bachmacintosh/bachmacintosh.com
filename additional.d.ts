import { Asset, Entry, } from "contentful";
import { Document, } from "@contentful/rich-text-types";

export type ContentfulRichText = {
    json: Document,
    links?: {
        entries?: {
            inline?: Array<Entry>,
            block?: Array<Entry>,
            hyperlink?: Array<Entry>,
        },
        assets?: {
            block?: Array<Asset>,
            hyperlink?: Array<Asset>,
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

type ContentfulGraphQLErrorLocation = {
    line: number,
    column: number,
}

type ContentfulGraphQLError = {
    message: string,
    location: Array<ContentfulGraphQLErrorLocation>,
    path: Array<string>,
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
            items?: Array<ContentfulPage> | Array<ContentfulSlug>,
        }
    },
    errors?: Array<ContentfulGraphQLError>,
}
