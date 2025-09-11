"use client";

import cn from "classnames";

type Props = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function ProgressDots({ count, activeIndex, onSelect }: Props) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 md:bottom-6 flex items-center justify-center z-40">
      <div className="pointer-events-auto glass rounded-full px-3 py-2 flex gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to section ${i + 1}`}
            onClick={() => onSelect(i)}
            className={cn(
              "h-1.5 md:h-2 w-6 md:w-8 rounded-full transition focus-ring",
              i === activeIndex ? "bg-accent" : "bg-black/25 hover:bg-black/40"
            )}
            aria-current={i === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}


