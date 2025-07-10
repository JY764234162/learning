import { FC } from "react";
import { select1 } from "xpath";
import { textContent } from "./helper";

interface Props {
  node: Node;
}

export const Name: FC<Props> = (props) => {
  const { node } = props;
  // const nameStyle = select1('string(@name-style)', node);
  const surname = textContent(select1("./surname", node));
  const givenNames = textContent(select1("./given-names", node));
  /**
   * DataD 统一按西方姓名规则排列
   */
  return (
    <span className="name">
      {givenNames} {surname}
    </span>
  );
};
