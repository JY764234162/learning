import xpath from "xpath";
import { Props } from "./interface";
import { Translate } from "./translate";

export const Paragraph = (props: Props) => {
  const { node, depth = 0 } = props;
  return (
    <p>
      {(xpath.select("./text()|node()", node) as Array<Node>)?.map(
        (el, index) => (
          <Translate
            key={`${index}.${(el as Node).nodeName}`}
            node={el as Node}
            depth={depth}
          ></Translate>
        )
      )}
    </p>
  );
};
