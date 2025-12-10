/**
 * 富文本编辑器默认内容
 * 用于展示所有支持的功能
 */

export const defaultContent = `
<h1 style="text-align: center;">富文本编辑器功能演示</h1>

<p style="text-align: center; color: #666;">这是一个基于 contenteditable 从零实现的富文本编辑器</p>

<hr />

<h2>📝 文本格式</h2>

<p>
  这是<strong>加粗文本</strong>，这是<em>斜体文本</em>，这是<u>下划线文本</u>，这是<s>删除线文本</s>。
</p>

<p>
  你可以组合使用：<strong><em><u>加粗+斜体+下划线</u></em></strong>
</p>

<h2>🎨 颜色和背景</h2>

<p>
  <span style="color: #ff0000;">红色文字</span>，
  <span style="color: #00ff00;">绿色文字</span>，
  <span style="color: #0000ff;">蓝色文字</span>
</p>

<p>
  <span style="background-color: #ffff00;">黄色背景</span>，
  <span style="background-color: #00ffff;">青色背景</span>，
  <span style="background-color: #ff00ff;">紫色背景</span>
</p>

<h2>📏 对齐方式</h2>

<p style="text-align: left;">左对齐文本（默认）</p>

<p style="text-align: center;">居中对齐文本</p>

<p style="text-align: right;">右对齐文本</p>

<h2>📋 列表功能</h2>

<h3>无序列表</h3>
<ul>
  <li>第一项内容</li>
  <li>第二项内容
    <ul>
      <li>嵌套项 1</li>
      <li>嵌套项 2</li>
    </ul>
  </li>
  <li>第三项内容</li>
</ul>

<h3>有序列表</h3>
<ol>
  <li>步骤一：准备工作</li>
  <li>步骤二：开始实施</li>
  <li>步骤三：完成验收</li>
</ol>

<h2>🔗 链接功能</h2>

<p>
  访问 <a href="https://github.com" target="_blank" rel="noopener noreferrer" style="color: #1890ff; text-decoration: underline;">GitHub</a> 了解更多开源项目。
</p>
<p style="color: #999; font-size: 14px;">
  💡 提示：点击链接会弹出确认框，或者按住 Ctrl/Cmd 键并点击可直接打开链接
</p>

<h2>🖼️ 图片功能</h2>

<p>
  <img src="https://picsum.photos/200/200?random=0" alt="示例图片" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<h2>📊 表格功能</h2>

<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
  <thead>
    <tr style="background-color: #f0f0f0;">
      <th style="border: 1px solid #d9d9d9; padding: 8px;">姓名</th>
      <th style="border: 1px solid #d9d9d9; padding: 8px;">职位</th>
      <th style="border: 1px solid #d9d9d9; padding: 8px;">部门</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">张三</td>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">工程师</td>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">技术部</td>
    </tr>
    <tr>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">李四</td>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">设计师</td>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">设计部</td>
    </tr>
    <tr>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">王五</td>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">产品经理</td>
      <td style="border: 1px solid #d9d9d9; padding: 8px;">产品部</td>
    </tr>
  </tbody>
</table>

<h2>💻 代码块</h2>

<pre style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; overflow-x: auto;"><code>function hello() {
  console.log("Hello, World!");
  return true;
}</code></pre>

<h2>💬 引用文本</h2>

<blockquote style="border-left: 4px solid #1890ff; padding-left: 16px; margin: 16px 0; color: #666; font-style: italic;">
  这是一段引用文本。引用通常用于突出显示重要的信息或者引用他人的话语。
</blockquote>

<h2>✨ 特殊功能</h2>

<h3>字体大小</h3>

<p>
  <span style="font-size: 12px;">12px 文字</span>，
  <span style="font-size: 16px;">16px 文字</span>，
  <span style="font-size: 20px;">20px 文字</span>，
  <span style="font-size: 24px;">24px 文字</span>
</p>

<h3>标题层级</h3>

<h1>一级标题 H1</h1>
<h2>二级标题 H2</h2>
<h3>三级标题 H3</h3>
<h4>四级标题 H4</h4>
<h5>五级标题 H5</h5>
<h6>六级标题 H6</h6>

<h2>🎯 编辑器特性</h2>

<ul>
  <li>✅ 支持撤销/重做（Ctrl+Z / Ctrl+Shift+Z）</li>
  <li>✅ 支持快捷键操作（Ctrl+B 加粗、Ctrl+I 斜体、Ctrl+U 下划线）</li>
  <li>✅ 支持查找和替换功能</li>
  <li>✅ 支持源码编辑模式</li>
  <li>✅ 支持全屏编辑</li>
  <li>✅ 支持插件扩展（如字数统计插件）</li>
  <li>✅ 支持粘贴内容清理</li>
  <li>✅ 支持拖拽上传图片</li>
</ul>

<hr />

<p style="text-align: center; color: #999; font-size: 14px;">
  💡 提示：你可以选中文字后使用工具栏进行格式化，也可以使用快捷键快速操作。
</p>
`.trim();

