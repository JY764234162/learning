import xpath from "xpath";
import { Props } from "./interface";
import { Translate } from "./translate";

export const Sup = (props: Props) => {
  const { node } = props;
  return (
    <sup>
      {(xpath.select("./text()|node()", node) as Array<Node>)?.map((el, i) => (
        <Translate node={el as Node} key={i}></Translate>
      ))}
    </sup>
  );
};
