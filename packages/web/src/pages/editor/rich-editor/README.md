# 富文本编辑器实现方案（基于 contenteditable）

## 一、技术方案

### 核心技术
- **contenteditable**：HTML5 原生属性，使元素可编辑
- **Selection API**：获取和操作文本选择
- **Range API**：操作文档范围
- **document.execCommand**：执行格式化命令（已废弃，但兼容性好）
- **现代 API**：使用 Selection 和 Range API 替代 execCommand

### 为什么选择 contenteditable
1. **完全控制**：不依赖第三方库，完全自主控制
2. **轻量级**：无需加载外部库，体积小
3. **灵活性**：可以完全自定义行为和样式
4. **学习价值**：深入理解浏览器编辑能力

## 二、实现架构

### 核心类设计

```typescript
class RichEditor {
  // 编辑器容器
  private container: HTMLElement;
  
  // 命令历史（撤销/重做）
  private history: CommandHistory;
  
  // 插件系统
  private plugins: Map<string, Plugin>;
  
  // 格式化方法
  formatBold(): void;
  formatItalic(): void;
  formatUnderline(): void;
  // ...
}
```

### 命令系统

使用命令模式实现所有格式化操作：

```typescript
interface Command {
  execute(): void;
  undo(): void;
  redo(): void;
}
```

## 三、功能实现清单

### 1. 文本格式化
- [x] 加粗 (bold)
- [x] 斜体 (italic)
- [x] 下划线 (underline)
- [x] 删除线 (strikethrough)
- [x] 字体大小
- [x] 字体颜色
- [x] 背景色
- [x] 上标/下标

### 2. 段落格式化
- [x] 标题 (H1-H6)
- [x] 对齐方式（左、中、右、两端对齐）
- [x] 有序列表
- [x] 无序列表
- [x] 引用块
- [x] 代码块
- [x] 缩进

### 3. 媒体插入
- [x] 图片插入
- [x] 链接插入/编辑
- [x] 图片大小调整

### 4. 表格功能
- [x] 插入表格
- [x] 添加/删除行列
- [x] 合并/拆分单元格
- [x] 表格样式

### 5. 高级功能
- [x] 撤销/重做
- [x] 查找替换
- [x] 源码编辑
- [x] 全屏编辑
- [x] 导出 HTML

### 6. 插件系统
- [x] 插件注册机制
- [x] 插件生命周期
- [x] 插件 API

## 四、文件结构

```
rich-editor/
├── index.tsx                 # 主组件
├── index.module.less        # 样式文件
├── core/                    # 核心功能
│   ├── Editor.ts            # 编辑器核心类
│   ├── Selection.ts         # Selection API 封装
│   ├── Range.ts             # Range API 封装
│   ├── Command.ts           # 命令基类
│   └── History.ts           # 撤销/重做历史
├── commands/                 # 命令实现
│   ├── FormatCommand.ts     # 格式化命令
│   ├── InsertCommand.ts     # 插入命令
│   └── TableCommand.ts      # 表格命令
├── components/              # React 组件
│   ├── Toolbar.tsx          # 工具栏
│   ├── SourceEditor.tsx     # 源码编辑器
│   └── ImageResizer.tsx     # 图片调整器
├── plugins/                 # 插件系统
│   ├── Plugin.ts            # 插件基类
│   ├── CodeHighlight.ts     # 代码高亮插件
│   └── MathFormula.ts       # 数学公式插件
└── utils/                   # 工具函数
    ├── dom.ts               # DOM 操作
    ├── html.ts              # HTML 处理
    └── export.ts            # 导出功能
```

## 五、实现细节

### 1. Selection 和 Range 封装

```typescript
class SelectionHelper {
  static getSelection(): Selection | null;
  static getRange(): Range | null;
  static saveSelection(): SavedRange;
  static restoreSelection(saved: SavedRange): void;
  static execCommand(command: string, value?: any): boolean;
}
```

### 2. 命令实现

```typescript
class FormatCommand implements Command {
  constructor(
    private editor: RichEditor,
    private format: string,
    private value?: any
  ) {}
  
  execute(): void {
    // 执行格式化
  }
  
  undo(): void {
    // 撤销操作
  }
}
```

### 3. 撤销/重做系统

```typescript
class CommandHistory {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];
  
  execute(command: Command): void;
  undo(): void;
  redo(): void;
  canUndo(): boolean;
  canRedo(): boolean;
}
```

### 4. 插件系统

```typescript
interface Plugin {
  name: string;
  init(editor: RichEditor): void;
  destroy?(): void;
  onSelectionChange?(range: Range): void;
  onContentChange?(): void;
}
```

## 六、浏览器兼容性

- **现代浏览器**：使用 Selection 和 Range API
- **旧版浏览器**：降级使用 document.execCommand
- **兼容性处理**：提供 polyfill 或降级方案

## 七、性能优化

1. **防抖处理**：内容变化事件防抖
2. **虚拟滚动**：大文档时使用虚拟滚动
3. **懒加载**：插件按需加载
4. **事件委托**：使用事件委托减少监听器

## 八、安全考虑

1. **XSS 防护**：输出时转义 HTML
2. **内容过滤**：过滤危险标签和属性
3. **输入验证**：验证用户输入
