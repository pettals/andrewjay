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
    <div className="bg-white rounded-xl p-4 sm:p-5 md:p-6 transition-all hover:shadow-lg flex flex-col h-full">
      <div>
        <h3 className="text-gray-800 text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
        <p className="text-gray-600 text-sm sm:text-base" id={`${id}-desc`}>
          {description}
        </p>
      </div>
      <div className="mt-auto pt-4 sm:pt-5 md:pt-6">
        <button
          className="w-full sm:w-auto bg-pink-500 text-white hover:bg-pink-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          onClick={scrollToBook}
          aria-describedby={`${id}-desc`}
        >
          Let&apos;s Talk
        </button>
      </div>
    </div>
  );
}


