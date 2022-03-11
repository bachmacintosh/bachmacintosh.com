import { CommonNode, Options, } from "@contentful/rich-text-react-renderer";
import { Mark, helpers, } from "@contentful/rich-text-types";
import React, { ReactNode, cloneElement, isValidElement, } from "react";

function nodeListToReactComponents (nodes: CommonNode[], options: Options,)
    : ReactNode {
  return nodes.map(
    (node: CommonNode, index: number,): ReactNode => {
      return appendKeyToValidElement(
        nodeToReactComponent(node, options,), index,);
    },
  );
}

export default function nodeToReactComponent
(node: CommonNode, options: Options,)
    : ReactNode {
  const { renderNode, renderMark, renderText, } = options;
  if (helpers.isText(node,)) {
    return node.marks.reduce((value: ReactNode, mark: Mark,): ReactNode => {
      if (!renderMark?.[mark.type]) {
        return value;
      }
      return renderMark[mark.type](value,);
    }, renderText ? renderText(node.value,) : node.value,);
  } else {
    const children: ReactNode
        = nodeListToReactComponents(node.content, options,);
    if (!node.nodeType || !renderNode?.[node.nodeType]) {
      return <>{children}</>;
    }
    return renderNode[node.nodeType](node, children,);
  }
}

function appendKeyToValidElement (element: ReactNode, key: number,): ReactNode {
  if (isValidElement(element,) && element.key === null) {
    return cloneElement(element, { key, },);
  }
  return element;
}
