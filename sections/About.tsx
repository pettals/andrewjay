"use client";

import Button from "@/components/Button";

type Props = { onCta: () => void };

export default function About({ onCta }: Props) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-6 md:left-16 bottom-10 md:bottom-16">
        <h1 id="about-heading" className="text-[56px] md:text-[120px] leading-none font-black tracking-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <span className="block">Andrew</span>
          <span className="block">Jay</span>
        </h1>
      </div>
      <div className="absolute right-6 md:right-16 bottom-10 md:bottom-16 max-w-lg md:max-w-xl">
        <p className="text-[1.225rem] md:text-[1.4rem] font-bold text-muted">
          From websites to video, copy to content strategy, I bring ideas to life across every digital touchpoint.
        </p>
        <div className="mt-6 hidden md:block">
          <Button onClick={onCta}>Next</Button>
        </div>
      </div>
    </div>
  );
}


