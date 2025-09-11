export type Project = {
  id: string;
  title: string;
  thumb: string;
  description: string;
  images: string[];
  tags?: string[];
  year?: number;
  videoUrl?: string;
};

export const projects: Project[] = [
  {
    id: "aurora",
    title: "Aurora Campaign",
    thumb: "/projects/aurora/thumb.svg",
    description: "A brand film and landing experience for a seasonal product launch.",
    images: [
      "/projects/aurora/1.svg",
      "/projects/aurora/2.svg",
      "/projects/aurora/3.svg",
    ],
    tags: ["Video", "Design"],
    year: 2024,
  },
  {
    id: "disney",
    title: "Disney Castle",
    thumb: "/projects/disney/thumb.jpg",
    description: "A family of promos and microsites celebrating character moments.",
    images: [
      "/projects/disney/1.svg",
      "/projects/disney/2.svg",
      "/projects/disney/3.svg",
    ],
    tags: ["Video", "Content"],
    year: 2024,
    videoUrl: "https://player.vimeo.com/video/496010115?autoplay=1&title=0&byline=0&portrait=0",
  },
  {
    id: "northstar",
    title: "Northstar Rebrand",
    thumb: "/projects/northstar/thumb.svg",
    description: "Complete brand system with motion toolkit and web.",
    images: [
      "/projects/northstar/1.svg",
      "/projects/northstar/2.svg",
      "/projects/northstar/3.svg",
    ],
    tags: ["Brand", "Design"],
    year: 2023,
  },
  {
    id: "atlas",
    title: "Atlas Product Design",
    thumb: "/projects/atlas/thumb.svg",
    description: "Component-driven product UI with a11y first.",
    images: [
      "/projects/atlas/1.svg",
      "/projects/atlas/2.svg",
      "/projects/atlas/3.svg",
    ],
    tags: ["Product", "Design"],
    year: 2022,
  },
  {
    id: "ember",
    title: "Ember Short Film",
    thumb: "/projects/ember/thumb.svg",
    description: "Festival film edited for social and TV.",
    images: [
      "/projects/ember/1.svg",
      "/projects/ember/2.svg",
      "/projects/ember/3.svg",
    ],
    tags: ["Video"],
    year: 2021,
  },
  {
    id: "vector",
    title: "Vector Marketing",
    thumb: "/projects/vector/thumb.svg",
    description: "Evergreen content system for product launches.",
    images: [
      "/projects/vector/1.svg",
      "/projects/vector/2.svg",
      "/projects/vector/3.svg",
    ],
    tags: ["Content", "Strategy"],
    year: 2020,
  },
  {
    id: "delta",
    title: "Delta Mobile UI",
    thumb: "/projects/delta/thumb.svg",
    description: "Mobile app design with motion guidelines.",
    images: [
      "/projects/delta/1.svg",
      "/projects/delta/2.svg",
      "/projects/delta/3.svg",
    ],
    tags: ["Product", "Design"],
    year: 2019,
  },
];


