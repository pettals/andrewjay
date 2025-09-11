"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import cn from "classnames";
import { Project } from "@/data/projects";

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  return (
    <button
      className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 focus-ring"
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.title}`}
    >
      <div className="aspect-square w-full relative">
        <Image src={project.thumb} alt={`Thumbnail for ${project.title}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition">
        <div className="text-left flex flex-col gap-3">
          <div>
            <div className="text-sm text-white/80">{project.year}</div>
            <div className="text-base font-medium">{project.title}</div>
          </div>
          <button 
            className="bg-pink-500 text-white hover:bg-pink-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-fit"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project);
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </button>
  );
}


