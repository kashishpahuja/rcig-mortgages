"use client";

import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiPhone,
} from "react-icons/fi";
import Image from "next/image";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Mortgage Solutions", href: "#mortgage-solutions" },
    { label: "Business Loans", href: "#business-loans" },
    { label: "Why RCIG", href: "#why-rcig" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">

      {/* Top Announcement */}
      <div className="bg-[#0D2B45] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[38px] text-center">
            <p className="text-[11px] sm:text-xs md:text-sm leading-tight">
              Personalized Mortgage & Capital Solutions — Let's Find the Right Solution for You
            </p>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full">
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            h-[76px]
            sm:h-[82px]
            lg:h-[88px]
            flex
            items-center
            justify-between
            gap-4
          "
        >

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="
              lg:hidden
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-full
              text-[#0D2B45]
              hover:bg-gray-100
              transition
              shrink-0
            "
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>

          {/* Logo */}
          <a
            href="#home"
            onClick={handleNavClick}
            className="
              flex
              items-center
              justify-center
              lg:justify-start
              shrink-0
            "
          >
            <Image
              src="/Images/logo.webp"
              alt="Royal Capital Investment Group"
              width={190}
              height={70}
              priority
              className="
                w-[135px]
                sm:w-[155px]
                md:w-[175px]
                lg:w-[190px]
                h-auto
                object-contain
              "
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-5 xl:gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  relative
                  text-sm
                  xl:text-[15px]
                  font-medium
                  text-gray-700
                  hover:text-[#0D2B45]
                  transition-colors
                  whitespace-nowrap
                  py-2
                  group
                "
              >
                {item.label}

                <span
                  className="
                    absolute
                    left-0
                    bottom-0
                    w-0
                    h-[2px]
                    bg-[#0D2B45]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <a
              href="tel:+16475003737"
              className="
                flex
                items-center
                gap-2
                bg-[#0D2B45]
                text-white
                px-4
                xl:px-5
                py-2.5
                xl:py-3
                rounded-full
                text-xs
                xl:text-sm
                font-medium
                hover:bg-[#123B5D]
                transition-colors
                whitespace-nowrap
              "
            >
              <FiPhone className="text-sm" />
              <span>647-500-3737</span>
            </a>
          </div>

        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`
          lg:hidden
          overflow-hidden
          transition-all
          duration-300
          border-t
          border-gray-100
          ${
            open
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0 border-transparent"
          }
        `}
      >
        <div className="bg-white px-5 sm:px-6 py-5">

          <div className="flex flex-col">

            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`
                  py-3.5
                  text-sm
                  sm:text-base
                  font-medium
                  text-gray-700
                  hover:text-[#0D2B45]
                  transition-colors
                  ${
                    index !== navItems.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }
                `}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Contact */}
            <div className="pt-5">
              <a
                href="tel:+16475003737"
                onClick={handleNavClick}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-[#0D2B45]
                  text-white
                  px-5
                  py-3
                  rounded-full
                  text-sm
                  font-medium
                  hover:bg-[#123B5D]
                  transition-colors
                "
              >
                <FiPhone />
                Call 647-500-3737
              </a>
            </div>

          </div>

        </div>
      </div>

    </header>
  );
}