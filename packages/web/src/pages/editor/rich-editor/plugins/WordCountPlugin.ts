/**
 * 字数统计插件示例
 * 展示如何使用插件系统扩展编辑器功能
 */

import { BasePlugin } from "./Plugin";
import type { RichEditor } from "../core/Editor";

export class WordCountPlugin extends BasePlugin {
  name = "wordCount";
  version = "1.0.0";
  private wordCountElement: HTMLElement | null = null;
  private container: HTMLElement | null = null;

  init(editor: RichEditor): void {
    this.editor = editor;
    // 如果没有设置容器，使用编辑器容器的父元素
    if (!this.container) {
      const editorContainer = (editor as any).container;
      if (editorContainer) {
        this.container = editorContainer.parentElement;
      }
    }
    this.createWordCountDisplay();
    this.updateWordCount();
  }

  /**
   * 设置容器（由外部调用）
   */
  setContainer(container: HTMLElement): void {
    this.container = container;
  }

  private createWordCountDisplay(): void {
    // 创建字数统计显示元素
    this.wordCountElement = document.createElement("div");
    this.wordCountElement.className = "word-count-plugin";
    this.wordCountElement.setAttribute("contenteditable", "false"); // 防止可编辑
    this.wordCountElement.style.cssText = `
      position: absolute;
      bottom: 8px;
      right: 8px;
      padding: 4px 8px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      pointer-events: none;
      user-select: none;
    `;

    // 添加到指定的容器（Card body），而不是编辑器内部
    if (this.container) {
      // 确保容器有相对定位
      const containerStyle = window.getComputedStyle(this.container);
      if (containerStyle.position === "static") {
        this.container.style.position = "relative";
      }
      this.container.appendChild(this.wordCountElement);
    } else {
      // 如果没有容器，尝试使用编辑器容器的父元素
      const editorContainer = (this.editor as any).container;
      if (editorContainer) {
        const parent = editorContainer.parentElement;
        if (parent) {
          const parentStyle = window.getComputedStyle(parent);
          if (parentStyle.position === "static") {
            parent.style.position = "relative";
          }
          parent.appendChild(this.wordCountElement);
        }
      }
    }
  }

  private updateWordCount(): void {
    if (!this.editor || !this.wordCountElement) {
      return;
    }

    const text = this.editor.getText();
    const wordCount = text.trim().length;
    const charCount = text.length;

    this.wordCountElement.textContent = `字数: ${wordCount} | 字符: ${charCount}`;
  }

  onContentChange = (html: string): void => {
    this.updateWordCount();
  };

  destroy(): void {
    if (this.wordCountElement) {
      this.wordCountElement.remove();
      this.wordCountElement = null;
    }
    super.destroy?.();
  }
}
