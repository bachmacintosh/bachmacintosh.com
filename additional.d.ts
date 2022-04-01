import { Document, } from "@contentful/rich-text-types";

declare type ContentfulEntryLink = {
    sys: {
        id: string,
    },
    __typename: string,
    title: string,
    slug: string,
};

declare type ContentfulAssetLink = {
    sys: {
        id: string,
    },
    url: string,
    title: string,
    description: string,
    width: number,
    height: number,
};

declare type ContentfulRichText = {
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

declare type ContentfulPage = {
    title: string,
    description: string,
    slug: string,
    content: ContentfulRichText,
};

declare type ContentfulSlug = {
    slug?: string,
};

declare type ContentfulCoverImage = {
    url: string,
    width: number,
    height: number,
    description: string,
};

declare type ContentfulBlogPost = {
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

declare type ContentfulGraphQLErrorLocation = {
    line: number,
    column: number,
}

declare type ContentfulGraphQLError = {
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

declare type ContentfulGraphQLResponse = {
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
