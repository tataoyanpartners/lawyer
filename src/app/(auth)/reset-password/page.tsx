"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      setError("Invalid reset link");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.error || "Password reset failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <section className="h-screen grid justify-center items-center bg-[#0A0A0A]">
        <div className="w-[400px] p-8 bg-[#1A1A1A] rounded-xl shadow-xl text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful</h2>
            <p className="text-gray-400">You will be redirected to login page in a few seconds...</p>
          </div>
          
          <Button
            onClick={() => router.push("/login")}
            className="w-full bg-[#6A49A2] hover:bg-[#5A3D92] text-white py-3 rounded-lg font-medium transition-colors"
          >
            Go to Login
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen grid justify-center items-center bg-[#0A0A0A]">
      <div className="w-[400px] p-8 bg-[#1A1A1A] rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Reset Your Password
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] rounded-lg text-white focus:outline-none focus:border-[#6A49A2] focus:ring-1 focus:ring-[#6A49A2]"
              placeholder="Enter new password (min 8 characters)"
              required
              disabled={isLoading}
              minLength={8}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#404040] rounded-lg text-white focus:outline-none focus:border-[#6A49A2] focus:ring-1 focus:ring-[#6A49A2]"
              placeholder="Confirm new password"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#6A49A2] hover:bg-[#5A3D92] text-white py-3 rounded-lg font-medium transition-colors"
            disabled={isLoading || !token}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full text-[#9A9A9A] hover:text-white transition-colors text-sm"
          >
            Back to Login
          </button>
        </form>
      </div>
    </section>
  );
}