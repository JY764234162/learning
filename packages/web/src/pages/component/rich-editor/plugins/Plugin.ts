/**
 * 插件系统基类
 */

import type { RichEditor } from "../core/Editor";

export interface Plugin {
  name: string;
  version?: string;
  init(editor: RichEditor): void;
  destroy?(): void;
  onSelectionChange?(range: Range | null): void;
  onContentChange?(html: string): void;
}

/**
 * 插件基类
 */
export abstract class BasePlugin implements Plugin {
  abstract name: string;
  version?: string;
  protected editor: RichEditor | null = null;

  abstract init(editor: RichEditor): void;

  destroy?(): void {
    this.editor = null;
  }

  onSelectionChange?(range: Range | null): void;
  onContentChange?(html: string): void;
}

