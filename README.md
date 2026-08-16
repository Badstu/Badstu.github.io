# Sean Personal Homepage

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

1. 打开 Pages CMS：`https://app.pagescms.org`，使用 GitHub 登录并选择 `Badstu/Badstu.github.io`。
2. 在左侧打开“个人主页”。
3. 选择“中文个人简历”或“English CV”。
4. 修改个人资料、研究兴趣、教育经历、研究经历、代表成果、技能、荣誉和最近文章板块文案。
5. 保存后，Pages CMS 会提交到 GitHub，GitHub Actions 会自动重新发布网站。

中文和英文简历分别存储在以下文件中，也可以直接编辑：

- `content/zh/_index.md`：中文个人主页与简历。
- `content/en/_index.md`：英文个人主页与简历。
- `assets/media/logo.svg`：导航栏 Logo。
- `config/_default/languages.yaml`：中英文导航菜单。
- `config/_default/params.yaml`：主题、导航和页脚设置。

修改中文首页时，请同步更新英文首页中的对应字段。

## 启用博客评论

文章页已经接入 Giscus，评论会保存到当前仓库的 GitHub Discussions，不需要额外服务器，并支持针对单条评论进行嵌套回复。

1. 打开仓库的 `Settings > General > Features`，启用 `Discussions`。
2. 进入仓库的 `Discussions` 页面并完成首次设置。
3. 安装 Giscus GitHub App：`https://github.com/apps/giscus`，并只授权 `Badstu/Badstu.github.io`。
4. 打开 Giscus 配置页：`https://giscus.app/zh-CN`，输入仓库名并选择 `Announcements` 分类。
5. 从生成的脚本中复制 `data-category-id`，填入 `config/_default/params.yaml` 的 `hugoblox.comments.category_id`。
6. 本地预览确认评论区正常显示后提交并部署。

评论配置位于 `config/_default/params.yaml` 的 `hugoblox.comments`。在 `category_id` 留空时，生产环境不会加载未配置完成的评论组件；本地开发环境会显示配置提示。Giscus 使用 GitHub Discussions 的回复结构，站长可直接在文章评论区或仓库 Discussions 页面回复。

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
