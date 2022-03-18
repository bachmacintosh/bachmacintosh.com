import { getPreviewPage, } from "../../../lib/contentful/page";

export default async function page (req, res,) {
  if (req.query.secret !== process.env.CONTENTFUL_PREVIEW_SECRET
    || !req.query.slug) {
    return res.status(401,).json({ message: "Invalid token", },);
  }
  const previewPage = await getPreviewPage(req.query.slug,);

  if (!previewPage) {
    return res.status(401,).json({ message: "Invalid slug", },);
  }

  res.setPreviewData({},);

  const url = `/${req.query.slug}`;

  res.write(
    `<!DOCTYPE html><html lang="en">
<head>
<meta http-equiv="Refresh" content="0; url=${url}" />
<script>window.location.href = '${url}'</script>
</head>
</html>`,
  );
  res.end();

  return null;
}
