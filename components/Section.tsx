"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  backgroundClass?: string;
  backgroundImageUrl?: string;
  backgroundOverlayClass?: string;
  contentClassName?: string;
};

export default function Section({ id, children, backgroundClass, backgroundImageUrl, backgroundOverlayClass, contentClassName }: Props) {
  return (
    <section
      id={id}
      className="relative min-w-[100vw] snap-start h-[100dvh] flex items-start justify-center p-6 md:p-16 pt-28 md:pt-32"
      aria-labelledby={`${id}-heading`}
    >
      {backgroundImageUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={backgroundImageUrl} alt="" className="pointer-events-none absolute inset-0 -z-10 h-[125%] w-[125%] object-contain m-auto" />
          {backgroundOverlayClass ? <div aria-hidden className={`absolute inset-0 -z-10 ${backgroundOverlayClass}`} /> : null}
        </>
      ) : backgroundClass ? (
        <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 ${backgroundClass}`} />
      ) : null}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
        viewport={{ once: true, amount: 0.4 }}
        className={contentClassName ? contentClassName : "w-full max-w-6xl"}
      >
        {children}
      </motion.div>
    </section>
  );
}


