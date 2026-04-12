"use client";

import Container from "@/components/Container";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export default function Hero() {
  const titleId = useId();
  const dialogId = useId();
  const phoneRef = useRef<HTMLInputElement>(null);
  const successRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    successRef.current = success;
  }, [success]);

  const close = useCallback(() => {
    if (successRef.current) {
      setPhone("");
      setEmail("");
      setComment("");
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
      phoneRef.current?.focus();
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
    setPhone("");
    setEmail("");
    setComment("");
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim(),
          email: email.trim(),
          comment: comment.trim() || undefined,
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
    <section id="hero" className="scroll-mt-24 bg-[#9DCCFF] mt-24">
      <Container className="py-12 tablet:py-20">
        <div className="grid gap-10 laptop:grid-cols-2 items-center">
          <div>
            <p className="text-sm text-black mb-4">
              <span className="text-primary font-medium">Volt Plus</span>՝{" "}
              որակյալ շինարարություն Հայաստանում
            </p>

            <h1 className="text-3xl tablet:text-4xl laptop:text-5xl font-bold text-[#2b2d4a] leading-tight">
              Բնակելի և արտադրական օբյեկտերի կառուցում՝ վստահելի նյուտեղից մինչև
              հանձնում
            </h1>

            <p className="mt-6 text-[#696984] max-w-xl">
              Մենք իրականացնում ենք շինարարություն, վերանորոգում և ինժեներական
              աջակցություն՝ հստակ ժամկետներով, թափանցիկ համագործակցությամբ և
              արդի նյութերով։
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="cursor-pointer mt-8 px-6 py-3 bg-primary text-white hover:bg-[#3da8aa] rounded-xl font-medium hover:opacity-90 transition"
            >
              Ստանալ առաջարկ
            </button>
          </div>

          <div>
            <img
              src="/hero.png"
              alt="Շինարարական աշխատանքներ"
              className="w-full h-auto rounded-2xl object-cover"
            />
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
            className="absolute inset-0 bg-[#2b2d4a]/45 backdrop-blur-[2px] cursor-default"
            onClick={close}
          />

          <div
            id={dialogId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg rounded-2xl bg-white text-[#2b2d4a] shadow-2xl border border-[#9DCCFF]/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-primary to-[#9DCCFF]" />

            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h2 id={titleId} className="text-xl sm:text-2xl font-bold leading-tight">
                  Ստանալ առաջարկ
                </h2>
                <button
                  type="button"
                  onClick={close}
                  className="shrink-0 -mt-1 -mr-1 w-10 h-10 rounded-full flex items-center justify-center text-[#696984] hover:bg-[#9DCCFF]/25 hover:text-[#2b2d4a] transition cursor-pointer text-xl leading-none"
                  aria-label="Փակել պատուհանը"
                >
                  ×
                </button>
              </div>

              {success ? (
                <div className="text-center py-2">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 text-primary text-2xl mb-4">
                    ✓
                  </div>
                  <p className="text-[#696984] mb-6">
                    Շնորհակալություն։ Ձեր հայտը ընդունվել է, մեր մասնագետը կկապվի ձեզ հետ։
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setOpen(false);
                      }}
                      className="cursor-pointer px-6 py-3 rounded-full border border-gray-200 text-[#696984] hover:bg-gray-50 transition"
                    >
                      Փակել
                    </button>
                    <button
                      type="button"
                      onClick={() => resetForm()}
                      className="cursor-pointer px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition"
                    >
                      Նոր հայտ
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="offer-phone" className="block text-sm font-medium text-[#696984] mb-1.5">
                      Հեռախոսահամար <span className="text-red-500">*</span>
                    </label>
                    <input
                      ref={phoneRef}
                      id="offer-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      maxLength={32}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+374 XX XXX XXX"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#2b2d4a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="offer-email" className="block text-sm font-medium text-[#696984] mb-1.5">
                      Էլ. փոստ <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="offer-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#2b2d4a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="offer-comment" className="block text-sm font-medium text-[#696984] mb-1.5">
                      Մեկնաբանություն
                    </label>
                    <textarea
                      id="offer-comment"
                      rows={4}
                      maxLength={2000}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Նախագծի մասին կարճ տեղեկություն, մոտավոր նպատակներ…"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[#2b2d4a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-y min-h-[100px]"
                    />
                    <p className="text-xs text-[#696984]/80 mt-1">{comment.length}/2000</p>
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
                      className="cursor-pointer px-6 py-3 rounded-full bg-primary text-white hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Ուղարկում…" : "Ուղարկել հայտը"}
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
