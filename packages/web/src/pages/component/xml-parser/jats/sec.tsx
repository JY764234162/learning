import xpath from "xpath";
import { Props } from "./interface";
import { Translate } from "./translate";

export const Sec = (props: Props) => {
  const { node, depth = 0 } = props;
  const id = xpath.select1("string(./@id)", node) as string;

  return (
    <section id={id} data-depth={depth}>
      {(xpath.select("./text()|node()", node) as Array<Node>)?.map(
        (child, index) => {
          const childNode = child as Node;
          return (
            <Translate
              node={childNode}
              key={`${index}-${childNode.nodeName}`}
              depth={depth}
            ></Translate>
          );
        }
      )}
    </section>
  );
};
