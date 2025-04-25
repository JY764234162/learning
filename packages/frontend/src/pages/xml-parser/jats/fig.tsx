//@ts-nocheck
import { useMemo } from "react";
import xpath from "xpath";
import { Alternatives } from "./alternatives";
import { Graphic } from "./graphic";
import { getAttrsMap, isNode, textContent } from "./helper";
import { Props } from "./interface";
import { Translate } from "./translate";

export const Fig = (props: Props) => {
  const { node, baseUrl } = props;
  const attrsMap = getAttrsMap(node);

  const labelNode = () => {
    if (!node) return null;
    const main = xpath.select1("./label", node);
    const sub = xpath.select("./title", node);
    return main || sub;
  };

  const captionNode = useMemo(() => {
    const main = xpath.select1("./caption", node);
    const sub = xpath.select1("./abstract/title", node);
    return main || sub;
  }, [node]);

  const alternativesNode = xpath.select1("./alternatives", node);
  const graphic = xpath.select1(".//graphic", node);

  /**
   * 目前 DataD 数据源并未爬取图片，无法解析并展示出图片
   * 所以如果在节点下检测出图片需要将对应节点用 null 覆盖
   * 覆盖规则：
   * 需要找到图片的最小显示样式的父节点，将其覆盖。
   * 此处覆盖文献示例 ID：003c6bd440a0a00b9fde6a22b4851d1e5fb1ff30364b1f7b540f22ffacd22747
   * 此处覆盖文献示例 ID：4233c92cd9ebdcc4f7a18199b4ba45f8b3aecee7652072d41bf367684c558eb3
   */
  const hasGraphic = !!xpath.select(".//graphic", node)?.length;
  if (hasGraphic) {
    return null;
  }

  //   console.log(
  //     attrsMap,
  //     labelNode,
  //     captionNode,
  //     alternativesNode,
  //     graphic,
  //     hasGraphic
  //   );
  return (
    <figure {...attrsMap} className="sec-figure">
      {isNode(alternativesNode) && (
        <Alternatives
          node={alternativesNode}
          select="./*[@specific-use='big']"
        ></Alternatives>
      )}
      {isNode(graphic) && <Graphic node={graphic} baseUrl={baseUrl} zoom={1} />}
      <figcaption>
        {isNode(labelNode()) && <strong>{textContent(labelNode())}</strong>}
        {isNode(captionNode) && <Translate node={captionNode} />}
      </figcaption>
    </figure>
  );
};
