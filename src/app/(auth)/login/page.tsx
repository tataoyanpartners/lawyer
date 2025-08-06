"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Force a page reload to ensure middleware handles the new token properly
        window.location.href = "/admin/blog";
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);

      // In development, show the reset link
      if (data.resetLink) {
        console.log("Reset link:", data.resetLink);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <section className="h-screen grid justify-center items-center bg-white">
        <div className="w-[400px] p-8 bg-white rounded-xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 text-center">
            Վերականգնել գաղտնաբառը
          </h2>

          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-[#1e3a8a] text-sm font-medium mb-2">
                Էլ. հասցե
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#1e3a8a] focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
                placeholder="Մուտքագրեք ձեր էլ. հասցեն"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-3 rounded-lg font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Ուղարկվում է..." : "Ուղարկել վերականգնման հղումը"}
            </Button>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full text-gray-600 hover:text-[#1e3a8a] transition-colors text-sm"
            >
              Վերադառնալ մուտք
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen grid justify-center items-center bg-white">
      <div className="w-[400px] p-8 bg-white rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6 text-center">
          Ադմինիստրատորի մուտք
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#1e3a8a] text-sm font-medium mb-2">
              Էլ. հասցե
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#1e3a8a] focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
              placeholder="Մուտքագրեք ձեր էլ. հասցեն"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-[#1e3a8a] text-sm font-medium mb-2">
              Գաղտնաբառ
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#1e3a8a] focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a]"
              placeholder="Մուտքագրեք ձեր գաղտնաբառը"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#1e3a8a] hover:bg-[#1e40af] text-white py-3 rounded-lg font-medium transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Մուտք գործվում է..." : "Մուտք"}
          </Button>

          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="w-full text-gray-600 hover:text-[#1e3a8a] transition-colors text-sm"
          >
            Մոռացե՞լ եք գաղտնաբառը:
          </button>
        </form>
      </div>
    </section>
  );
}
