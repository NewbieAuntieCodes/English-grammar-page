# Web → Docs 同步审计

## 当前原则

当前阶段先以正式网页 TSX 为准。

目标是先把 `content-docs` 校准成网页内容的文字稿。之后再把 `content-docs` 当作内容源头：先审 docs，再批量同步回网页。

## 本轮已按网页同步的范围

已根据 `content-docs/00-web-doc-map.md` 中的映射，把 73 个 lesson docs 自动同步为对应网页 TSX 的核心内容稿。

同步范围包括：

- lesson 标题
- 网页里的主要说明文字
- 例句英文和中文
- WordSelector / FillInTheBlank / SentenceBuilder 等练习数据
- 正确答案、目标词、选项

每份已同步的 lesson doc 都包含：

- `Synced from web component: ...`
- `Sync Notes`

后续用户可以先审这些 lesson docs。确认修改后，再同步回对应 TSX 页面。

## 需要后续继续审计的范围

菜单页、模块 overview、handoff、practice-components 这类文档不是 lesson 页面镜像，仍作为规划/说明文档保留。

`content-docs/00-web-doc-map.md` 是当前同步覆盖表。

建议下一轮按模块继续：

1. 检查自动同步后的 docs 是否足够舒服易读
2. 对自动抽取不理想的复杂页面做人工整理
3. 用户审 docs 中的英文和题目
4. 根据确认后的 docs 批量同步回网页 TSX

## 待确认的网页英文问题

这些是“网页当前内容里可能需要讨论”的点。先不要直接改，等用户确认后再从 docs 改起，再同步到网页。

1. `rather than` / `instead of` 部分有些综合选择题在真实英语里可能不止一个自然答案，尤其是比较动作或替代动作时。后续建议逐题改成答案唯一的句子。
2. `Adverbs` 页面现在会把 `fast / well / hard / late` 都作为副词练习。语法上可以成立，但 beginner 可能会困惑，因为这些词也常有形容词用法。后续可以加一个短提醒：有些副词不以 `-ly` 结尾。
3. `Good / Well` 网页内容已经比旧 docs 更好，但 `well` 作形容词时最好始终绑定“健康/身体状态”语境，避免和口语 `I'm good` 混在一起。
