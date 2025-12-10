import React, { useState } from "react";
import { Typography, Card, Alert, Space, Button, Input } from "antd";
import { parseXmlMeta, Translate } from "@/pages/data/xml-parser/jats";
import { DOMParser } from "xmldom";
import xpath from "xpath";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
<article>
  <front>
    <article-meta>
      <title-group>
        <article-title>示例文章标题</article-title>
      </title-group>
    </article-meta>
  </front>
  <body>
    <sec id="intro">
      <title>引言</title>
      <p>这是一个段落，包含<bold>加粗</bold>和<italic>斜体</italic>文本。</p>
      <p>这是另一个包含<xref ref-type="bibr" rid="ref1">引用</xref>的段落。</p>
    </sec>
    <sec id="methods">
      <title>方法</title>
      <p>实验方法描述...</p>
    </sec>
  </body>
  <back>
    <ref-list>
      <title>参考文献</title>
      <ref id="ref1">
        <label>1</label>
        <mixed-citation>示例参考文献</mixed-citation>
      </ref>
    </ref-list>
  </back>
</article>`;

export const Component = () => {
  const [xmlContent, setXmlContent] = useState(defaultXml);
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const handleParse = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent);
      const articleNode = xpath.select1("/article", xmlDoc);

      if (articleNode) {
        setParsedContent(articleNode);
        setError("");
      } else {
        setError("无法找到根节点 <article>");
      }
    } catch (err) {
      setError(`解析错误: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>XML/JATS 解析演示</Title>

      <Alert
        type="info"
        message="什么是 JATS XML？"
        description="JATS (Journal Article Tag Suite) 是一套用于描述科技文献、期刊文章等的 XML 标准。它提供了一种结构化的方式来标记文章的内容，包括标题、作者、摘要、正文、引用等。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="XML 输入">
          <Space direction="vertical" style={{ width: "100%" }}>
            <TextArea value={xmlContent} onChange={(e) => setXmlContent(e.target.value)} rows={10} style={{ fontFamily: "monospace" }} />
            <Button type="primary" onClick={handleParse}>
              解析 XML
            </Button>
          </Space>
        </Card>

        {error && <Alert type="error" message="解析错误" description={error} showIcon />}

        {parsedContent && (
          <Card title="解析结果">
            <div className="parsed-content">
              <Translate node={parsedContent} />
            </div>
          </Card>
        )}

        <Card title="使用说明">
          <Paragraph>
            <Text strong>支持的 JATS 元素：</Text>
          </Paragraph>
          <ul>
            <li>文章结构 (article, front, body, back)</li>
            <li>章节 (sec, title, p)</li>
            <li>文本样式 (bold, italic)</li>
            <li>引用 (xref, ref-list, ref)</li>
            <li>图表 (fig, table-wrap)</li>
            <li>数学公式 (tex-math)</li>
          </ul>

          <Paragraph>
            <Text strong>注意事项：</Text>
          </Paragraph>
          <ul>
            <li>确保 XML 格式正确</li>
            <li>必须包含根元素 &lt;article&gt;</li>
            <li>标签必须正确闭合</li>
            <li>注意特殊字符的转义</li>
          </ul>
        </Card>
      </Space>
    </div>
  );
};
