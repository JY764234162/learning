/**
 * Selection 和 Range API 封装工具类
 * 提供跨浏览器的选择操作接口
 */

export interface SavedRange {
  startContainer: Node;
  startOffset: number;
  endContainer: Node;
  endOffset: number;
}

export class SelectionHelper {
  /**
   * 获取当前选择对象
   */
  static getSelection(): Selection | null {
    return window.getSelection();
  }

  /**
   * 获取当前范围
   */
  static getRange(): Range | null {
    const selection = this.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    return selection.getRangeAt(0);
  }

  /**
   * 保存当前选择范围
   */
  static saveSelection(): SavedRange | null {
    const range = this.getRange();
    if (!range) {
      return null;
    }

    return {
      startContainer: range.startContainer,
      startOffset: range.startOffset,
      endContainer: range.endContainer,
      endOffset: range.endOffset,
    };
  }

  /**
   * 恢复保存的选择范围
   */
  static restoreSelection(saved: SavedRange): void {
    const selection = this.getSelection();
    if (!selection) {
      return;
    }

    try {
      const range = document.createRange();
      range.setStart(saved.startContainer, saved.startOffset);
      range.setEnd(saved.endContainer, saved.endOffset);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      console.warn("Failed to restore selection:", error);
    }
  }

  /**
   * 执行格式化命令（兼容旧版浏览器）
   */
  static execCommand(command: string, value?: any): boolean {
    try {
      return document.execCommand(command, false, value);
    } catch (error) {
      console.warn(`Failed to execute command: ${command}`, error);
      return false;
    }
  }

  /**
   * 检查当前选择是否支持某个格式
   */
  static queryCommandState(command: string): boolean {
    try {
      return document.queryCommandState(command);
    } catch (error) {
      return false;
    }
  }

  /**
   * 获取命令的值
   */
  static queryCommandValue(command: string): string {
    try {
      return document.queryCommandValue(command);
    } catch (error) {
      return "";
    }
  }

  /**
   * 清除选择
   */
  static clearSelection(): void {
    const selection = this.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  }

  /**
   * 检查是否有选择内容
   */
  static hasSelection(): boolean {
    const selection = this.getSelection();
    return selection !== null && selection.toString().length > 0;
  }

  /**
   * 获取选中的文本
   */
  static getSelectedText(): string {
    const selection = this.getSelection();
    return selection ? selection.toString() : "";
  }

  /**
   * 选中指定元素
   */
  static selectElement(element: HTMLElement): void {
    const selection = this.getSelection();
    if (!selection) {
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * 在光标位置插入 HTML
   */
  static insertHTML(html: string): void {
    const selection = this.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }

    range.insertNode(fragment);
    
    // 移动光标到插入内容之后
    range.setStartAfter(fragment.lastChild || fragment);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * 在光标位置插入文本
   */
  static insertText(text: string): void {
    const selection = this.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    
    // 移动光标到文本之后
    range.setStartAfter(range.endContainer);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

