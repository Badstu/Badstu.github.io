---
title: ''
summary: Badstu 的学术主页与个人博客
date: 2026-08-15
type: landing

sections:
  - block: resume-biography-3
    content:
      username: me
      text: ''
      headings:
        about: 关于我
        education: 教育经历
        interests: 研究兴趣
    design:
      background:
        gradient_mesh:
          enable: true
      name:
        size: md
      avatar:
        size: medium
        shape: circle

  - block: markdown
    id: research
    content:
      title: 研究简介
      subtitle: Research
      text: |-
        请在这里介绍你的研究方向、当前关注的问题，以及希望开展的合作。

        你可以在 `content/_index.md` 中修改这段文字，也可以后续把主页资料接入在线编辑。
    design:
      columns: '1'

  - block: collection
    id: papers
    content:
      title: 代表性论文
      subtitle: Publications
      filters:
        folders:
          - publications
        featured_only: true
    design:
      view: citation

  - block: collection
    id: projects
    content:
      title: 近期项目
      subtitle: Projects
      count: 6
      filters:
        folders:
          - projects
    design:
      view: card
      columns: 2

  - block: collection
    id: blog
    content:
      title: 最近文章
      subtitle: Blog
      page_type: blog
      count: 6
      filters:
        folders:
          - blog
        exclude_future: true
      order: desc
    design:
      view: card
      columns: 2
---
