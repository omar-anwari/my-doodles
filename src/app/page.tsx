"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import drawings from "./drawings";

export default function GalleryPage() {
  const [index, setIndex] = useState(0);
  const total = drawings.length;

  const prev = useCallback(
    () => setIndex((i) => Math.max(0, i - 1)),
    []
  );
  const next = useCallback(
    () => setIndex((i) => Math.min(total - 1, i + 1)),
    [total]
  );
  const goFirst = useCallback(() => setIndex(0), []);
  const goLast = useCallback(() => setIndex(total - 1), [total]);

  /* Keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Home") { e.preventDefault(); goFirst(); }
      if (e.key === "End") { e.preventDefault(); goLast(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, goFirst, goLast]);

  const drawing = drawings[index];

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
        My Doodles
      </h1>

      {/* Image card */}
      <div className="relative w-full max-w-2xl aspect-square rounded-2xl overflow-hidden border border-(--border) bg-(--card-bg) shadow-lg">
        <Image
          key={drawing.src}
          src={drawing.src}
          alt={drawing.title}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      {/* Caption */}
      <p className="text-lg text-neutral-400">{drawing.title}</p>

      {/* Navigation */}
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          onClick={goFirst}
          disabled={index === 0}
          aria-label="First drawing"
          className="flex items-center gap-1 px-3 py-2.5 rounded-full border border-(--border) bg-(--card-bg) hover:border-(--accent) hover:text-(--accent) disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M11 19l-7-7 7-7M17 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous drawing"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-(--border) bg-(--card-bg) hover:border-(--accent) hover:text-(--accent) disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <span className="text-sm text-neutral-500 tabular-nums">
          {index + 1} / {total}
        </span>

        <button
          onClick={next}
          disabled={index === total - 1}
          aria-label="Next drawing"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-(--border) bg-(--card-bg) hover:border-(--accent) hover:text-(--accent) disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={goLast}
          disabled={index === total - 1}
          aria-label="Last drawing"
          className="flex items-center gap-1 px-3 py-2.5 rounded-full border border-(--border) bg-(--card-bg) hover:border-(--accent) hover:text-(--accent) disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M13 5l7 7-7 7M7 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Footer hint */}
      <p className="text-xs text-neutral-600 mt-4">
        Tip: Use ← → arrow keys to navigate, Home / End to jump to first / last
      </p>
    </main>
  );
}
