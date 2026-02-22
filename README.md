# Doodles Gallery

A single-page gallery to browse through my drawings, built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

```bash
# Install dependencies
npm install

# Run in development mode (hot-reload)
npm start

# Build for production
npm run build

```

The site runs at **http://localhost:3000**.

## Adding New Drawings

1. Drop your image files into `public/drawings/`
2. Open `src/app/drawings.ts` and add an entry at the bottom of the array:
   ```ts
   { src: "/drawings/YourFile.png", title: "Your Title" },
   ```
   The newest entry (last in the list) will be shown first on the site.

## Navigation

- **Previous / Next** buttons to step through drawings
- **First / Last** buttons to jump to the newest or oldest drawing
- **Keyboard shortcuts:** Arrow keys (← →), Home, End

## Project Structure

```
public/
  drawings/    — your drawing image files
  UI/          — custom UI icons (logo, nav buttons)
src/app/
  drawings.ts  — list of all drawings
  page.tsx     — gallery page component
  layout.tsx   — root layout
  globals.css  — styles and theme
```

## Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
