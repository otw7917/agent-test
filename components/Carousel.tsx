"use client";

import { useMemo, useState } from "react";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
};

export default function Carousel({ children, className }: CarouselProps) {
  const slides = useMemo(() => {
    if (children.length > 1) {
      const first = children[0];
      const last = children[children.length - 1];
      return [last, ...children, first];
    }
    return children;
  }, [children]);

  const [index, setIndex] = useState(children.length > 1 ? 2 : 0);
  const [animating, setAnimating] = useState(false);

  const color = useMemo(() => {
    const h = Math.floor(Math.random() * 360);
    const s = 60 + Math.random() * 40;
    const l = 50 + Math.random() * 10;
    return `hsl(${h} ${s}% ${l}%)`;
  }, []);

  const prev = () => {
    if (children.length > 1) {
      setAnimating(true);
      setIndex((i) => i - 1);
    }
  };
  const next = () => {
    if (children.length > 1) {
      setAnimating(true);
      setIndex((i) => i + 1);
    }
  };

  const handleTransitionEnd = () => {
    if (index === 0) {
      setAnimating(false);
      setIndex(slides.length - 2);
    } else if (index === slides.length - 1) {
      setAnimating(false);
      setIndex(1);
    } else {
      setAnimating(false);
    }
  };

  return (
    <div
      className={"relative overflow-hidden " + (className ?? "")}
      style={{ backgroundColor: color }}
    >
      <div
        className='flex'
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animating ? "transform 0.3s" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((child, i) => (
          <div key={i} className='flex-shrink-0 w-[80%] mx-[10%]'>
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
