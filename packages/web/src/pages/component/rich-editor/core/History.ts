/**
 * 命令历史管理器
 * 实现撤销/重做功能
 */

import { Command } from "./Command";

export class CommandHistory {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  private maxSize: number = 50;

  constructor(maxSize: number = 50) {
    this.maxSize = maxSize;
  }

  /**
   * 执行命令并添加到历史
   */
  execute(command: Command): void {
    if (!command.canExecute()) {
      return;
    }

    command.execute();
    this.undoStack.push(command);

    // 限制历史记录大小
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }

    // 执行新命令时清空重做栈
    this.redoStack = [];
  }

  /**
   * 撤销
   */
  undo(): boolean {
    if (this.undoStack.length === 0) {
      return false;
    }

    const command = this.undoStack.pop()!;
    command.undo();
    this.redoStack.push(command);

    return true;
  }

  /**
   * 重做
   */
  redo(): boolean {
    if (this.redoStack.length === 0) {
      return false;
    }

    const command = this.redoStack.pop()!;
    command.redo();
    this.undoStack.push(command);

    return true;
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

