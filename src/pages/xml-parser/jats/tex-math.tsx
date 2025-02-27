import { FC, useEffect, useRef } from "react";
import xpath from "xpath";
import { getAttrsMap } from "./helper";
import { Props } from "./interface";
import { parse, HtmlGenerator } from "latex.js";

const generator = new HtmlGenerator({ hyphenate: false });
const replaceDocumentClass = (text: string) =>
  text.replace(/(documentclass\[.+?\]){(minimal)}/, "$1{article}");

export const TexMath: FC<Props> = (props) => {
  const { node } = props;
  const ref = useRef<HTMLDivElement>(null);
  const text = xpath.select1("./text()", node) as Node;
  const latex =
    text.CDATA_SECTION_NODE === 4 ? (text as CDATASection)?.data : "";
  const attrs = getAttrsMap(node);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    generator.reset();
    const doc = parse(replaceDocumentClass(latex), {
      generator: generator,
    }).htmlDocument();
    node.replaceWith(doc.querySelector<HTMLElement>(".katex") ?? "");
  }, [ref]);

  if (latex)
    return (
      <div ref={ref} {...attrs}>
        {latex}
      </div>
    );

  return null;
};
