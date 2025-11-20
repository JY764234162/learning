import { FC } from "react";
import { pathJoin } from "./helper";

export interface Props {
  src: string;
  baseUrl?: string;
}

export const Video: FC<Props> = (props) => {
  const { src, baseUrl } = props;
  const url = pathJoin(baseUrl, src);

  return (
    <video className="video-component" width="100%" controls>
      <source src={url} type="video/ogg" />
      <source src={url} type="video/mp4" />
      <source src={url} type="video/webm" />
      <object data={url} width="100%">
        <embed width="100%" src={url} />
      </object>
    </video>
  );
};
