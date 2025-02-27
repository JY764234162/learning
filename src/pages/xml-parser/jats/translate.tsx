import { Fragment } from "react";
import { SelectedValue, select1 } from "xpath";
import { Alternatives } from "./alternatives";
import { ExtLink } from "./ext-link";
import { Fig } from "./fig";
import { ForEach } from "./for-each";
import { Graphic } from "./graphic";
import {
  attrsWithPrefix,
  getAttrsMap,
  getAttrValue,
  maybeVideoSource,
  notNode,
} from "./helper";
import { InlineGraphic } from "./inline-graphic";
import { Name } from "./name";
import { Paragraph } from "./paragraph";
import { Sec } from "./sec";
import { Sup } from "./sup";
import { TableWrap } from "./table-wrap";
import { TexMath } from "./tex-math";
import { Title } from "./title";
import { Video } from "./video";
import { XRef } from "./xref";

interface Props<N = Node> {
  node: N;
  depth?: number;
  prefix?: string;
  baseUrl?: string;
  lang?: string;
}

export const Translate = (props: Props<SelectedValue | undefined>) => {
  const { node, depth = 0, prefix, baseUrl, lang = "zh" } = props;
  if (notNode(node)) return <>{node}</>;

  const { nodeName, textContent } = node;

  switch (nodeName.toLocaleLowerCase()) {
    // text
    case "#cdata-section":
    case "#comment":
      return null;
    case "#text":
      return <>{textContent}</>;
    case "bold":
      return <b>{textContent}</b>;

    // blocks
    case "abstract":
      return (
        <div {...getAttrsMap(node)} data-role={nodeName}>
          <ForEach node={node}></ForEach>
        </div>
      );
    case "sec":
      return <Sec node={node} depth={depth + 1} />;
    case "p":
      return <Paragraph node={node} depth={depth + 1} />;
    case "fig":
    case "fig-group":
      return <Fig node={node} depth={depth + 1} />;
    case "title": {
      const tagName =
        node.parentNode?.nodeName === "ref-list" ? "dt" : undefined;
      const attrId = select1("string(../@id)", node) as string;
      const id =
        node.parentNode?.nodeName === "ref-list" ? "REFERENCES" : attrId;
      return <Title node={node} depth={depth + 1} tagName={tagName} id={id} />;
    }
    case "alternatives":
      return <Alternatives node={node} select="./*" />;
    case "citation-alternatives":
      return (
        <Translate
          node={select1(
            `./mixed-citation[lang("${lang}")]|mixed-citation[1]`,
            node
          )}
        />
      );
    case "caption":
      return <ForEach node={node} />;
    case "graphic": {
      const href = getAttrValue(getAttrsMap(node), "href");
      if (typeof href === "string" && maybeVideoSource(href)) {
        return <Video src={href} baseUrl={baseUrl} />;
      }
      return <Graphic node={node} zoom={4.6} baseUrl={baseUrl}></Graphic>;
    }
    case "inline-graphic":
      return <InlineGraphic node={node} baseUrl={baseUrl}></InlineGraphic>;
    case "article-title":
    case "journal-title":
      return <h3 data-role="article-title">{textContent}</h3>;
    case "ref-list":
      return (
        <dl
          {...getAttrsMap(node)}
          data-role={nodeName}
          className="reference-list"
        >
          <ForEach node={node} prefix={prefix} />
        </dl>
      );
    case "ref": {
      const attrs = getAttrsMap(node);

      return (
        <dd
          {...attrsWithPrefix(attrs, prefix)}
          data-role={nodeName}
          className="reference"
        >
          {/*<MyLink to={`#cite_${attrs?.id}`} className="back-to-cite-link" title="back to cite link">
            ^
          </MyLink>*/}
          <ForEach node={node} prefix={prefix} />
        </dd>
      );
    }
    case "fn":
      return (
        <div {...getAttrsMap(node)} data-role={nodeName}>
          <ForEach node={node} />
        </div>
      );
    case "table-wrap":
      return <TableWrap node={node}></TableWrap>;
    case "name":
      return <Name node={node} />;

    // inline
    case "sup":
      return <Sup node={node}></Sup>;
    case "italic":
      return <i>{textContent}</i>;
    case "xref":
      return <XRef node={node}></XRef>;
    case "uri":
    case "ext-link":
      return <ExtLink node={node}></ExtLink>;
    // unknown inline tags
    case "source":
    case "year":
    case "volume":
    case "fpage":
    case "lpage":
    case "issue":
    case "collab":
    case "etal":
    case "surname":
    case "comment":
    case "label":
      return (
        <span {...getAttrsMap(node)} data-role={nodeName}>
          <ForEach node={node}></ForEach>
        </span>
      );

    case "object-id":
      return (
        <data value={textContent ?? ""} data-role={nodeName}>
          {textContent}
        </data>
      );

    // custom-element
    case "tex-math":
      return <TexMath node={node}></TexMath>;

    default: {
      const name = node?.lookupNamespaceURI("mml")
        ? (node as Element).localName
        : nodeName;
      const localName = name?.toLowerCase();
      const TagName = localName ? localName : Fragment;
      const attrs = getAttrsMap(node);

      return (
        <TagName {...attrs}>
          {node.hasChildNodes()
            ? Array.from(node.childNodes).map((child, i) => (
                <Translate node={child} key={i}></Translate>
              ))
            : textContent}
        </TagName>
      );
    }
  }
};
