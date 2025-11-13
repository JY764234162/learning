import { FC } from "react";

export interface Props {
  node: Node;
}

export const Kwd: FC<Props> = (props) => {
  const { node } = props;
  return <span className="article-keyword">{node.textContent}</span>;
};
