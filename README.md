# wjr-z blog

这是一个由旧 Hexo 静态输出迁移而来的 Astro 博客。原有 63 篇文章已经从 HTML 还原为 Markdown，位于 `src/content/blog/`。

## 本地开发

```bash
npm install
npm run dev
```

打开 `http://localhost:4321/`，可以重点检查：

- `http://localhost:4321/sections/computer-contest/`：计算机竞赛栏目
- 任意文章页，例如 `/牛客挑战赛47/`
- `/archives/` 和 `/tags/`：归档与标签

生产构建：

```bash
npm run build
npm run preview
```

`npm run build` 成功且 `dist/` 生成后，说明 Markdown 内容、动态路由和部署产物都通过了构建检查。

## 内容结构

新增文章放入 `src/content/blog/`，推荐使用下面这个最小 frontmatter：

```yaml
---
date: 2026-08-29
section: 计算机竞赛
tags: DP, 动态规划
---
```

字段规则如下：

- `date`：必填，表示文章的发布时间，格式为 `YYYY-MM-DD`。
- `section`：必填，表示文章栏目。目前包含：

	- `computer-contest` 或 `计算机竞赛`：计算机竞赛
	- `engineering` 或 `工程实践`：工程实践
	- `notes` 或 `学习备忘`：学习备忘

- `tags`：可选，默认为空数组。可以写成 YAML 数组，也可以写成逗号分隔文本；中文逗号和标签前的 `#` 会自动处理。
- `title`：可选，默认使用 Markdown 文件名作为标题。
- `updated`：可选，只有文章确实更新过时才填写。

`section` 和 `tags` 会在构建时校验和规范化，写错栏目名称会直接提示错误，不会悄悄生成错误分类。

行内公式使用 `$...$`，独立公式使用 `$$...$$`，构建时由 KaTeX 渲染。

`tags` 用于更细粒度的主题筛选。文章会自动出现在对应栏目、归档和标签页。

`src/content/blog/` 是当前唯一生效的 Astro 内容集合；旧的 `src/content/posts/` 已移除，不要再创建第二份副本。

## 修改站点文案和栏目

站点配置统一放在 `src/data/site.json`，日常修改文案只需要编辑这个文件，不需要修改 Astro 或 TypeScript 代码：

- `home`：首页标语、标题、按钮、栏目区块和最近文章区块的文案。
- `sectionsPage`：栏目总览页的眉题、标题和介绍。
- `sectionPage`：具体栏目页的眉题和文章数量说明。
- `navigation`：顶部导航的链接和显示名称。
- `site`：站点标题、描述、品牌名称、页脚文字等公共信息。

新增栏目时，只需在 `src/data/site.json` 的 `sections` 下增加一个对象。对象的键是稳定的英文 ID，也会成为 URL 的一部分；`label` 是页面显示的中文名，`english` 是英文眉题，`description` 是栏目介绍，`aliases` 是文章 frontmatter 中允许使用的名称。例如：

```json
"reading": {
	"label": "阅读记录",
	"english": "READING NOTES",
	"description": "读过的书、文章和留下来的思考。",
	"aliases": ["reading", "阅读记录"]
}
```

添加后，文章可以直接使用 `section: 阅读记录` 或 `section: reading`。栏目首页、栏目详情页、标签页统计和文章校验会自动读取这个配置；不需要再改 `config.ts`、栏目页面或首页代码。修改 JSON 后重新运行 `npm run build` 即可检查配置是否正确。

## GitHub Pages

`.github/workflows/deploy.yml` 会在 `master` 分支推送后构建并发布 `dist/`。在仓库 Settings → Pages 中将发布来源设置为 **GitHub Actions**，首次启用后即可使用 `https://wjr-z.github.io/`。