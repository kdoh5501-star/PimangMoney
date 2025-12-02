"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      const message =
        signInError.message.toLowerCase().includes("invalid login credentials") ||
        signInError.message.toLowerCase().includes("invalid email or password")
          ? "이메일 또는 비밀번호가 올바르지 않습니다."
          : signInError.message;
      setError(message);
      return;
    }

    router.push("/community");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          피망 커뮤니티 로그인
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          아직 계정이 없으신가요?{" "}
          <a
            href="/signup"
            className="text-orange-500 hover:underline"
          >
            회원가입 하기
          </a>
        </p>
      </div>
    </div>
  );
}


