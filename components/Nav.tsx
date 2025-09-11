"use client";

import { useCallback, useState } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Services" },
  { id: "book", label: "Book a Call" },
] as const;

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClick = useCallback((id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    history.replaceState(null, "", `/#${id}`);
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className="ml-auto mr-4 md:mr-6 mt-4 md:mt-6 px-3 md:px-4 py-2 md:py-2.5 glass rounded-2xl flex items-center gap-6 relative">
      <ul className="hidden md:flex items-center gap-6 text-sm">
        {LINKS.map((l) => (
          <li key={l.id}>
            <a href={`/#${l.id}`} onClick={onClick(l.id)} className="hover:opacity-90 focus-ring">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 hover:opacity-80 focus-ring"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {isMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {isMenuOpen && (
        <ul className="absolute top-full right-0 mt-2 py-2 px-4 glass rounded-xl w-48 flex flex-col gap-2 text-sm md:hidden border border-white/10 shadow-lg">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a 
                href={`/#${l.id}`} 
                onClick={onClick(l.id)} 
                className="hover:opacity-80 focus-ring block py-2 px-2 rounded-lg transition-colors hover:bg-white/10"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}


