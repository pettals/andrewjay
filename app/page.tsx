"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Section from "@/components/Section";
import ProgressDots from "@/components/ProgressDots";
import ScrollerControls from "@/components/ScrollerControls";
import About from "@/sections/About";
import Portfolio from "@/sections/Portfolio";
import Services from "@/sections/Services";
import Book from "@/sections/Book";

const SECTION_IDS = ["about", "portfolio", "services", "book"] as const;

export default function Home() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches,
    []
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const handler = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const offsets = children.map((c) => Math.abs(c.getBoundingClientRect().left));
      const idx = offsets.indexOf(Math.min(...offsets));
      setActiveIndex(idx);
    };
    el.addEventListener("scroll", handler, { passive: true } as AddEventListenerOptions);
    handler();
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const snapTo = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const clamped = Math.max(0, Math.min(children.length - 1, index));
    children[clamped].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    const id = SECTION_IDS[clamped];
    if (id) history.replaceState(null, "", `/#${id}`);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        snapTo(activeIndex + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        snapTo(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, snapTo]);

  const onDotClick = (idx: number) => snapTo(idx);

  return (
    <main className="relative">
      <div
        ref={scrollerRef}
        className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden h-[100dvh] flex flex-row scroll-smooth [scrollbar-width:thin] md:[scrollbar-width:auto] md:scroll-ps-0"
        role="region"
        aria-label="Portfolio sections"
      >
        <Section id="about" backgroundImageUrl="/about-bg.jpg" contentClassName="w-full h-full"><About onCta={() => snapTo(1)} /></Section>
        <Section id="portfolio" backgroundClass="bg-[radial-gradient(60%_50%_at_70%_30%,rgba(255,46,166,0.08),transparent),linear-gradient(180deg,#fff,#fafafa)]"><Portfolio /></Section>
        <Section id="services" backgroundClass="bg-[radial-gradient(70%_60%_at_30%_70%,rgba(255,46,166,0.08),transparent),linear-gradient(180deg,#fff,#f6f7f9)]"><Services /></Section>
        <Section id="book" backgroundClass="bg-[radial-gradient(65%_55%_at_80%_20%,rgba(255,46,166,0.10),transparent),linear-gradient(180deg,#fff,#f2f3f5)]"><Book /></Section>
      </div>
      <ProgressDots count={SECTION_IDS.length} activeIndex={activeIndex} onSelect={onDotClick} />
      <ScrollerControls activeIndex={activeIndex} total={SECTION_IDS.length} onPrev={() => snapTo(activeIndex - 1)} onNext={() => snapTo(activeIndex + 1)} hideOnLast />
    </main>
  );
}
