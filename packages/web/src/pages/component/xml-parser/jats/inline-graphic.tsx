import { Graphic } from "./graphic";
import { Props } from "./interface";

export interface InlineGraphicProps extends Props {
  baseUrl?: string;
  zoom?: number;
}

export const InlineGraphic = (props: InlineGraphicProps) => {
  const { node, zoom = 1, baseUrl = "" } = props;
  return (
    <Graphic
      node={node}
      zoom={zoom}
      baseUrl={baseUrl}
      className="inline-graphic"
    ></Graphic>
  );
};
