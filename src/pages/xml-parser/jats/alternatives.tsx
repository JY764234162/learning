import xpath from "xpath";
import { Props as BaseProps } from "./interface";
import { Translate } from "./translate";

export interface Props extends BaseProps {
  select: string;
}

/**
 * @todo 支持多选，根据媒体信息选用资源
 */
export const Alternatives = (props: Props) => {
  const { node: parentNode, select } = props;
  console.log(parentNode);
  const node = xpath.select1(select, parentNode);

  console.log(node);
  if (!node) return null;

  if (
    typeof node === "string" ||
    typeof node === "number" ||
    typeof node === "boolean"
  ) {
    return <>{node.toString()}</>;
  }

  return <Translate node={node}></Translate>;
};
