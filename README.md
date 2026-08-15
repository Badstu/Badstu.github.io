# Badstu Academic Homepage

基于 HugoBlox Academic CV 构建的学术主页与个人博客，部署在 GitHub Pages。

## 日常使用

1. 打开 Pages CMS：`https://app.pagescms.org`。
2. 使用 GitHub 登录并选择 `Badstu/Badstu.github.io`。
3. 在“博客文章”“论文”或“项目”中创建内容。
4. 保存后 GitHub Actions 会自动重新构建网站。

## 首次个性化

- `data/authors/me.yaml`：姓名、简介、邮箱、研究方向和学术经历。
- `content/_index.md`：首页研究简介和区块顺序。
- `assets/media/authors/me.png`：头像。
- `static/uploads/cv.pdf`：个人简历；上传后可在 `content/_index.md` 中启用下载按钮。
- `config/_default/params.yaml`：站点名称、配色和页脚。
- `config/_default/menus.yaml`：导航菜单。

占位邮箱、研究方向、头像和 CV 请在正式发布前替换。

## 本地预览

需要 Hugo Extended、Go、Node.js 和 pnpm：

```bash
pnpm install
hugo server
```

访问 `http://localhost:1313/`。

## 发布

推送到 `master` 分支后，`.github/workflows/deploy.yml` 会构建并发布站点。首次部署需要在 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
