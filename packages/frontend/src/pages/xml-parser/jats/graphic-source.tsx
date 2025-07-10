import xpath from "xpath";
import { imageStateAttrs, parseAttrNumber } from "./helper";
import { Props } from "./interface";

export interface GraphicSourceProps extends Props {
  zoom?: number;
  baseUrl?: string;
}

export const GraphicSource = (props: GraphicSourceProps) => {
  const { node, zoom = 1, baseUrl = "" } = props;
  const specificUse = xpath.select1("string(@specific-use)", node) || "print";
  const href = xpath.select1(
    'string(./@*[name()="xlink:href"])',
    node
  ) as string;
  const piAttrs = imageStateAttrs(node);
  let media = "";

  switch (specificUse) {
    case "small":
      media = "max-width(768px)";
      break;
    case "big":
      media = "min-width(769px)";
      break;
    case "print":
      media = "print";
      break;
  }

  return (
    <source
      srcSet={`${baseUrl}${href}`}
      media={media}
      width={zoom * parseAttrNumber(piAttrs?.getNamedItem("width"))}
      height={zoom * parseAttrNumber(piAttrs?.getNamedItem("height"))}
    />
  );
};
