"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { IconX, IconArrowLeft, IconArrowRight } from "./Icons";

type Props = {
  isOpen: boolean;
  title: string;
  description: string;
  images: string[];
  onClose: () => void;
  videoUrl?: string;
};

export default function Lightbox({ isOpen, title, description, images, onClose, videoUrl }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" }, []);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  useEffect(() => {
    if (videoUrl) return;
    const api = emblaApi as UseEmblaCarouselType[1] | undefined;
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => { api.off("select", onSelect); };
  }, [emblaApi, videoUrl]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!videoUrl) {
        if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
        if (e.key === "ArrowRight") emblaApi?.scrollNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, emblaApi, onClose, videoUrl]);

  const setDialogRef = useCallback((el: HTMLDivElement | null) => {
    dialogRef.current = el;
    if (el) el.focus();
  }, []);

  const content = (
    <div role="dialog" aria-modal="true" aria-labelledby="lightbox-title" aria-describedby="lightbox-desc" className={cn("fixed inset-0 z-50", isOpen ? "" : "hidden")}>
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="absolute inset-0 p-2 sm:p-4 md:p-10 flex items-center justify-center">
        <div 
          ref={setDialogRef} 
          tabIndex={-1} 
          className="glass w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden outline-none"
        >
          <div className="flex items-start justify-between p-3 sm:p-4 border-b border-white/10">
            <div className="pr-2">
              <h2 id="lightbox-title" className="text-lg sm:text-xl md:text-2xl font-semibold">{title}</h2>
              <p id="lightbox-desc" className="text-xs sm:text-sm text-muted mt-0.5 sm:mt-1 max-h-16 sm:max-h-24 overflow-auto">{description}</p>
            </div>
            <button 
              aria-label="Close" 
              onClick={onClose} 
              className="focus-ring rounded-lg sm:rounded-xl p-1.5 sm:p-2 hover:bg-white/10 -mr-1"
            >
              <IconX className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
          <div className="relative">
            {videoUrl ? (
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={videoUrl}
                  title={title}
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  allowFullScreen
                />
              </div>
            ) : (
              <>
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {images.map((src) => (
                      <div key={src} className="min-w-0 flex-[0_0_100%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="block w-full h-[45vh] sm:h-[50vh] md:h-[60vh] object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center p-1.5 sm:p-2">
                  <button 
                    className="focus-ring rounded-lg sm:rounded-xl p-1.5 sm:p-2 bg-white/10 hover:bg-white/20" 
                    aria-label="Previous image" 
                    onClick={() => emblaApi?.scrollPrev()}
                  >
                    <IconArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center p-1.5 sm:p-2">
                  <button 
                    className="focus-ring rounded-lg sm:rounded-xl p-1.5 sm:p-2 bg-white/10 hover:bg-white/20" 
                    aria-label="Next image" 
                    onClick={() => emblaApi?.scrollNext()}
                  >
                    <IconArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
          {!videoUrl && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn("h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full", i === index ? "bg-accent" : "bg-white/30")}
                  onClick={() => emblaApi?.scrollTo(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") return null;
  const root = document.body;
  return createPortal(content, root);
}


