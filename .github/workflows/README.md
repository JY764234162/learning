# GitHub Pages 部署配置

本项目已配置GitHub Actions自动化部署工作流，每次推送到main/master分支时会自动构建并部署到GitHub Pages。

## 工作流说明

- **触发条件**: 推送到 `main` 或 `master` 分支
- **构建过程**: 
  - 安装依赖: `yarn install --frozen-lockfile`
  - 构建项目: `yarn build` (会执行 `yarn workspace frontend build`)
  - 输出目录: `docs/` (由vite配置指定)
- **部署目标**: GitHub Pages

## 配置要求

1. 确保仓库设置中已启用GitHub Pages
2. 选择部署源为 "GitHub Actions"
3. 前端项目的vite配置已设置构建输出目录为 `../../docs`

## 本地测试

```bash
# 安装依赖
yarn install

# 构建项目
yarn build

# 本地预览构建结果
yarn workspace frontend preview
```

## 注意事项

- 构建产物会直接输出到根目录的 `docs/` 文件夹
- 该文件夹会被GitHub Pages用作静态资源目录
- 确保 `.gitignore` 中没有忽略 `docs/` 文件夹