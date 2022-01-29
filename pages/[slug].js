import {getPage, getPageSlugs,} from "../lib/contentful/page";
import Warning from "../components/layout/Warning";
import {NextSeo,} from "next-seo";
import DefaultLayout from "../components/DefaultLayout";
import RichText from "../components/contentful/RichText";

export default function Page({page, preview,}) {
    return(
        <DefaultLayout>
            <NextSeo
                title={page.title}
                description={page.description}
            />
            {preview && <Warning title="Preview Mode">This content has not been published yet. Make sure to publish it before going live.</Warning>}
            <RichText content={page.content} indentParagraphs={true} />
        </DefaultLayout>
    );
}

export async function getStaticProps({params, preview = false,}) {
    const page = await getPage(params.slug, preview);

    return {
        props: {
            preview,
            page: page ?? null,
        },
    };
}

export async function getStaticPaths() {
    const slugs = await getPageSlugs();

    return {
        paths: slugs?.map(({ slug, }) => `/${slug}`) ?? [],
        fallback: false,
    };
}