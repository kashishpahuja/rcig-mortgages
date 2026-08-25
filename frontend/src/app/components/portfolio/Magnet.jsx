// components/Magnet.jsx
'use client';

import React, { useState, useRef } from 'react';

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = ''
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [transition, setTransition] = useState(inactiveTransition);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (
      Math.abs(distanceX) < rect.width / 2 + padding &&
      Math.abs(distanceY) < rect.height / 2 + padding
    ) {
      setTransition(activeTransition);
      setPosition({
        x: distanceX / strength,
        y: distanceY / strength
      });
    } else {
      setTransition(inactiveTransition);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setTransition(inactiveTransition);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition,
        willChange: 'transform'
      }}
      className={className}
    >
      {children}
    </div>
  );
}