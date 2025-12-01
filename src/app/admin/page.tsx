"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "../AuthProvider";

type AdminBoard = {
  id: string;
  slug: string;
  name: string;
};

type AdminTab = "notice" | "tips";

export default function AdminPage() {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  const [boards, setBoards] = useState<AdminBoard[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>("notice");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/");
    }
  }, [loading, user, isAdmin, router]);

  useEffect(() => {
    async function loadBoards() {
      const { data, error } = await supabase
        .from("boards")
        .select("id, slug, name")
        .in("slug", ["notice", "tips"]);

      if (error) {
        console.error(error);
        return;
      }

      setBoards((data ?? []) as AdminBoard[]);
    }

    void loadBoards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;

    setError(null);
    setMessage(null);

    const board = boards.find((b) => b.slug === activeTab);
    if (!board) {
      setError("해당 게시판 정보를 불러오지 못했습니다.");
      return;
    }

    setSubmitting(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error: insertError } = await supabase.from("posts").insert({
      board_id: board.id,
      author_id: user.id,
      title,
      content,
      tags,
    });

    setSubmitting(false);

    if (insertError) {
      console.error(insertError);
      setError("게시글 등록에 실패했습니다.");
      return;
    }

    setTitle("");
    setContent("");
    setTagsInput("");
    setMessage("게시글이 등록되었습니다.");
  };

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">관리자 권한을 확인하는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">관리자 페이지</h1>
        <p className="text-sm text-gray-600 mb-6">
          공지 및 꿀팁 게시판에 올라갈 글을 작성할 수 있는 관리자 전용 페이지입니다.
        </p>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab("notice")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "notice" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-600"
              }`}
            >
              공지 작성
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tips")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "tips" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-600"
              }`}
            >
              꿀팁 작성
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">게시판</label>
              <p className="text-sm text-gray-800 font-semibold">
                {activeTab === "notice" ? "공지 게시판" : "꿀팁 게시판"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
              <textarea
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                태그 (쉼표로 구분, 예: 공지, 이벤트)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                홈으로
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 rounded-lg text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium disabled:opacity-60"
              >
                {submitting ? "등록 중..." : "게시글 등록"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


