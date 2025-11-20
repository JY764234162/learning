import React, { FC, useMemo } from "react";
import { Typography, Card, Alert, Space, Input, Select, Tooltip } from "antd";
import AhoCorasick from "./ahoCorasick";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

interface KeywordType {
  label: string;
  value: string;
  color: string;
}

const KEYWORD_TYPES: KeywordType[] = [
  { label: "人名", value: "person", color: "#ffccc7" },
  { label: "地名", value: "location", color: "#d9f7be" },
  { label: "组织", value: "organization", color: "#bae7ff" },
  { label: "时间", value: "time", color: "#fff1b8" },
  { label: "其他", value: "other", color: "#ffd8bf" },
];

interface HighLightProps {
  words: { keyword: string; keywordTag: string; type: string }[];
  text: string;
}

const HighLight: FC<HighLightProps> = ({ words, text }) => {
  const offWords = useMemo(() => {
    const wordsWithMeta = words.map((word) => ({
      ...word,
      meta: { type: word.type },
    }));

    return new AhoCorasick(wordsWithMeta, {
      ignoreCase: false,
      supportTraditionalChinese: false,
      wholeWord: false,
    }).search(text);
  }, [words, text]);

  const render = useMemo(() => {
    return offWords.map((item, index) => {
      if (item.highlight) {
        const type = KEYWORD_TYPES.find((t) => t.value === item.meta?.type) || KEYWORD_TYPES[4];
        return (
          <Tooltip key={index} title={`类型：${type.label}`} mouseEnterDelay={0.5}>
            <span
              style={{
                backgroundColor: type.color,
                padding: "0 2px",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              {text.slice(item.start, item.end)}
            </span>
          </Tooltip>
        );
      } else {
        return text.slice(item.start, item.end);
      }
    });
  }, [offWords, text]);

  return (
    <div
      style={{
        whiteSpace: "pre-wrap",
        padding: "12px",
        border: "1px solid #f0f0f0",
        borderRadius: "4px",
        minHeight: "100px",
      }}
    >
      {render}
    </div>
  );
};

export const Component = () => {
  const [keywords, setKeywords] = React.useState([
    { keyword: "com", keywordTag: "123", type: "other" },
    { keyword: "nature", keywordTag: "456", type: "organization" },
  ]);
  const [text, setText] = React.useState("www.nature.com/scientificreports");
  const [selectedType, setSelectedType] = React.useState<string>(KEYWORD_TYPES[0].value);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Title level={2}>关键词高亮演示</Title>

      <Alert
        type="info"
        message="什么是关键词高亮？"
        description="关键词高亮是一种文本处理技术，可以在文本中快速识别并突出显示指定的关键词。本示例使用 Aho-Corasick 算法实现高效的多关键词匹配。"
        showIcon
        style={{ marginBottom: "20px" }}
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="演示效果">
          <Space direction="vertical" style={{ width: "100%" }}>
            <div>
              <Text strong>添加关键词：</Text>
              <Space.Compact style={{ width: "100%" }}>
                <Select value={selectedType} onChange={setSelectedType} style={{ width: 120 }} options={KEYWORD_TYPES} />
                <Search
                  placeholder="请输入关键词"
                  allowClear
                  enterButton="添加"
                  onSearch={(value) => {
                    if (value) {
                      setKeywords([
                        ...keywords,
                        {
                          keyword: value,
                          keywordTag: String(Date.now()),
                          type: selectedType,
                        },
                      ]);
                    }
                  }}
                />
              </Space.Compact>
            </div>

            <div>
              <Text strong>当前关键词：</Text>
              <div style={{ marginBottom: 16 }}>
                {keywords.map((item, index) => {
                  const type = KEYWORD_TYPES.find((t) => t.value === item.type) || KEYWORD_TYPES[4];
                  return (
                    <span
                      key={item.keywordTag}
                      style={{
                        backgroundColor: type.color,
                        padding: "4px 8px",
                        margin: "0 8px 8px 0",
                        borderRadius: "4px",
                        display: "inline-block",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const newKeywords = [...keywords];
                        newKeywords.splice(index, 1);
                        setKeywords(newKeywords);
                      }}
                    >
                      [{type.label}] {item.keyword} ×
                    </span>
                  );
                })}
              </div>
            </div>

            <div>
              <Text strong>输入文本：</Text>
              <Input.TextArea rows={4} value={text} onChange={(e) => setText(e.target.value)} placeholder="请输入要处理的文本" />
            </div>

            <div>
              <Text strong>高亮结果：</Text>
              <Card>
                <HighLight words={keywords} text={text} />
              </Card>
            </div>
          </Space>
        </Card>

        <Card title="使用说明">
          <Paragraph>
            <Text strong>功能特点：</Text>
          </Paragraph>
          <ul>
            <li>支持多关键词同时高亮</li>
            <li>支持不同类型的关键词（人名、地名、组织等）</li>
            <li>使用不同颜色区分关键词类型</li>
            <li>使用高效的 Aho-Corasick 算法</li>
            <li>支持关键词的动态添加和删除</li>
            <li>实时预览高亮效果</li>
          </ul>

          <Paragraph>
            <Text strong>使用方法：</Text>
          </Paragraph>
          <ol>
            <li>选择关键词类型</li>
            <li>在输入框中添加需要高亮的关键词</li>
            <li>点击关键词可以删除不需要的关键词</li>
            <li>在文本框中输入要处理的文本</li>
            <li>查看下方实时的高亮效果</li>
          </ol>
        </Card>
      </Space>
    </div>
  );
};
