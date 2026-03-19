"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we scroll down more than 20px, update state
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
        ${
    isScrolled
      ? "bg-white/80 backdrop-blur-md py-3 shadow-md border-b"
      : "bg-transparent py-3 border-transparent"
    }
      `}
    >
      <Container>
        <div className="flex items-center justify-between h-18">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.jpeg"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="text-xl font-bold text-secondary">Volt Plus</div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden tablet:flex items-center gap-6 text-secondary">
            <a href="#" className="hover:text-gray-600">
              Home
            </a>
            <a href="#" className="hover:text-gray-600">
              Places
            </a>
            <a href="#" className="hover:text-gray-600">
              Events
            </a>
            <a href="#" className="hover:text-gray-600">
              Contact
            </a>
          </nav>

          {/* Desktop Button */}
          {/*<div className="hidden tablet:block">*/}
          {/*  <button className="px-4 py-2 bg-black text-white rounded-lg">*/}
          {/*    Login*/}
          {/*  </button>*/}
          {/*</div>*/}

          {/* Mobile Menu Button */}
          <button className="tablet:hidden" onClick={() => setOpen(!open)}>
            <div className="w-6 h-5 flex flex-col justify-between text-secondary">
              <span className="block h-0.5 bg-black" />
              <span className="block h-0.5 bg-black" />
              <span className="block h-0.5 bg-black" />
            </div>
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="tablet:hidden border-t text-secondary bg-white">
          <Container>
            <nav className="flex flex-col gap-4 py-4">
              <a href="#" onClick={() => setOpen(false)}>
                Home
              </a>
              <a href="#" onClick={() => setOpen(false)}>
                Places
              </a>
              <a href="#" onClick={() => setOpen(false)}>
                Events
              </a>
              <a href="#" onClick={() => setOpen(false)}>
                Contact
              </a>

              {/*<button className="mt-2 px-4 py-2 bg-black text-white rounded-lg">*/}
              {/*  Login*/}
              {/*</button>*/}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
