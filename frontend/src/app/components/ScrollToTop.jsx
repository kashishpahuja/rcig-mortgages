"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Always open page from the top
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showButton) return null;

  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      aria-label="Scroll to top"
      className="
        fixed
        bottom-6
        right-6
        z-[9999]
        w-12
        h-12
        rounded-full
        bg-[#071B35]/60
        text-white
        border
        border-white/20
        shadow-xl
        backdrop-blur-xl
        flex
        items-center
        justify-center
        hover:bg-[#0b2345]
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <FaArrowUp size={16} />
    </button>
  );
}