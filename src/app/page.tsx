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
    <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-10">
      {/* Logo */}
      <Image
        src="/UI/logo.png"
        alt="My Doodles"
        width={300}
        height={100}
        className="object-contain"
        priority
      />

      {/* Image card */}
      <div className="relative w-full max-w-2xl aspect-square sketchy-border bg-(--card-bg) p-2">
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
      <p
        className="text-xl text-(--fg) opacity-70"
        style={{ fontFamily: "'Caveat', cursive" }}
      >
        {drawing.title}
      </p>

      {/* Navigation */}
      <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
        <button
          onClick={goFirst}
          disabled={index === 0}
          aria-label="Newest drawing"
          className="icon-btn"
        >
          <Image src="/UI/last75.png" alt="Newest" width={48} height={48} />
        </button>

        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous drawing"
          className="icon-btn"
        >
          <Image src="/UI/prev75.png" alt="Previous" width={48} height={48} />
        </button>

        <span
          className="text-xl tabular-nums px-2 opacity-60"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {index + 1} / {total}
        </span>

        <button
          onClick={next}
          disabled={index === total - 1}
          aria-label="Next drawing"
          className="icon-btn"
        >
          <Image src="/UI/next75.png" alt="Next" width={48} height={48} />
        </button>

        <button
          onClick={goLast}
          disabled={index === total - 1}
          aria-label="Last drawing"
          className="icon-btn"
        >
          <Image src="/UI/newest75.png" alt="Last" width={48} height={48} />
        </button>
      </div>

      {/* Footer hint */}
      <p className="text-sm opacity-40 mt-2">
        Tip: Use ← → arrow keys to navigate, Home / End to jump to first / last
      </p>
    </main>
  );
}
