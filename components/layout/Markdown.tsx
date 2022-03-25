import {
  BlockQuote, Code, Heading1, Heading2, Heading3, Heading4,
  Heading5, Heading6, Hyperlink, ListItem, OrderedList, Paragraph,
  UnorderedList,
} from "./Typography";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ComponentProps = {
  children: string,
}

export default function Markdown ({ children, }: ComponentProps,) {
  // eslint-disable-next-line react/no-children-prop
  return <ReactMarkdown children={children}
    remarkPlugins={[[remarkGfm, { singleTilde: false, },],]}
    components={{
      h1: Heading1,
      h2: Heading2,
      h3: Heading3,
      h4: Heading4,
      h5: Heading5,
      h6: Heading6,
      blockquote: BlockQuote,
      code: Code,
      ol: OrderedList,
      ul: UnorderedList,
      li: ListItem,
      // eslint-disable-next-line id-length
      p: ({ ...props },) => {
        return <Paragraph indent={false} {...props} />;
      },
      // eslint-disable-next-line id-length
      a: ({ ...props },) => {
        if (props.href?.startsWith("#",)) {
          return <a
            className="text-blue-diamond hover:text-white underline"
            {...props}
          />;
        }
        return <Hyperlink external={true} {...props} />;
      },
      del: ({ ...props },) => {
        return <del className="text-red-200 decoration-2" {...props} />;
      },
      pre: ({ ...props },) => {
        return <pre className="mb-4" {...props} />;
      },
    }}
  />;
}
