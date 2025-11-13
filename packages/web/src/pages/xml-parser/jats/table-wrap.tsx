import { FC } from "react";
import { select, select1 } from "xpath";
import { attr, getAttrsMap, textContent } from "./helper";
import "./style.less";
import { Translate } from "./translate";

export interface Props {
  node: Node;
  lang?: string;
}

export const TableWrap: FC<Props> = (props) => {
  const { node, lang = "zh" } = props;
  const objectId = select1("./object-id", node);

  return (
    <div className="table-wrap" {...getAttrsMap(node)}>
      <data value={textContent(objectId)}>{attr(objectId, "pub-id-type")}</data>
      <div className="table-wrap-abstract">
        <strong>{textContent(select1(`./abstract[lang("${lang}")]/label`, node) || select1("./label", node))}</strong>
        <Translate node={select1(`./abstract[lang("${lang}")]/title`, node) || select1("./caption", node)} />
      </div>
      <Translate node={select1("./alternatives", node) || select1("./table", node)}></Translate>

      {/*lang=en|zh*/}
      {(select(`./table-wrap-foot//fn[lang("${lang}")]`, node) as Array<Node>)?.map((fn, i) => (
        <Translate key={i} node={fn}></Translate>
      ))}

      {/*empty lang attr*/}
      {(select("./table-wrap-foot//fn[not(lang(*))]", node) as Array<Node>)?.map((fn, i) => (
        <Translate key={i} node={fn}></Translate>
      ))}
    </div>
  );
};
