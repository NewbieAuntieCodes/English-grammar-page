# Next Codex Handoff

这份文档是给下一个 Codex 线程看的。

目的只有一个：

让新的 Codex 在不看完整聊天记录的情况下，也能继续把 `content-docs/` 下面剩余的模块写完，而且写出来的东西要和现在已经完成的风格一致。

---

## 你现在所在的项目

- Project root:
  - `/Users/huan/Desktop/Coding/English/english-grammar-page`
- Content docs root:
  - `/Users/huan/Desktop/Coding/English/english-grammar-page/content-docs`

---

## 这次工作的真实目标

不要再把这些 Markdown 写成“开发说明”“策划模板”“内容规格文档”。

从这一轮开始，`content-docs/` 下面的 Markdown 要写成：

- 学生可以直接阅读的学习资料
- 像讲义 / 练习册 / 教学内容稿
- 里面直接有：
  - 概念
  - 例句
  - 练习
  - 答案

也就是说：

- 这不是“教别人怎么开发网页”
- 这也不是“给开发者看的内容框架”
- 这就是网页内容的文稿版本，只是暂时放在 Markdown 里

---

## 已经完成的模块

下面这 3 个模块已经从“模板”改成了“真正的学习资料”风格：

1. `01-parts-of-speech/`
2. `02-sentence-components/`
3. `03-pos-vs-components/`

请先读这几个文件，理解风格后，再继续写剩下的模块：

- `01-parts-of-speech/00-module-overview.md`
- `01-parts-of-speech/02-verbs.md`
- `01-parts-of-speech/11-good-well.md`
- `02-sentence-components/00-module-overview.md`
- `02-sentence-components/01-subject.md`
- `02-sentence-components/06-complement.md`
- `03-pos-vs-components/00-module-overview.md`
- `03-pos-vs-components/01-pos-vs-components.md`

---

## 还没完成的模块

下面这些模块大概率还是旧的模板风格，需要继续改成“学习资料风格”：

4. `04-basic-sentence-structures/`
5. `05-questions/`
6. `06-clauses/`
7. `07-common-sentence-structures/`
8. `08-tenses/`
9. `09-vocabulary/`
10. `10-pronunciation/`

---

## 新 Codex 的工作方式

请按模块处理，不要东改一点西改一点。

推荐顺序：

1. 先读当前模块的 `00-module-overview.md`
2. 再读该模块下 1 到 2 个单元文件，确认它们还是旧模板
3. 把整个模块一起改成新风格
4. 改完后抽查 2 到 3 个文件，确认一致
5. 除非用户明确要求，否则不要同步回网页 TSX，只改 Markdown

---

## 新风格到底是什么样

每个 Markdown 打开后，应该像真正的学习资料，而不是像内容策划表。

### 模块总览文件应该长这样

应该包含：

- 这一组在学什么
- 先记住的核心句
- 学习顺序
- 一个总例子
- 最容易错的地方
- 学完后应该会什么

不应该包含：

- `Purpose`
- `Current source entry`
- `Current status`
- `Final Content Spec`
- `Keep From Current Code`
- `Remove / Rewrite`

### 单元文件应该长这样

应该尽量包含：

- 一句话先记住
- 怎么理解 / 怎么找
- 2 到 4 个例句
- 1 到 2 组小练习
- 答案
- 必要时加一个小结

不应该保留：

- `Basic Info`
- `Current Goal`
- `What to teach`
- `What not to over-explain`
- `Micro-practice 1`
- `Final practice`
- `UX Notes`

这些都是旧模板风格，应该删除。

---

## 文风要求

文风必须符合下面这些要求：

- 中文为主
- 短句优先
- 解释尽量短
- 少讲空话
- 少讲“为什么学这个很重要”这类废话
- 不要写成老师培训手册
- 要像学生拿到就能直接开始看的东西

---

## 内容要求

### 例句

- 例句要短
- 词汇难度不要太高
- 优先用高频词
- 一个例句只服务一个重点

### 练习

- 练习要直接
- 优先选择：
  - 找出某个部分
  - 判断词性 / 成分
  - 选择正确答案
  - 看句子分析
- 每个单元至少带 1 组练习和答案

### 答案

- 必须有答案
- 答案要清楚
- 不要只写“略”

---

## 重要边界

1. 不要重新生成 `content-docs` 的目录结构
2. 不要运行会覆盖现有文档骨架的脚本
3. 不要把已经完成的 `01/02/03` 又改回模板风格
4. 不要直接改网页代码，除非用户明确要求
5. 当前阶段先做 Markdown 内容，不做 TSX 页面同步

---

## 推荐你先做哪个模块

建议先从：

- `04-basic-sentence-structures/`

开始。

理由：

- 它和 `01/02/03` 逻辑上连得最紧
- 前面的词性、成分、连接关系做完后，接句型最顺

做完 `04` 后，再继续：

- `05-questions`
- `08-tenses`
- `06-clauses`
- `07-common-sentence-structures`
- `09-vocabulary`
- `10-pronunciation`

---

## 如果你是新的 Codex，请直接执行

你的任务不是写计划，而是继续把剩余模块改成“学生可直接阅读的学习资料”。

从 `content-docs/04-basic-sentence-structures/` 开始：

1. 重写 `00-module-overview.md`
2. 重写该模块下所有单元 Markdown
3. 删除旧模板字段
4. 改成“概念 + 例句 + 练习 + 答案”的风格
5. 完成后向用户汇报你改了哪些文件

不要先问很多问题，直接开始做。
