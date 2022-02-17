export default async function handler (req, res,) {
  if (req.query.secret !== process.env.PAGE_REVALIDATE_SECRET) {
    return res.status(401,).json({ message: "Invalid token", },);
  }

  try {
    await res.unstable_revalidate("/jpn/anime",);
    await res.unstable_revalidate("/jpn/wanikani",);
    return res.json({ revalidated: true, },);
  } catch (error) {
    return res.status(500,).send("Error revalidating pages.",);
  }
}
