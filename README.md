# Best Version of Me

A single-page **self-awareness** journal for the *Best Version of Me* workshop: skills self-rating, self-compassion prompts, seeking feedback, honest feedback (Glow & Grow), self-reflection measures, and a simple journal—all persisted in the browser via `localStorage` (no backend).

**Live site:** [https://digital-jounal-s1-50.vercel.app/](https://digital-jounal-s1-50.vercel.app/)

## Stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- React 19 & TypeScript
- Tailwind CSS
- Framer Motion (selected interactions)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Notes

- The repository root is the Next.js app root. On Vercel, set **Root Directory** to the repo root (e.g. `./`) if the app files live at the top level.
- There is no server-side API. Do not commit real secrets. For local secrets, use `.env.local` (gitignored) and define the same keys in your host’s environment settings.
