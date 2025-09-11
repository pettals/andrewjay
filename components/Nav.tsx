"use client";

import { useCallback } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Services" },
  { id: "book", label: "Book a Call" },
] as const;

export default function Nav() {
  const onClick = useCallback((id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    history.replaceState(null, "", `/#${id}`);
  }, []);

  return (
    <nav className="ml-auto mr-4 md:mr-6 mt-4 md:mt-6 px-3 md:px-4 py-2 md:py-2.5 glass rounded-2xl flex items-center gap-6">
      <ul className="hidden md:flex items-center gap-6 text-sm">
        {LINKS.map((l) => (
          <li key={l.id}>
            <a href={`/#${l.id}`} onClick={onClick(l.id)} className="hover:opacity-90 focus-ring">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="md:hidden" />
    </nav>
  );
}


