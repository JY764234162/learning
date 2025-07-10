import xmldom from "xmldom";
import xpath from "xpath";
import { isNode, textContent } from "./helper";

export interface LiteratureMetaType {
  bodyNode: xpath.SelectedValue;
  frontNode: xpath.SelectedValue;
  backNode: xpath.SelectedValue;
  responses: xpath.SelectedValue[];
  title: string;
  journalTitle: xpath.SelectedValue;
}

export const parseXmlMeta = (xmlData: string): LiteratureMetaType => {
  const parser = new xmldom.DOMParser();
  const xmlDoc = parser.parseFromString(xmlData);
  console.log(xmlDoc);
  const bodyNode = xpath.select1("/article/body", xmlDoc) || "";
  const frontNode = xpath.select1("/article/front", xmlDoc) || "";
  const backNode = xpath.select1("/article/back", xmlDoc) || "";
  const responses = (xpath.select("/article//response", xmlDoc) ||
    []) as xpath.SelectedValue[];
  const rootNode = xpath.select1("/article", xmlDoc);
  const isFrontNode = isNode(frontNode);
  const articleTitle = isFrontNode
    ? xpath.select1("./article-meta/title-group/article-title", frontNode)
    : "";
  const transTitleGroup = isFrontNode
    ? xpath.select1("./article-meta/title-group/trans-title-group", frontNode)
    : "";
  const title = textContent(articleTitle);

  const journalTitle = isFrontNode
    ? xpath.select1(
        "./journal-meta/journal-title-group/journal-title",
        frontNode
      )
    : "";
  return {
    bodyNode,
    frontNode,
    backNode,
    responses,
    title,
    journalTitle: journalTitle ?? "",
  };
};
