"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "../AuthProvider";

type Board = {
  id: string;
  name: string;
  slug: string;
};

export default function WritePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [boards, setBoards] = useState<Board[]>([]);
  const [boardId, setBoardId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBoards() {
      const { data, error } = await supabase.from("boards").select("id, name, slug").order("name");
      if (error) {
        console.error(error);
        return;
      }
      if (!data || data.length === 0) {
        return;
      }
      setBoards(data as Board[]);
      setBoardId((data[0] as Board).id);
    }

    void loadBoards();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!boardId) {
      setError("게시판을 선택해주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const { error: insertError } = await supabase.from("posts").insert({
      board_id: boardId,
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

    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">로그인 상태를 확인하는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">글쓰기</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-sm p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">게시판</label>
            <select
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {boards.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.name}
                </option>
              ))}
            </select>
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
              태그 (쉼표로 구분, 예: 피망머니, 전략)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium disabled:opacity-60"
            >
              {submitting ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


