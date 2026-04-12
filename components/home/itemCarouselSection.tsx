"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/Container";
import { formatPriceDramOptional } from "@/lib/format-price";

export type LandingCarouselItem = {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  imageUrl: string | null;
};

export default function ItemCarouselSection({
  id,
  eyebrow,
  heading,
  intro,
  items,
  sectionClassName,
  cardBgClass,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  intro: string;
  items: LandingCarouselItem[];
  sectionClassName: string;
  cardBgClass: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) {
    return null;
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id={id}
      className={`${id ? "scroll-mt-24 " : ""}py-12 tablet:py-16 relative ${sectionClassName}`}
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-sm tracking-widest text-primary font-medium mb-3">{eyebrow}</p>
          <h2 className="text-3xl tablet:text-4xl font-bold text-[#2b2d4a] mb-4">{heading}</h2>
          <p className="text-secondary text-lg">{intro}</p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Նախորդ"
            className="absolute -left-2 tablet:-left-5 top-1/2 -translate-y-1/2 z-10 bg-teal-400 text-white p-3 rounded-full shadow-lg"
          >
            <ChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar flex-1 pb-2"
          >
            {items.map((item) => {
              const priceLabel = formatPriceDramOptional(item.price);
              return (
                <article
                  key={item.id}
                  className={`min-w-75 max-w-75 shrink-0 border border-[#D9D9D9] rounded-2xl shadow-md p-3 text-start ${cardBgClass} flex flex-col`}
                >
                  {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full rounded-md object-cover mb-4 aspect-video"
                    />
                  ) : (
                    <div className="w-full rounded-md mb-4 aspect-video bg-gray-100 flex items-center justify-center text-gray-400 text-xs px-2">
                    Առանց պատկերի
                    </div>
                  )}
                  <h3 className="font-medium tablet:text-lg text-base text-[#252641]">{item.title}</h3>
                  {item.description ? (
                    <p className="text-[#696984] mt-1 text-xs tablet:text-sm leading-relaxed line-clamp-4 text-left">
                      {item.description}
                    </p>
                  ) : null}
                  {priceLabel ? (
                    <p className="text-primary font-medium mt-auto pt-3 text-sm">{priceLabel}</p>
                  ) : null}
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Հաջորդ"
            className="absolute -right-2 tablet:right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-teal-400 text-white p-3 rounded-full shadow-lg"
          >
            <ChevronRight />
          </button>
        </div>
      </Container>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
