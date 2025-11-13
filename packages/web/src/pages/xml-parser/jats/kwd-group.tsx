import { FC } from "react";
import xpath from "xpath";
import { Kwd } from "./kwd";

export interface Props {
  node: Node;
}

export const KwdGroup: FC<Props> = (props) => {
  const { node } = props;
  return (
    <div className="article-keyword-group">
      {(xpath.select("./*", node) as Node[]).map((node, i) => (
        <Kwd key={`${i}.${node.nodeName}`} node={node} />
      ))}
    </div>
  );
};
