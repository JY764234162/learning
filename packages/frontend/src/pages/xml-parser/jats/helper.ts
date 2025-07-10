import camelCase from "lodash/camelCase";
import xmldom from "xmldom";
import xpath, { SelectedValue } from "xpath";

export enum NodeType {
  // An Element node like <p> or <div>.
  ELEMENT_NODE = 1,

  // An Attribute of an Element.
  ATTRIBUTE_NODE = 2,

  // The actual Text inside an Element or Attr.
  TEXT_NODE = 3,

  // A CDATASection, such as <!CDATA[[ … ]]>
  CDATA_SECTION_NODE = 4,

  // A ProcessingInstruction of an XML document, such as <?xml-stylesheet … ?>.
  PROCESSING_INSTRUCTION_NODE = 7,

  // A Comment node, such as <!-- … -->.
  COMMENT_NODE = 8,

  // A Document node.
  DOCUMENT_NODE = 9,

  // A DocumentType node, such as <!DOCTYPE html>.
  DOCUMENT_TYPE_NODE = 10,

  // A DocumentFragment node.
  DOCUMENT_FRAGMENT_NODE = 11,
}

export const imageStateAttrs = (node: Node) => {
  const pi = xpath.select1(
    './processing-instruction()[name()="fx-imagestate"]',
    node
  ) as ProcessingInstruction;
  if (!pi) return;
  const parser = new xmldom.DOMParser();
  const piDom = parser.parseFromString(`<i ${pi.data}></i>`);
  const piElement = xpath.select1("./i", piDom) as Element;
  return piElement.attributes;
};

const nameMap: Record<string, string> = {
  rowspan: "rowSpan",
  colspan: "colSpan",
};

export const hasOwn = <T extends object>(obj: T, key: PropertyKey) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const getAttrsMap = (node: Node) => {
  const attrsMap = {} as Record<
    string,
    string | null | Record<string, string | null>
  >;
  if (!hasOwn(node, "attributes")) return attrsMap;

  const attrs = (node as Element).attributes;
  for (let i = 0; i < attrs.length; ++i) {
    const attr = attrs.item(i);
    if (!attr) return;
    const { localName, nodeValue } = attr;
    const attrName = nameMap[localName] ?? localName.toLowerCase();
    attrsMap[attrName] =
      attrName === "style" ? parseParameters(nodeValue) : nodeValue;
  }
  return attrsMap;
};

export const parseParameters = (
  value: string | null,
  splitter = ";",
  eq = ":"
) => {
  const valueList = (value || "").split(splitter);
  return valueList.reduce(
    (acc, value) => {
      if (!value) return acc;
      const [name, data] = value.split(eq).map((s) => s.trim());
      // 不支持数组、对象
      acc[camelCase(name)] = data;
      return acc;
    },
    {} as Record<string, string>
  );
};

export const parseAttrNumber = (attr: Attr | null | undefined) =>
  parseFloat(attr?.nodeValue?.toString() ?? "");

export type NotNode = Exclude<SelectedValue, Node> | undefined;
export const notNode = (value: SelectedValue | undefined): value is NotNode => {
  return (
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
};

export const isNode = (value: SelectedValue | undefined): value is Node => {
  return (
    !!value &&
    typeof value === "object" &&
    "nodeType" in value &&
    "nodeName" in value
  );
};

export const attr = (node: SelectedValue | undefined, attrName: string) => {
  if (notNode(node)) return undefined;

  if (node.nodeType === node.ATTRIBUTE_NODE) {
    const { nodeName, nodeValue } = node as Attr;
    return nodeName === attrName ? (nodeValue ?? undefined) : undefined;
  } else if (node.nodeType === node.ELEMENT_NODE) {
    return (node as Element).getAttribute(attrName) ?? undefined;
  }
  return undefined;
};

export const textContent = (node: SelectedValue | undefined) => {
  if (isNode(node)) {
    return node.textContent ?? "";
  }
  return "";
};

export const getAttrValue = (
  attrsMap: ReturnType<typeof getAttrsMap>,
  key: string
) => attrsMap?.[key] ?? "";

export const getLangFromAttrs = (item: Node) => {
  return getAttrValue(getAttrsMap(item), "lang");
};

export const attrsWithPrefix = (
  attrs:
    | Record<string, string | null | Record<string, string | null>>
    | undefined,
  prefix: string | undefined
) => {
  if (!attrs || !attrs.id) return attrs;
  const id = attrs.id;
  return { ...attrs, id: prefix ? prefix + id : id };
};

export const pathJoin = (a: string | undefined, b: string) => {
  if (!a) return b;
  if (!b) return a;
  return [a.replace(/\/$/, ""), b.replace(/^\//, "")].filter(Boolean).join("/");
};

export const getNode = (node: SelectedValue, path: string) => {
  if (isNode(node)) {
    return xpath.select1(path, node);
  }
};

export const getNodeList = (node: SelectedValue, path: string) => {
  if (isNode(node)) {
    return xpath.select(path, node) as Array<Node>;
  }
};

const videoExtensions = ["mp4", "webm", "ogg", "avi"];
export const maybeVideoSource = (src: string) => {
  const ext = src.split(".").pop()?.toLowerCase();
  return ext && videoExtensions.includes(ext);
};
