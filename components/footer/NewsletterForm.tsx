"use client";

import { useState } from "react";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim().toLowerCase());
}

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) {
      setStatus("err");
      setMessage("Մուտքագրեք վավեր էլ. հասցե");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/email-subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setStatus("err");
        setMessage(typeof data.error === "string" ? data.error : "Չհաջողվեց");
        return;
      }
      setStatus("ok");
      setMessage(typeof data.message === "string" ? data.message : "Շնորհակալություն։");
    } catch {
      setStatus("err");
      setMessage("Կապի խնդիր, փորձեք ավելի ուշ");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-10 w-full max-w-xl mx-auto">
      <div className="flex flex-col mobile:flex-row items-stretch mobile:items-center justify-center gap-4">
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Ձեր էլ․ փոստի հասցեն"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setMessage("");
            }
          }}
          disabled={status === "loading"}
          className="w-full mobile:w-[350px] mobile:flex-1 px-5 py-3 rounded-full bg-transparent border border-gray-500 placeholder:text-gray-400 outline-none text-white disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-full bg-teal-400 text-white font-medium hover:opacity-90 transition disabled:opacity-60 cursor-pointer shrink-0"
        >
          {status === "loading" ? "Ուղարկում…" : "Բաժանորդագրվել"}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-3 text-center text-sm ${status === "ok" ? "text-teal-300" : "text-red-400"}`}
          role={status === "err" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
