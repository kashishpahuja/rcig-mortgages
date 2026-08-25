// components/AnimatedText.jsx
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedText({ text, className = '' }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            // Compute global character index approximation for scroll mapping
            const totalLength = text.length;
            const charGlobalIndex = text.indexOf(char); // simplified index mapping
            const start = charGlobalIndex / totalLength;
            const end = start + 0.15;

            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

            return (
              <span key={charIndex} className="relative inline-block">
                <span className="opacity-2art">{char}</span>
                <motion.span
                  style={{ opacity }}
                  className="absolute inset-0"
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </p>
  );
}