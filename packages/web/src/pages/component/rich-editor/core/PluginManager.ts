/**
 * 插件管理器
 */

import type { RichEditor } from "./Editor";
import type { Plugin } from "../plugins/Plugin";

export class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private editor: RichEditor;

  constructor(editor: RichEditor) {
    this.editor = editor;
  }

  /**
   * 注册插件
   */
  register(plugin: Plugin): void {
    if (this.plugins.has(plugin.name)) {
      console.warn(`Plugin ${plugin.name} is already registered`);
      return;
    }

    plugin.init(this.editor);
    this.plugins.set(plugin.name, plugin);
  }

  /**
   * 卸载插件
   */
  unregister(pluginName: string): void {
    const plugin = this.plugins.get(pluginName);
    if (plugin) {
      plugin.destroy?.();
      this.plugins.delete(pluginName);
    }
  }

  /**
   * 获取插件
   */
  get(pluginName: string): Plugin | undefined {
    return this.plugins.get(pluginName);
  }

  /**
   * 获取所有插件
   */
  getAll(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * 通知插件选择变化
   */
  notifySelectionChange(range: Range | null): void {
    this.plugins.forEach((plugin) => {
      plugin.onSelectionChange?.(range);
    });
  }

  /**
   * 通知插件内容变化
   */
  notifyContentChange(html: string): void {
    this.plugins.forEach((plugin) => {
      plugin.onContentChange?.(html);
    });
  }

  /**
   * 销毁所有插件
   */
  destroy(): void {
    this.plugins.forEach((plugin) => {
      plugin.destroy?.();
    });
    this.plugins.clear();
  }
}

