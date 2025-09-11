"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" }, []) as any;
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
    const api = emblaApi as EmblaCarouselType | undefined;
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
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-0 p-4 md:p-10 flex items-center justify-center">
        <div ref={setDialogRef} tabIndex={-1} className="glass w-full max-w-5xl max-h-[90vh] rounded-2xl border border-white/10 shadow-2xl overflow-hidden outline-none">
          <div className="flex items-start justify-between p-4 border-b border-white/10">
            <div>
              <h2 id="lightbox-title" className="text-xl md:text-2xl font-semibold">{title}</h2>
              <p id="lightbox-desc" className="text-sm text-muted mt-1 max-h-24 overflow-auto pr-2">{description}</p>
            </div>
            <button aria-label="Close" onClick={onClose} className="focus-ring rounded-xl p-2 hover:bg-white/10">
              <IconX className="h-5 w-5" />
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
                      <div className="min-w-0 flex-[0_0_100%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" className="block w-full h-[50vh] md:h-[60vh] object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center p-2">
                  <button className="focus-ring rounded-xl p-2 bg-white/10 hover:bg-white/20" aria-label="Previous image" onClick={() => emblaApi?.scrollPrev()}>
                    <IconArrowLeft className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center p-2">
                  <button className="focus-ring rounded-xl p-2 bg-white/10 hover:bg-white/20" aria-label="Next image" onClick={() => emblaApi?.scrollNext()}>
                    <IconArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>
          {!videoUrl && (
            <div className="flex items-center justify-center gap-2 py-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn("h-2.5 w-2.5 rounded-full", i === index ? "bg-accent" : "bg-white/30")}
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


