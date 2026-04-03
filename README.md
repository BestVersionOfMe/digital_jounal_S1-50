# Best Version of Me — Next.js 前端

与根目录 Streamlit 原型并行：**Next.js（App Router）+ React + TypeScript + Tailwind CSS**，数据保存在浏览器 **localStorage**（无后端、无数据库）。

## 结构

| 路径 | 说明 |
|------|------|
| `src/app/` | App Router：`layout.tsx`、`page.tsx`、`globals.css` |
| `src/lib/self-awareness.ts` | 文案与常量（对齐 `bvm_journal/sections/self_awareness.py`） |
| `src/hooks/useJournalStorage.ts` | `localStorage` 读写与状态更新 |
| `src/components/self-awareness/` | Self-Awareness 页 UI（分段条 / pills / 滑条 / 文本域 / 导出） |

## 本地运行

需安装 [Node.js](https://nodejs.org/)（建议 LTS）。

```bash
cd web
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000) 即可查看与 Streamlit 版对应的 **Self-Awareness** 排版。

## 构建

```bash
npm run build
npm start
```
