"use client";

import { useId } from "react";

type Props = {
  title: string;
  description: string;
};

export default function ServiceItem({ title, description }: Props) {
  const id = useId();

  const scrollToBook = () => {
    const bookSection = document.getElementById('book-heading');
    if (bookSection) {
      bookSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 transition-all hover:shadow-lg flex flex-col h-full">
      <div>
        <h3 className="text-gray-800 text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 text-sm" id={`${id}-desc`}>
          {description}
        </p>
      </div>
      <div className="mt-auto pt-6">
        <button
          className="bg-pink-500 text-white hover:bg-pink-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          onClick={scrollToBook}
          aria-describedby={`${id}-desc`}
        >
          Let's Talk
        </button>
      </div>
    </div>
  );
}


