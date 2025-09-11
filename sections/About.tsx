"use client";

import Button from "@/components/Button";

type Props = { onCta: () => void };

export default function About({ onCta }: Props) {
  return (
    <div className="relative w-full h-full flex flex-col justify-end px-4 sm:px-6 md:px-16 pb-8 sm:pb-10 md:pb-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 md:gap-8">
        <div>
          <h1 
            id="about-heading" 
            className="text-[42px] sm:text-[56px] md:text-[120px] leading-[0.95] font-black tracking-tight" 
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            <span className="block">Andrew</span>
            <span className="block">Jay</span>
          </h1>
        </div>
        <div className="max-w-[280px] sm:max-w-lg md:max-w-xl">
          <p className="text-[1.1rem] sm:text-[1.225rem] md:text-[1.4rem] font-bold text-muted">
            From websites to video, copy to content strategy, I bring ideas to life across every digital touchpoint.
          </p>
          <div className="mt-4 sm:mt-6">
            <Button onClick={onCta}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


