"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Սխալ մուտքագրման տվյալներ");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-semibold mb-6 text-secondary">Մուտք</h2>

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
          autoComplete="current-password"
          placeholder="Գաղտնաբառ"
          className="w-full border p-2 mb-3 rounded text-secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded"
        >
          Մուտք գործել
        </button>

        <p className="text-sm text-[#696984] mt-4">
          Չունե՞ք հաշիվ՝{" "}
          <a href="/signup" className="text-blue-600">
            Գրանցվել
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
