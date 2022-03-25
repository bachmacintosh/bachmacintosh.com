import { Hyperlink, } from "../layout/Typography";

export default function EntryHyperlink ({ id, entries, children, },) {
  const entry = entries?.find((object,) => {
    return object.sys.id === id;
  },);
  // eslint-disable-next-line no-underscore-dangle
  if (entry.__typename === "Page") {
    return <Hyperlink
      href={`/${entry.slug}`}
      external={false}>
      {children}
    </Hyperlink>;
    // eslint-disable-next-line no-underscore-dangle
  } else if (entry.__typename === "BlogPost") {
    return <Hyperlink
      href={`/blog/post/${entry.slug}`}
      external={false}>
      {children}</Hyperlink>;
  }
  return <span
    className="text-orange-300 font-bold"
  >Error Rending Hyperlink
  </span>;
}
