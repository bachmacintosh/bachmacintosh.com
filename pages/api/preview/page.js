import { getPage, } from '../../../lib/contentful/page';

export default async function page(req, res,) {
    const { secret, slug, } = req.query;
    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET || !slug) {
        return res.status(401,).json({ message: 'Invalid token', },);
    }
    const page = await getPage(slug, true,);

    if (!page) {
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
}