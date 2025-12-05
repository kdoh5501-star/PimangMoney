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
  const { user } = useAuth();

  const [boards, setBoards] = useState<Board[]>([]);
  const [boardId, setBoardId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBoards() {
      const { data, error } = await supabase
        .from("boards")
        .select("id, name, slug")
        .eq("slug", "free")
        .order("name");
      if (error) {
        console.error(error);
        return;
      }
      if (!data || data.length === 0) {
        setBoards([]);
        return;
      }
      setBoards(data as Board[]);
      setBoardId((data[0] as Board).id);
    }

    void loadBoards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    const payload: Record<string, unknown> = {
      board_id: boardId,
      title,
      content,
      tags,
    };

    // 로그인 한 경우에는 Supabase 사용자 id를 함께 저장해서
    // 나중에 마이페이지, 닉네임 표시 등에 활용합니다.
    if (user) {
      payload.author_id = user.id;
    }

    const { error: insertError } = await supabase.from("posts").insert(payload);

    setSubmitting(false);

    if (insertError) {
      console.error(insertError);
      setError("게시글 등록에 실패했습니다.");
      return;
    }

    router.push("/community");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">글쓰기</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-sm p-6">
          {boards.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">게시판</label>
              <p className="text-sm text-gray-800 font-medium">자유게시판</p>
              <p className="text-xs text-gray-500 mt-1">현재 일반 회원은 자유게시판에만 글을 작성할 수 있습니다.</p>
            </div>
          )}

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


