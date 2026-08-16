# Badstu Personal Homepage

基于 HugoBlox 构建的中英文个人主页与博客，部署在 GitHub Pages。

## 网站结构

- `/`：默认中文首页。
- `/en/`：英文首页。
- `/blog/`：中文博客，支持搜索、年月筛选、分类筛选和排序。
- `/en/blog/`：英文博客浏览界面，文章保持中文原文。

## 在线写博客

1. 打开 Pages CMS：`https://app.pagescms.org`。
2. 使用 GitHub 登录并选择 `Badstu/Badstu.github.io`。
3. 在“博客文章”中创建或编辑内容。
4. 设置标题、日期、摘要、封面、分类、标签和正文。
5. 关闭“草稿”后保存，GitHub Actions 会自动发布。

## 修改主页

- `content/zh/_index.md`：中文首页内容。
- `content/en/_index.md`：英文首页内容。
- `assets/media/authors/me.png`：首页头像。
- `assets/media/logo.svg`：导航栏 Logo。
- `config/_default/languages.yaml`：中英文导航菜单。
- `config/_default/params.yaml`：主题、导航和页脚设置。

修改中文首页时，请同步更新英文首页中的对应字段。

## 本地预览

```bash
pnpm install
hugo server
```

访问 `http://localhost:1313/`。

## 构建

```bash
pnpm run build
```

推送到 `master` 分支后，GitHub Actions 会自动构建并发布网站。
