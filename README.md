# 811lab.cn

[![Site CI](https://github.com/huster-zj/811lab.cn/actions/workflows/ci.yml/badge.svg)](https://github.com/huster-zj/811lab.cn/actions/workflows/ci.yml)

811lab.cn 是个人成长博客与工作室档案，记录正在进行的学习、项目、研究路线和书架。

## 目录结构

```text
.
├── index.html      # 首页：记录、工作室档案、书架与研究路线
├── style.css       # 首页样式
├── main.js         # 首页导航、筛选和书架检索
└── PayingForKnowledge/  # 其他项目，暂未接入首页
```

## 本地预览

```powershell
npx --yes http-server . -p 4173 -c-1
```

然后打开 http://127.0.0.1:4173/。

## 部署

`main` 分支的 HTML、CSS、JavaScript 和本地资源引用校验通过后，GitHub Actions 会自动将站点发布到生产服务器：

- 访问地址：http://120.27.161.157:8080/
- 发布目录：`/var/www/811lab/releases/`
- 当前版本：`/var/www/811lab/current`
- 保留最近 5 个发布版本；新版本健康检查失败时自动回退

CD 工作流依赖仓库中的 `DEPLOY_HOST`、`DEPLOY_USER`、`DEPLOY_SSH_PORT`、`DEPLOY_SSH_KEY` 和 `DEPLOY_KNOWN_HOSTS` secrets。

## 内容来源

首页中的工作室档案和书架目录基于本地 `D:\Obsidian\工作室` 整理。原始目录只读，不属于本仓库的运行时依赖；硬件清单和项目总览中的空白内容会在形成真实记录后继续补充。
