import { Props } from "./interface";
import xpath from "xpath";
import { Translate } from "./translate";

/**
 * @todo 支持传 children 或 renderProps
 */
export const ForEach = (props: Props) => {
  const { node, prefix } = props;
  return (
    <>
      {(xpath.select("./text()|node()", node) as Array<Node>)?.map((cn, i) => (
        <Translate
          prefix={prefix}
          node={cn as Node}
          key={`${i}.${(cn as Node).nodeName}`}
        />
      ))}
    </>
  );
};
