import { getPreviewBlogPost, } from "../../../lib/contentful/blogpost";

export default async function blogPost (req, res,) {
  if (req.query.secret !== process.env.CONTENTFUL_PREVIEW_SECRET
    || !req.query.slug) {
    return res.status(401,).json({ message: "Invalid token", },);
  }
  const previewBlogPost = await getPreviewBlogPost(req.query.slug,);

  if (!previewBlogPost) {
    return res.status(401,).json({ message: "Invalid slug", },);
  }

  res.setPreviewData({},);

  const url = `/blog/post/${req.query.slug}`;

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
