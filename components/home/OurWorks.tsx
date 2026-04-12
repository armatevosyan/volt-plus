"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/Container";

const FALLBACK = [
  {
    name: "Լուսինե Մարտիրոսյան",
    text: "Բնակարանի կապիտալ վերանորոգում՝ նոր էլեկտրականցումով և մանրահատակով։ Թիմը ճշգրիտ էր, աղբը հավաքվեց ամեն օր։",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Գագիկ Սարգսյան",
    text: "Առանձնատան հիմքի և ստորգետնյա հարկի աշխատանքները ավարտվեցին ժամանակին։ Խորհուրդներ տվեցին նյութերի ընտրության հարցում։",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Նարինե Հարությունյան",
    text: "Գրասենյակային տարածքի վերանորոգում. պատերի տափաստեղն, ձայնամեկուսացում և լուսավորության նախագիծ։ Պրոֆեսիոնալ մոտեցում։",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Վահե Գևորգյան",
    text: "Տանիքի նորոգում և ջրամեկուսացում. ձմռանը խնդիր չունենք։ Պայմանագրով ամեն ինչ թափանցիկ էր։",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Անի Դավթյան",
    text: "Նոր շենքի ներքին աղբյուրներ և սանտեխնիկա. աշխատանքը ստուգվեց հանձնելիս, երաշխիքային ժամկետը նշված էր փաստաթղթում։",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
];

type WorkApi = {
  title: string;
  description: string | null;
  imageUrls: string[];
};

export default function OurWorksSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState(FALLBACK);
  const [sourceDb, setSourceDb] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/works");
        if (!res.ok) return;
        const data = (await res.json()) as WorkApi[];
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        setProjects(
          data.map((w) => ({
            name: w.title,
            text: w.description ?? "",
            image: w.imageUrls[0] ?? "/hero.png",
          })),
        );
        setSourceDb(true);
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
      id="works"
      className="scroll-mt-24 w-full h-full bg-white tablet:py-24 py-16 relative"
    >
      <Container className="">
        <h2 className="text-3xl font-semibold text-gray-800 mb-10">
          Մեր կատարած աշխատանքներից
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-teal-400 text-white p-3 rounded-full shadow-lg"
          >
            <ChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar flex-1"
          >
            {projects.map((item, index) => (
              <div
                key={sourceDb ? `${item.name}-${index}` : index}
                className="min-w-75 max-w-75 bg-[D#9D9D9] border border-[#D9D9D9] rounded-2xl shadow-md p-3 text-start"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full rounded-md object-cover mb-4 aspect-video"
                />
                <h3 className="font-medium tablet:text-lg text-base text-[#252641]">
                  {item.name}
                </h3>
                {item.text ? (
                  <p className="text-[#696984] mt-3 text-xs tablet:text-sm leading-relaxed">
                    {item.text}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-teal-400 text-white p-3 rounded-full shadow-lg"
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
