import uniqBy from "lodash/uniqBy";
import * as OpenCC from "opencc-js";

interface Chunk {
  start: number;
  end: number;
  highlight: boolean;
  keywordTag?: string;
  meta?: any;
}

interface Keyword {
  keyword: string;
  keywordTag?: string;
  meta?: any;
}

class TrieNode {
  children: Map<string, TrieNode>;
  fail: TrieNode | null;
  output: Keyword[];

  constructor() {
    this.children = new Map();
    this.fail = null;
    this.output = [];
  }
}

/**
 * 创建一个新的 AhoCorasick 实例
 *
 * @param keywords - 要匹配的关键词数组，每个元素包含 keyword 和可选的 tag、meta 信息
 * @param options - 配置选项
 * @param options.ignoreCase - 是否忽略大小写，默认为 false
 * @param options.supportTraditionalChinese - 是否支持繁体中文匹配，默认为 false
 * @param options.wholeWord - 是否只匹配完整单词，默认为 false
 *
 * @example
 * ```typescript
 * const ac = new AhoCorasick(
 *   [{ keyword: "test", tag: "tag1" }],
 *   { ignoreCase: true }
 * );
 * ```
 */

/**
 * 在文本中搜索所有匹配的关键词
 * 返回包含匹配位置和相关信息的块数组
 *
 * @param text - 要搜索的文本内容
 * @returns 匹配结果数组，每个元素包含：
 * - start: 匹配开始位置
 * - end: 匹配结束位置
 * - highlight: 是否高亮显示
 * - keywordTag: 关键词标签（如果有）
 * - meta: 附加信息（如果有）
 *
 * @example
 * ```typescript
 * const ac = new AhoCorasick([{ keyword: "test", tag: "tag1" }]);
 * const results = ac.search("this is a test");
 *  results = [
 *    { start: 0, end: 10, highlight: false },
 *    { start: 10, end: 14, highlight: true, keywordTag: "tag1" },
 *  ]
 * ```
 */
class AhoCorasick {
  // 根节点和配置选项
  private root: TrieNode;
  private ignoreCase: boolean;
  private supportTraditionalChinese: boolean;
  private wholeWord: boolean;

  constructor(
    keywords: Keyword[],
    options: {
      ignoreCase?: boolean;
      supportTraditionalChinese?: boolean;
      wholeWord?: boolean;
    }
  ) {
    const {
      ignoreCase = false,
      supportTraditionalChinese = false,
      wholeWord = false,
    } = options;

    this.root = new TrieNode();
    this.ignoreCase = ignoreCase;
    this.supportTraditionalChinese = supportTraditionalChinese;
    this.wholeWord = wholeWord;

    let keywordsToBuild: Keyword[] = keywords.filter((item) =>
      Boolean(item.keyword)
    );
    if (ignoreCase) {
      keywordsToBuild = keywordsToBuild.map((item) => ({
        ...item,
        keyword: item.keyword.toLowerCase(),
      }));
    }
    if (supportTraditionalChinese) {
      keywordsToBuild = keywordsToBuild.map((item) => ({
        ...item,
        keyword: OpenCC.Converter({ to: "cn", from: "hk" })(item.keyword),
      }));
    }
    this.buildTrie(uniqBy(keywordsToBuild, "keyword"));
    this.buildFailureLinks();
  }

  private buildTrie(keywords: Keyword[]) {
    for (const item of keywords) {
      let node = this.root;
      for (const char of item.keyword) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char)!;
      }
      node.output.push({ ...item, keyword: item.keyword });
    }
  }

  private buildFailureLinks() {
    const queue: TrieNode[] = [];
    for (const node of this.root.children.values()) {
      node.fail = this.root;
      queue.push(node);
    }

    while (queue.length > 0) {
      const node = queue.shift()!;
      for (const [char, childNode] of node.children) {
        let failNode = node.fail;
        while (failNode && !failNode.children.has(char)) {
          failNode = failNode.fail;
        }
        childNode.fail = failNode ? failNode.children.get(char)! : this.root;
        if (childNode.fail) {
          childNode.output = childNode.output.concat(childNode.fail.output);
        }
        queue.push(childNode);
      }
    }
  }

  /**
   * 判断给定字符是否为单词字符
   *
   * @param char 要判断的字符
   * @returns 如果给定字符是单词字符则返回 true，否则返回 false
   */
  private isWordChar(char: string): boolean {
    return /[\w\u4e00-\u9fa5]/.test(char);
  }

  /**
   * 判断给定文本范围内的字符串是否具有单词边界。
   *
   * @param text 要检查的字符串。
   * @param start 检查范围的起始索引。
   * @param end 检查范围的结束索引。
   * @returns 如果具有单词边界，则返回 true；否则返回 false。
   */
  private hasWordBoundary(text: string, start: number, end: number): boolean {
    const hasLeftBoundary =
      start === 0 || !this.isWordChar(text.charAt(start - 1));
    const hasRightBoundary =
      end === text.length || !this.isWordChar(text.charAt(end));
    return hasLeftBoundary && hasRightBoundary;
  }

  private combineChunks = (chunks: Chunk[]): Chunk[] => {
    chunks = chunks
      .sort((first, second) => first.start - second.start)
      .reduce((processedChunks: Chunk[], nextChunk) => {
        if (processedChunks.length === 0) {
          return [nextChunk];
        } else {
          const prevChunk = processedChunks.pop() as Chunk;
          if (nextChunk.start < prevChunk.end) {
            const endChunk =
              prevChunk.end - prevChunk.start > nextChunk.end - nextChunk.start
                ? prevChunk
                : nextChunk;

            processedChunks.push({
              start: prevChunk.start,
              end: endChunk.end,
              highlight: true,
              keywordTag: endChunk.keywordTag,
              meta: endChunk.meta,
            });
          } else {
            processedChunks.push(prevChunk, nextChunk);
          }
          return processedChunks;
        }
      }, []);
    return chunks;
  };

  private allChunks = (chunks: Chunk[], text: string): Chunk[] => {
    let start = 0;
    const result: Chunk[] = [];
    chunks.forEach((item) => {
      if (item.start > start) {
        result.push({
          start: start,
          end: item.start,
          highlight: false,
        }); // 添加非匹配的文本
        result.push(item); // 添加匹配的文本
      } else {
        result.push(item); // 添加匹配的文本
      }
      start = item.end; // 更新起始位置
    });
    if (start < text.length) {
      result.push({
        start: start,
        end: text.length,
        highlight: false,
      }); // 添加剩余的非匹配文本
    }

    return result;
  };

  public search(text: string): Chunk[] {
    const results: Chunk[] = [];
    let node = this.root;

    let processedText = text || "";

    if (this.ignoreCase) processedText = processedText.toLowerCase();
    if (this.supportTraditionalChinese) {
      processedText = OpenCC.Converter({ to: "cn", from: "hk" })(processedText);
    }

    for (let i = 0; i < processedText.length; i++) {
      const char = processedText[i];
      while (node && !node.children.has(char)) {
        node = node.fail!;
      }
      if (node) {
        node = node.children.get(char)!;
        for (const item of node.output) {
          const start = i - item.keyword.length + 1;
          const end = i + 1;

          // 如果启用了整词匹配，检查词边界
          if (
            this.wholeWord &&
            !this.hasWordBoundary(processedText, start, end)
          ) {
            continue;
          }

          results.push({
            ...item,
            start,
            end,
            highlight: true,
          });
        }
      } else {
        node = this.root;
      }
    }
    return this.allChunks(this.combineChunks(results), processedText);
  }
}

export default AhoCorasick;
