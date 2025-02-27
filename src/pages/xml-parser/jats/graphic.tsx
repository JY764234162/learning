import classNames from "classnames";
import { useMemo } from "react";
import xpath from "xpath";
import { GraphicSource } from "./graphic-source";
import { imageStateAttrs, isNode, parseAttrNumber } from "./helper";
import { Props } from "./interface";

export interface GraphicProps extends Props {
  zoom?: number;
  baseUrl?: string;
}

export const Graphic = (props: GraphicProps) => {
  const { className, node, zoom = 1, baseUrl = "" } = props;
  const piAttrs = imageStateAttrs(node);
  const siblings = (
    xpath.select(`../${node.nodeName}`, node) as Array<Node>
  )?.filter((x) => x !== node);
  const src = useMemo(() => {
    const _src = `${baseUrl}/${xpath
      .select1('string(@*[name()="xlink:href"])', node)
      ?.toString()}`;
    const href = isNode(siblings?.[0])
      ? xpath.select1('string(./@*[name()="xlink:href"])', siblings?.[0])
      : "";

    const src =
      _src?.endsWith(".tif") || _src?.endsWith(".pdf")
        ? `${baseUrl}/${href}`
        : _src;
    return src;
  }, [baseUrl, node, siblings]);

  if (src.endsWith(".gif")) {
    /**
     * 目前 DataD 数据源并未爬取图片，无法解析并展示出图片
     * 所以如果在节点下检测出图片需要将对应节点用 null 覆盖
     * 覆盖规则：
     * 需要找到图片的最小显示样式的父节点，将其覆盖。
     * 此处覆盖文献示例 ID：0051ecde9e58fa1ff21ba5bc846aa0c58ecd9296cc5f6dde994081c17eca60b6
     */
    return null;
  }

  return (
    <picture>
      {siblings.map((s, i) => (
        <GraphicSource
          baseUrl={`${baseUrl}/`}
          key={`${i}.${(s as Node).nodeValue}`}
          node={s as Node}
          zoom={zoom}
        />
      ))}

      <img
        alt="pic"
        loading="lazy"
        className={classNames("graphic", className)}
        src={src}
        width={zoom * parseAttrNumber(piAttrs?.getNamedItem("width"))}
        height={zoom * parseAttrNumber(piAttrs?.getNamedItem("height"))}
        data-specific-use={
          xpath.select1("string(@specific-use)", node) || "print"
        }
      />
    </picture>
  );
};
