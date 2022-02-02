import { BLOCKS, INLINES, } from "@contentful/rich-text-types";
import {
  BlockQuote,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Hyperlink, ListItem, OrderedList,
  Paragraph, UnorderedList,
} from "../layout/Typography";
import Asset from "./Asset";
import { documentToReactComponents, }
  from "@contentful/rich-text-react-renderer";

const markdownOptions = (content, indent,) => {
  return {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children,) => {
        return <Heading1>{children}</Heading1>;
      },
      [BLOCKS.HEADING_2]: (node, children,) => {
        return <Heading2>{children}</Heading2>;
      },
      [BLOCKS.HEADING_3]: (node, children,) => {
        return <Heading3>{children}</Heading3>;
      },
      [BLOCKS.HEADING_4]: (node, children,) => {
        return <Heading4>{children}</Heading4>;
      },
      [BLOCKS.HEADING_5]: (node, children,) => {
        return <Heading5>{children}</Heading5>;
      },
      [BLOCKS.HEADING_6]: (node, children,) => {
        return <Heading6>{children}</Heading6>;
      },
      [BLOCKS.PARAGRAPH]: (node, children,) => {
        return <Paragraph indent={indent}>{children}</Paragraph>;
      },
      [BLOCKS.UL_LIST]: (node, children,) => {
        return <UnorderedList>{children}</UnorderedList>;
      },
      [BLOCKS.OL_LIST]: (node, children,) => {
        return <OrderedList>{children}</OrderedList>;
      },
      [BLOCKS.LIST_ITEM]: (node,) => {
        const UnTaggedChildren = documentToReactComponents(node, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (childNode, children,) => {
              return <Paragraph indent={false}>{children}</Paragraph>;
            },
            [BLOCKS.UL_LIST]: (childNode, children,) => {
              return <UnorderedList>{children}</UnorderedList>;
            },
            [BLOCKS.OL_LIST]: (childNode, children,) => {
              return <OrderedList>{children}</OrderedList>;
            },
            [BLOCKS.LIST_ITEM]: (childNode, children,) => {
              return children;
            },
          },
        },);
        return (
          <ListItem>
            {UnTaggedChildren}
          </ListItem>
        );
      },
      [BLOCKS.QUOTE]: (node, children,) => {
        return <BlockQuote>{children}</BlockQuote>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node,) => {
        return <Asset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />;
      },
      [INLINES.HYPERLINK]: (node, children,) => {
        return <Hyperlink
          href={node.data.uri}
          external={true}>
          {children}
        </Hyperlink>;
      },
    },
  };
};

export default function RichText ({ content, indentParagraphs, },) {
  return documentToReactComponents(
    content.json, markdownOptions(content, indentParagraphs,),);
}
