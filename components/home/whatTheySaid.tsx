"use client";

import Container from "@/components/Container";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const MIN_LEN = 10;

export default function Testimonial() {
  const dialogId = useId();
  const titleId = useId();
  const authorInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState<number | null>(5);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    successRef.current = success;
  }, [success]);

  const close = useCallback(() => {
    if (successRef.current) {
      setAuthor("");
      setContent("");
      setRating(5);
    }
    setOpen(false);
    setError("");
    setSubmitting(false);
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    setSuccess(false);
    setError("");
    setSubmitting(false);

    const t = requestAnimationFrame(() => {
      authorInputRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const resetForm = () => {
    setAuthor("");
    setContent("");
    setRating(5);
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = content.trim();
    if (trimmed.length < MIN_LEN) {
      setError(`Նվազագույն ${MIN_LEN} նիշ`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: trimmed,
          author: author.trim() || undefined,
          rating: rating ?? undefined,
        }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Չհաջողվեց ուղարկել");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Կապի խնդիր, փորձեք ավելի ուշ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="scroll-mt-24 bg-white text-white">
      <Container className="py-16">
        <div className="grid gap-12 laptop:grid-cols-2 items-center">
          <div>
            <p className="text-sm tracking-widest text-[#696984] mb-4">
              — ԿԱՐԾԻՔՆԵՐ
            </p>

            <h2 className="text-3xl tablet:text-4xl laptop:text-5xl font-bold text-[#2F327D] mb-6">
              Ինչ են ասում մեր գործընկերները
            </h2>

            <div className="space-y-4 text-[#696984] max-w-md">
              <p>
                Մեր հավատարիմ հաճախորդները գնահատում են պատասխանատվությունը,
                մանրամասն պլանավորումը և աշխատանքի որակը։
              </p>
              <p>
                Յուրաքանչյուր նախագծում նպատակ ունենք ապահովել անվտանգություն,
                էներգաարդյունավետ լուծումներ և երկարաժամկետ արդյունք։
              </p>
              <p>Միացե՛ք նրանց, ովքեր արդեն աշխատում են մեզ հետ։</p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="cursor-pointer mt-8 flex items-center gap-4 border border-teal-400 text-teal-400 px-6 py-3 rounded-full hover:bg-teal-400 hover:text-black transition"
            >
              Թողնել կարծիք
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-teal-400">
                →
              </span>
            </button>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/testimonials.png"
                alt="Շինարարություն"
                width={500}
                height={821}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="absolute -bottom-10 left-6 right-6 bg-white text-gray-700 rounded-2xl p-6 shadow-xl">
              <div className="border-l-2 border-orange-400 pl-4">
                <p className="text-sm leading-relaxed">
                  «Volt Plus-ը կազմակերպեց ամբողջ շինարարական պրոցեսը՝ նախագիծից
                  մինչև շահագործման հանձնում։ Ժամանակացույցին մնացինք, արդյունքը
                  գերազանցեց ակնկալիքները։ Սիրտ լցված է շնորհակալությամբ։»
                </p>
              </div>

              <div className="flex items-center justify-between mt-6">
                <p className="font-medium">Արմեն Պետրոսյան</p>

                <div className="text-right">
                  <div className="text-orange-400">★★★★★</div>
                  <p className="text-xs text-gray-500">Բնակելի նախագիծ, Երևան</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Փակել"
            className="absolute inset-0 bg-[#2F327D]/40 backdrop-blur-[2px] cursor-default"
            onClick={close}
          />

          <div
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg rounded-2xl bg-white text-[#2F327D] shadow-2xl shadow-teal-900/10 border border-teal-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 via-teal-500 to-orange-400" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h3 id={titleId} className="text-xl sm:text-2xl font-bold leading-tight">
                  Ձեր կարծիքը կարևոր է մեզ համար
                </h3>
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 -mt-1 -mr-1 w-10 h-10 rounded-full flex items-center justify-center text-[#696984] hover:bg-teal-50 hover:text-[#2F327D] transition cursor-pointer text-xl leading-none"
                  aria-label="Փակել պատուհանը"
                >
                  ×
                </button>
              </div>

              {success ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 text-teal-500 text-2xl mb-4">
                    ✓
                  </div>
                  <p className="text-[#696984] mb-6">
                    Շնորհակալություն։ Ձեր կարծիքը պահպանվել է և կօգնի մեզ ավելի լավ
                    ծառայություն մատուցել։
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setOpen(false);
                      }}
                      className="cursor-pointer px-6 py-3 rounded-full border border-[#696984]/30 text-[#696984] hover:bg-gray-50 transition"
                    >
                      Փակել
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                      }}
                      className="cursor-pointer px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition"
                    >
                      Մեկ այլ կարծիք
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="review-author"
                      className="block text-sm font-medium text-[#696984] mb-1.5"
                    >
                      Անուն (ըստ ցանկության)
                    </label>
                    <input
                      ref={authorInputRef}
                      id="review-author"
                      type="text"
                      autoComplete="name"
                      maxLength={120}
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#2F327D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-teal-400"
                      placeholder="Օրինակ՝ Արմեն Պետրոսյան"
                    />
                  </div>

                  <div>
                    <span className="block text-sm font-medium text-[#696984] mb-1.5">
                      Գնահատական
                    </span>
                    <div className="flex gap-1" role="group" aria-label="Աստղերի գնահատական">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`cursor-pointer text-2xl leading-none p-1 rounded transition ${
                            rating !== null && star <= rating
                              ? "text-orange-400"
                              : "text-gray-300 hover:text-orange-200"
                          }`}
                          aria-pressed={rating === star || (rating !== null && star <= rating)}
                          aria-label={`${star} աստղ`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="review-content"
                      className="block text-sm font-medium text-[#696984] mb-1.5"
                    >
                      Ձեր կարծիքը
                    </label>
                    <textarea
                      id="review-content"
                      required
                      rows={5}
                      maxLength={4000}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#2F327D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-teal-400 resize-y min-h-[120px]"
                      placeholder="Նկարագրեք ձեր փորձը մեզ հետ աշխատելիս…"
                    />
                    <p className="text-xs text-[#696984]/80 mt-1.5">
                      Նվազագույն {MIN_LEN} նիշ · {content.trim().length}/4000
                    </p>
                  </div>

                  {error ? (
                    <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
                    <button
                      type="button"
                      onClick={close}
                      className="cursor-pointer px-6 py-3 rounded-full border border-gray-200 text-[#696984] hover:bg-gray-50 transition"
                    >
                      Չեղարկել
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="cursor-pointer px-6 py-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Ուղարկում…" : "Ուղարկել կարծիքը"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
