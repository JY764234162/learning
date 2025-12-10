/**
 * 命令历史管理器
 * 实现撤销/重做功能
 * 基于内容快照，支持所有类型的编辑操作
 */

import { Command } from "./Command";

interface HistorySnapshot {
  content: string;
  timestamp: number;
}

export class CommandHistory {
  private undoStack: HistorySnapshot[] = [];
  private redoStack: HistorySnapshot[] = [];
  private maxSize: number = 100;
  private container: HTMLElement | null = null;
  private isRestoring: boolean = false;

  constructor(maxSize: number = 100, container?: HTMLElement) {
    this.maxSize = maxSize;
    if (container) {
      this.container = container;
    }
  }

  /**
   * 设置容器
   */
  setContainer(container: HTMLElement): void {
    this.container = container;
  }

  /**
   * 记录当前状态
   */
  record(content: string): void {
    // 如果正在恢复状态，不记录
    if (this.isRestoring) {
      return;
    }

    // 如果内容与上一个快照相同，不记录
    if (this.undoStack.length > 0) {
      const lastSnapshot = this.undoStack[this.undoStack.length - 1];
      if (lastSnapshot.content === content) {
        return;
      }
    }

    const snapshot: HistorySnapshot = {
      content,
      timestamp: Date.now(),
    };

    this.undoStack.push(snapshot);

    // 限制历史记录大小
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }

    // 记录新状态时清空重做栈
    this.redoStack = [];
  }

  /**
   * 执行命令并添加到历史（兼容旧的命令模式）
   */
  execute(command: Command): void {
    if (!command.canExecute()) {
      return;
    }

    // 记录执行前的状态
    if (this.container) {
      this.record(this.container.innerHTML);
    }

    command.execute();

    // 记录执行后的状态
    if (this.container) {
      // 使用 setTimeout 确保 DOM 更新完成
      setTimeout(() => {
        if (this.container) {
          this.record(this.container.innerHTML);
        }
      }, 0);
    }
  }

  /**
   * 撤销
   */
  undo(): boolean {
    if (!this.container || this.undoStack.length === 0) {
      return false;
    }

    const currentContent = this.container.innerHTML;
    
    // 如果当前内容和栈顶相同，说明当前状态已经在栈中
    // 需要弹出当前状态，恢复到上一个状态
    if (this.undoStack.length > 0) {
      const topSnapshot = this.undoStack[this.undoStack.length - 1];
      if (topSnapshot.content === currentContent) {
        // 弹出当前状态
        const currentSnapshot = this.undoStack.pop()!;
        this.redoStack.push(currentSnapshot);
        
        // 如果还有上一个状态，恢复它
        if (this.undoStack.length > 0) {
          const prevSnapshot = this.undoStack[this.undoStack.length - 1];
          this.restoreSnapshot(prevSnapshot);
          return true;
        } else {
          // 没有更早的状态了，恢复当前状态
          this.undoStack.push(currentSnapshot);
          this.redoStack.pop();
          return false;
        }
      } else {
        // 当前内容不在栈中（可能刚修改还未保存）
        // 直接恢复到栈顶状态
        const targetSnapshot = this.undoStack[this.undoStack.length - 1];
        
        // 保存当前内容到 redo 栈
        this.redoStack.push({
          content: currentContent,
          timestamp: Date.now(),
        });
        
        this.restoreSnapshot(targetSnapshot);
        return true;
      }
    }

    return false;
  }

  /**
   * 重做
   */
  redo(): boolean {
    if (!this.container || this.redoStack.length === 0) {
      return false;
    }

    const snapshot = this.redoStack.pop()!;
    
    // 保存当前状态到 undo 栈
    this.undoStack.push({
      content: this.container.innerHTML,
      timestamp: Date.now(),
    });

    this.restoreSnapshot(snapshot);

    return true;
  }

  /**
   * 恢复快照
   */
  private restoreSnapshot(snapshot: HistorySnapshot): void {
    if (!this.container) {
      return;
    }

    this.isRestoring = true;
    
    // 保存当前光标位置
    const selection = window.getSelection();
    const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const cursorOffset = range ? this.getCursorOffset(range) : 0;

    // 恢复内容
    this.container.innerHTML = snapshot.content;
    
    // 尝试恢复光标位置
    setTimeout(() => {
      if (this.container) {
        this.restoreCursor(cursorOffset);
      }
      this.isRestoring = false;
    }, 0);
  }

  /**
   * 获取光标偏移量
   */
  private getCursorOffset(range: Range): number {
    if (!this.container) {
      return 0;
    }

    const preRange = document.createRange();
    preRange.selectNodeContents(this.container);
    preRange.setEnd(range.endContainer, range.endOffset);
    return preRange.toString().length;
  }

  /**
   * 恢复光标位置
   */
  private restoreCursor(offset: number): void {
    if (!this.container) {
      return;
    }

    try {
      const selection = window.getSelection();
      const range = document.createRange();
      
      let currentOffset = 0;
      let found = false;

      const walkNodes = (node: Node): boolean => {
        if (node.nodeType === Node.TEXT_NODE) {
          const textLength = node.textContent?.length || 0;
          if (currentOffset + textLength >= offset) {
            range.setStart(node, Math.min(offset - currentOffset, textLength));
            range.collapse(true);
            found = true;
            return true;
          }
          currentOffset += textLength;
        } else {
          for (let i = 0; i < node.childNodes.length; i++) {
            if (walkNodes(node.childNodes[i])) {
              return true;
            }
          }
        }
        return false;
      };

      walkNodes(this.container);

      if (found && selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // 如果无法恢复到精确位置，移到末尾
        this.moveCursorToEnd();
      }
    } catch (error) {
      // 出错时移到末尾
      this.moveCursorToEnd();
    }
  }

  /**
   * 将光标移动到末尾
   */
  private moveCursorToEnd(): void {
    if (!this.container) {
      return;
    }

    try {
      const range = document.createRange();
      const selection = window.getSelection();
      
      range.selectNodeContents(this.container);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    } catch (error) {
      console.warn("Failed to move cursor:", error);
    }
  }

  /**
   * 是否可以撤销
   */
  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  /**
   * 是否可以重做
   */
  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  /**
   * 清空历史
   */
  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * 获取历史记录数量
   */
  getUndoCount(): number {
    return this.undoStack.length;
  }

  /**
   * 获取重做记录数量
   */
  getRedoCount(): number {
    return this.redoStack.length;
  }
}

