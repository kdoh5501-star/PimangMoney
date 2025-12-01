"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "../../AuthProvider";
import { MessageSquare } from "lucide-react";

type PostDetail = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const postId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";

  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    async function loadPost() {
      setLoadingPost(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, created_at")
        .eq("id", postId)
        .single();

      if (error) {
        console.error(error);
        setError("게시글을 불러오지 못했습니다.");
        setLoadingPost(false);
        return;
      }

      setPost({
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: new Date(data.created_at).toLocaleString("ko-KR"),
      });
      setLoadingPost(false);
    }

    async function loadComments() {
      setLoadingComments(true);
      const { data, error } = await supabase
        .from("comments")
        .select("id, content, created_at")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        setLoadingComments(false);
        return;
      }

      setComments(
        (data ?? []).map((row) => ({
          id: row.id,
          content: row.content,
          createdAt: new Date(row.created_at).toLocaleString("ko-KR"),
        })),
      );
      setLoadingComments(false);
    }

    void loadPost();
    void loadComments();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !postId || !commentInput.trim()) return;

    setSubmittingComment(true);
    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      author_id: user.id,
      content: commentInput.trim(),
    });
    setSubmittingComment(false);

    if (error) {
      console.error(error);
      return;
    }

    setCommentInput("");

    const { data } = await supabase
      .from("comments")
      .select("id, content, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    setComments(
      (data ?? []).map((row) => ({
        id: row.id,
        content: row.content,
        createdAt: new Date(row.created_at).toLocaleString("ko-KR"),
      })),
    );
  };

  if (!postId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">잘못된 게시글 주소입니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-gray-600 hover:text-orange-500 mb-4"
        >
          ← 뒤로가기
        </button>

        {loadingPost ? (
          <div className="bg-white rounded-xl shadow-sm p-6">게시글을 불러오는 중입니다...</div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-sm text-red-500">{error}</div>
        ) : post ? (
          <article className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
            <p className="text-xs text-gray-500 mb-4">{post.createdAt}</p>
            <div className="text-sm text-gray-800 whitespace-pre-wrap">{post.content}</div>
          </article>
        ) : null}

        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            댓글
          </h2>

          {loadingComments ? (
            <p className="text-sm text-gray-500 mb-4">댓글을 불러오는 중입니다...</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-500 mb-4">첫 번째 댓글을 남겨보세요!</p>
          ) : (
            <div className="space-y-3 mb-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b pb-3 last:border-b-0">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap mb-1">{comment.content}</p>
                  <p className="text-xs text-gray-500">{comment.createdAt}</p>
                </div>
              ))}
            </div>
          )}

          {loading ? (
            <p className="text-sm text-gray-500">로그인 상태를 확인하는 중입니다...</p>
          ) : !user ? (
            <p className="text-sm text-gray-500">
              댓글을 작성하려면 로그인해주세요.
            </p>
          ) : (
            <form onSubmit={handleSubmitComment} className="space-y-2 mt-2">
              <textarea
                rows={3}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="댓글을 입력하세요..."
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submittingComment || !commentInput.trim()}
                  className="px-4 py-2 rounded-lg text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium disabled:opacity-60"
                >
                  {submittingComment ? "작성 중..." : "댓글 작성"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}


