"use client";

import { useMemo, useState } from "react";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
};

export default function Carousel({ children, className }: CarouselProps) {
  const [index, setIndex] = useState(0);

  const color = useMemo(() => {
    const h = Math.floor(Math.random() * 360);
    const s = 60 + Math.random() * 40;
    const l = 50 + Math.random() * 10;
    return `hsl(${h} ${s}% ${l}%)`;
  }, []);

  const prev = () => setIndex((i) => (i === 0 ? children.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === children.length - 1 ? 0 : i + 1));

  return (
    <div
      className={"relative overflow-hidden " + (className ?? "")}
      style={{ backgroundColor: color }}
    >
      <div
        className='whitespace-nowrap transition-transform'
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {children.map((child, i) => (
          <div key={i} className='inline-block w-full align-top'>
            {child}
          </div>
        ))}
      </div>
      {children.length > 1 && (
        <>
          <button
            aria-label='Previous'
            onClick={prev}
            className='absolute left-0 top-1/2 -translate-y-1/2 p-2'
          >
            ‹
          </button>
          <button
            aria-label='Next'
            onClick={next}
            className='absolute right-0 top-1/2 -translate-y-1/2 p-2'
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
