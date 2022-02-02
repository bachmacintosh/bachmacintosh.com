import { BLOCKS, INLINES, } from '@contentful/rich-text-types';
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
import { documentToReactComponents, } from '@contentful/rich-text-react-renderer';

const markdownOptions = (content, indent,) => ({
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children,) => <Heading1>{children}</Heading1>,
    [BLOCKS.HEADING_2]: (node, children,) => <Heading2>{children}</Heading2>,
    [BLOCKS.HEADING_3]: (node, children,) => <Heading3>{children}</Heading3>,
    [BLOCKS.HEADING_4]: (node, children,) => <Heading4>{children}</Heading4>,
    [BLOCKS.HEADING_5]: (node, children,) => <Heading5>{children}</Heading5>,
    [BLOCKS.HEADING_6]: (node, children,) => <Heading6>{children}</Heading6>,
    [BLOCKS.PARAGRAPH]: (node, children,) => <Paragraph indent={indent}>{children}</Paragraph>,
    [BLOCKS.UL_LIST]: (node, children,) => <UnorderedList>{children}</UnorderedList>,
    [BLOCKS.OL_LIST]: (node, children,) => <OrderedList>{children}</OrderedList>,
    [BLOCKS.LIST_ITEM]: (node,) => {
      const UnTaggedChildren = documentToReactComponents(node, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (childNode, children,) => <Paragraph indent={false}>{children}</Paragraph>,
          [BLOCKS.UL_LIST]: (childNode, children,) => <UnorderedList>{children}</UnorderedList>,
          [BLOCKS.OL_LIST]: (childNode, children,) => <OrderedList>{children}</OrderedList>,
          [BLOCKS.LIST_ITEM]: (childNode, children,) => children,
        },
      },);
      return (
        <ListItem>
          {UnTaggedChildren}
        </ListItem>
      );
    },
    [BLOCKS.QUOTE]: (node, children,) => <BlockQuote>{children}</BlockQuote>,
    [BLOCKS.EMBEDDED_ASSET]: (node,) => <Asset id={node.data.target.sys.id} assets={content.links.assets.block} />,
    [INLINES.HYPERLINK]: (node, children,) => <Hyperlink href={node.data.uri} external={true}>{children}</Hyperlink>,
  },
});

export default function RichText({ content, indentParagraphs, },) {
  return documentToReactComponents(content.json, markdownOptions(content, indentParagraphs,),);
}
