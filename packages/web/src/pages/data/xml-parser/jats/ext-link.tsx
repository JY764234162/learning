import xpath from "xpath";
import { Props } from "./interface";

export const ExtLink = (props: Props) => {
  const { node } = props;
  const type = xpath.select("string(@ext-link-type)", node)?.toString();
  return (
    <a
      data-ext-link-type={type}
      target="blank"
      referrerPolicy="same-origin"
      href={xpath.select('string(@*[name()="xlink:href"])', node)?.toString()}
    >
      {node.textContent}
    </a>
  );
};
