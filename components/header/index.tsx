"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { usePathname } from "next/navigation";

export default function Header() {
  const url = usePathname();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (url === "/login" || url === "/signup" || url === "/admin") return;

  const navClass = "hover:text-gray-600 transition-colors";

  return (
    <div
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
          <Link href="/#hero" className="flex items-center gap-2 text-secondary">
            <Image
              src="/logo.jpeg"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="text-xl font-bold">Volt Plus</div>
          </Link>

          <nav className="hidden tablet:flex items-center gap-4 laptop:gap-6 text-secondary text-sm laptop:text-base flex-wrap justify-end max-w-xl laptop:max-w-none">
            <Link href="/#hero" className={navClass}>
              Գլխավոր
            </Link>
            <Link href="/#services" className={navClass}>
              Ծառայություններ
            </Link>
            <Link href="/#products" className={navClass}>
              Ապրանքներ
            </Link>
            <Link href="/#reviews" className={navClass}>
              Կարծիքներ
            </Link>
            <Link href="/#news" className={navClass}>
              Լուրեր
            </Link>
            <Link href="/#works" className={navClass}>
              Նախագծեր
            </Link>
            <Link href="/#contact" className={navClass}>
              Կապ
            </Link>
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
              <Link href="/#hero" className={navClass} onClick={() => setOpen(false)}>
                Գլխավոր
              </Link>
              <Link href="/#services" className={navClass} onClick={() => setOpen(false)}>
                Ծառայություններ
              </Link>
              <Link href="/#products" className={navClass} onClick={() => setOpen(false)}>
                Ապրանքներ
              </Link>
              <Link href="/#reviews" className={navClass} onClick={() => setOpen(false)}>
                Կարծիքներ
              </Link>
              <Link href="/#news" className={navClass} onClick={() => setOpen(false)}>
                Լուրեր
              </Link>
              <Link href="/#works" className={navClass} onClick={() => setOpen(false)}>
                Նախագծեր
              </Link>
              <Link href="/#contact" className={navClass} onClick={() => setOpen(false)}>
                Կապ
              </Link>

              {/*<button className="mt-2 px-4 py-2 bg-black text-white rounded-lg">*/}
              {/*  Login*/}
              {/*</button>*/}
            </nav>
          </Container>
        </div>
      )}
    </div>
  );
}
