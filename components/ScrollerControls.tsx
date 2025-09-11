"use client";

import cn from "classnames";
import { IconArrowRight } from "./Icons";

type Props = {
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  hideOnLast?: boolean;
};

export default function ScrollerControls({ activeIndex, total, onPrev, onNext, hideOnLast }: Props) {
  const hide = hideOnLast && activeIndex === total - 1;
  return (
    <div className={cn("fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 transition", hide && "opacity-0 pointer-events-none")}>
      <button
        onClick={onNext}
        aria-label="Next section"
        className="focus-ring rounded-full h-12 w-12 md:h-14 md:w-14 glass grid place-items-center hover:bg-black/10"
      >
        <IconArrowRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
}


