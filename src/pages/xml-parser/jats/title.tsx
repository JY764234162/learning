import React from "react";
import xpath from "xpath";
import { Props as BaseProps } from "./interface";
import { Translate } from "./translate";

export interface Props extends BaseProps {
  id?: string;
}

export const Title = (props: Props) => {
  const { node, depth = 0, id = "", tagName } = props;

  const headingLevel = `h${Math.min(2 + depth, 6)}` as any;
  const TagName = tagName ?? headingLevel;
  return (
    <TagName id={id && `${id}.title`}>
      {(xpath.select("./text()|node()", node) as Array<Node>)?.map((el, i) => {
        const childNode = el as Node;
        const { nodeName } = childNode;
        switch (nodeName) {
          case "#text":
            return (
              <React.Fragment key={i}>{childNode.textContent}</React.Fragment>
            );
          default:
            return (
              <Translate key={`${i}.${nodeName}`} node={childNode}></Translate>
            );
        }
      })}
    </TagName>
  );
};
