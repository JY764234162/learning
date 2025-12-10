/**
 * 命令模式基类
 * 所有编辑器操作都通过命令实现，支持撤销/重做
 */

export interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
  canExecute(): boolean;
}

/**
 * 基础命令类
 */
export abstract class BaseCommand implements Command {
  protected executed: boolean = false;
  protected savedRange: any = null;

  abstract execute(): void;
  abstract undo(): void;
  abstract redo(): void;

  canExecute(): boolean {
    return true;
  }

  /**
   * 保存当前选择状态
   */
  protected saveState(): void {
    // 子类可以重写此方法保存特定状态
  }

  /**
   * 恢复保存的状态
   */
  protected restoreState(): void {
    // 子类可以重写此方法恢复特定状态
  }
}

/**
 * 格式化命令类
 */
export class FormatCommand extends BaseCommand {
  constructor(
    protected format: string,
    protected value?: any
  ) {
    super();
  }

  execute(): void {
    if (!this.canExecute()) {
      return;
    }

    this.saveState();
    
    // 使用 execCommand 执行格式化
    // 直接使用 document.execCommand，避免循环依赖
    try {
      document.execCommand(this.format, false, this.value);
    } catch (error) {
      console.warn(`Failed to execute command: ${this.format}`, error);
    }
    
    this.executed = true;
  }

  undo(): void {
    if (!this.executed) {
      return;
    }

    // 对于格式化命令，撤销就是再次执行相同的命令（切换状态）
    try {
      document.execCommand(this.format, false, this.value);
    } catch (error) {
      console.warn(`Failed to undo command: ${this.format}`, error);
    }
    
    this.restoreState();
  }

  redo(): void {
    this.execute();
  }
}

