/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* Contentful does not provide rich typing for NodeData,
is Record<string, any> */
import { BLOCKS, INLINES, } from "@contentful/rich-text-types";
import type {
  Block,
  Inline,
} from "@contentful/rich-text-types";
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
import type { ReactElement, ReactNode, } from "react";
import Asset from "./Asset";
import type { ContentfulRichText, } from "../../additional";
import EntryHyperlink from "./EntryHyperlink";
import type { Options, } from "@contentful/rich-text-react-renderer";
import { documentToReactComponents, }
  from "@contentful/rich-text-react-renderer";
import nodeToReactComponent from "../../lib/contentful/nodeToReactComponent";

const markdownOptions
= (content: ContentfulRichText, indent: boolean,): Options => {
  return {
    renderNode: {
      [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode,) => {
        return <Heading1>{children}</Heading1>;
      },
      [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode,) => {
        return <Heading2>{children}</Heading2>;
      },
      [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode,) => {
        return <Heading3>{children}</Heading3>;
      },
      [BLOCKS.HEADING_4]: (node: Block | Inline, children: ReactNode,) => {
        return <Heading4>{children}</Heading4>;
      },
      [BLOCKS.HEADING_5]: (node: Block | Inline, children: ReactNode,) => {
        return <Heading5>{children}</Heading5>;
      },
      [BLOCKS.HEADING_6]: (node: Block | Inline, children: ReactNode,) => {
        return <Heading6>{children}</Heading6>;
      },
      [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode,) => {
        return <Paragraph indent={indent}>{children}</Paragraph>;
      },
      [BLOCKS.UL_LIST]: (node: Block | Inline, children: ReactNode,) => {
        return <UnorderedList>{children}</UnorderedList>;
      },
      [BLOCKS.OL_LIST]: (node: Block | Inline, children: ReactNode,) => {
        return <OrderedList>{children}</OrderedList>;
      },
      [BLOCKS.LIST_ITEM]: (node,) => {
        const UnTaggedChildren = nodeToReactComponent(node, {
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
            [INLINES.HYPERLINK]: (childNode, children,) => {
              return <Hyperlink
                href={childNode.data.uri}
                external={true}>
                {children}
              </Hyperlink>;
            },
          },
        },);
        return (
          <ListItem>
            {UnTaggedChildren}
          </ListItem>
        );
      },
      [BLOCKS.QUOTE]: (node: Block | Inline, children: ReactNode,) => {
        return <BlockQuote>{children}</BlockQuote>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline,) => {
        return <Asset
          id={node.data.target.sys.id as string}
          assets={content.links?.assets?.block}
        />;
      },
      [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode,) => {
        return <Hyperlink
          href={node.data.uri}
          external={true}>
          {children}
        </Hyperlink>;
      },
      [INLINES.ENTRY_HYPERLINK]: (node, children,) => {
        return <EntryHyperlink
          id={node.data.target.sys.id}
          entries={content.links?.entries?.hyperlink}>
          {children}
        </EntryHyperlink>;
      },
    },
  };
};

interface RichTextProps {
  content: ContentfulRichText;
  indentParagraphs: boolean;
}

export default function RichText
({ content, indentParagraphs, }: RichTextProps,): ReactElement {
  if (typeof content === "undefined") {
    return <></>;
  } else {
    return <>
      {documentToReactComponents(
        content.json, markdownOptions(content, indentParagraphs,),)}
    </>;
  }
}
