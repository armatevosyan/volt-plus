"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Սխալ");
        return;
      }
      router.push("/login");
    } catch {
      setError("Կապի խնդիր");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-semibold mb-6 text-secondary">Գրանցում</h2>

        <input
          type="text"
          autoComplete="username"
          placeholder="Օգտանուն"
          className="w-full border p-2 mb-3 rounded text-secondary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          autoComplete="new-password"
          placeholder="Գաղտնաբառ"
          className="w-full border p-2 mb-3 rounded text-secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="button"
          disabled={loading}
          onClick={handleSignup}
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Սպասեք…" : "Ստեղծել հաշիվ"}
        </button>

        <p className="text-sm mt-4 text-secondary">
          Արդեն ունե՞ք հաշիվ՝{" "}
          <a href="/login" className="text-blue-600">
            Մուտք
          </a>
        </p>
      </div>
    </div>
  );
}
