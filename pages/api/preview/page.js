import { getPage, } from '../../../lib/contentful/page';

export default async function page(req, res,) {
    const { secret, slug, } = req.query;
    const regex = /^[a-zA-Z0-9-_]+$/;
    const found = slug.match(regex,);
    const pageSlug = found.length > 0 ? found[0] : false;

    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !pageSlug) {
        return res.status(401,).json({ message: 'Invalid token', },);
    }
    const page = await getPage(pageSlug, true,);

    if (!pageSlug) {
        return res.status(401,).json({ message: 'Invalid slug', },);
    }

    res.setPreviewData({},);

    const url = `/${page.slug}`;

    res.write(
        `<!DOCTYPE html><html lang="en"><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>
    </html>`,
    );
    res.end();

    return undefined;
}