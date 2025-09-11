"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import cn from "classnames";
import { IconArrowLeft, IconArrowRight, IconX } from "./Icons";

export type MediaItem = {
  type: "image" | "video" | "embed";
  src: string;
  alt?: string;
  poster?: string;
};

type Props = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  description: string;
  media: MediaItem[];
  onClose: () => void;
};

const spring = { type: "spring", stiffness: 180, damping: 22 } as const;

export default function CategoryOverlay({ isOpen, title, subtitle, description, media, onClose }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", duration: 20 }, []) as any;
  const [index, setIndex] = useState(0);
  const isLight = media?.[index]?.type === "embed";

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, emblaApi, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.22 } }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} details`}
        >
          <motion.div className="absolute inset-0 bg-black/70" onClick={onClose} />

          <div className="absolute inset-0 overflow-y-auto">
            <div className="min-h-full pb-6">
              <div className="sticky top-3 right-3 md:top-6 md:right-6 z-[1] flex justify-end">
                <button aria-label="Close" onClick={onClose} className="focus-ring rounded-xl p-2 bg-[#FF2EA6] hover:bg-[#FF2EA6]/90 text-white transition-colors">
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {/* Top: media carousel (larger height) */}
              <motion.div
                className="relative h-auto aspect-[16/9] rounded-2xl mx-auto max-w-[60%] md:max-w-[55%]"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: spring }}
                exit={{ y: 12, opacity: 0, transition: { duration: 0.15 } }}
              >
                <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
                  <div className="flex h-full">
                    {media.map((m, i) => (
                      <div key={i} className="min-w-0 flex-[0_0_100%] h-full">
                        {m.type === "image" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.src} alt={m.alt ?? ""} className="block w-full h-full object-cover" />
                        ) : m.type === "video" ? (
                          <video className="w-full h-full object-cover" src={m.src} poster={m.poster} controls playsInline />
                        ) : (
                          <div className="relative w-full h-full bg-white overflow-hidden rounded-2xl">
                            <iframe
                              src={m.src}
                              title={m.alt ?? "Embedded video"}
                              className="absolute inset-0 w-full h-full"
                              style={{ aspectRatio: '16/9' }}
                              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-y-0 left-0 flex items-center p-2">
                  <button className={`focus-ring rounded-xl p-2 ${isLight ? "bg-black/10 hover:bg-black/20 text-black" : "bg-white/10 hover:bg-white/20 text-white"}`} aria-label="Previous" onClick={() => emblaApi?.scrollPrev()}>
                    <IconArrowLeft className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center p-2">
                  <button className={`focus-ring rounded-xl p-2 ${isLight ? "bg-black/10 hover:bg-black/20 text-black" : "bg-white/10 hover:bg-white/20 text-white"}`} aria-label="Next" onClick={() => emblaApi?.scrollNext()}>
                    <IconArrowRight className="h-5 w-5" />
                  </button>
                </div>
                {!isLight && (
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                    {media.map((_, i) => (
                      <button key={i} aria-label={`Go to slide ${i + 1}`} className={cn("h-2.5 w-2.5 rounded-full", i === index ? "bg-accent" : "bg-white/40")} onClick={() => emblaApi?.scrollTo(i)} />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Bottom: text content */}
              <motion.div
                className="relative bg-white text-fg mt-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: spring }}
                exit={{ y: 12, opacity: 0, transition: { duration: 0.15 } }}
              >
                <div className="w-full px-5 md:px-10 py-6 md:py-10">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-sm text-muted">{subtitle}</div>
                    <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mt-1">{title}</h2>
                    <div className="mt-4 text-base leading-relaxed text-muted space-y-4">
                      {description.split(/\n\s*\n/).map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                      <a
                        href="mailto:hello@andrewjoh.com"
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#FF2EA6] hover:bg-[#FF2EA6]/90 rounded-xl transition-colors focus-ring"
                      >
                        Get in touch
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}