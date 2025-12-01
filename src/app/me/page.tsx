"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "../AuthProvider";

type MyPost = {
  id: string;
  title: string;
  boardName: string;
  createdAt: string;
};

type MyComment = {
  id: string;
  postId: string;
  postTitle: string;
  content: string;
  createdAt: string;
};

type Tab = "posts" | "comments";

export default function MePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const [myPosts, setMyPosts] = useState<MyPost[]>([]);
  const [myComments, setMyComments] = useState<MyComment[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;

    async function loadMyPosts() {
      setLoadingPosts(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, created_at, boards ( name )")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoadingPosts(false);
        return;
      }

      setMyPosts(
        (data ?? []).map((row) => ({
          id: row.id,
          title: row.title,
          boardName: row.boards?.name ?? "게시판",
          createdAt: new Date(row.created_at).toLocaleString("ko-KR"),
        })),
      );
      setLoadingPosts(false);
    }

    async function loadMyComments() {
      setLoadingComments(true);
      const { data, error } = await supabase
        .from("comments")
        .select("id, content, created_at, post_id, posts ( title )")
        .eq("author_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoadingComments(false);
        return;
      }

      setMyComments(
        (data ?? []).map((row) => ({
          id: row.id,
          postId: row.post_id,
          postTitle: row.posts?.title ?? "삭제된 게시글",
          content: row.content,
          createdAt: new Date(row.created_at).toLocaleString("ko-KR"),
        })),
      );
      setLoadingComments(false);
    }

    void loadMyPosts();
    void loadMyComments();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">로그인 상태를 확인하는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <p className="text-sm text-gray-700 mb-1">
            닉네임: <span className="font-semibold">{user.user_metadata?.nickname ?? "설정되지 않음"}</span>
          </p>
          <p className="text-sm text-gray-700 mb-1">
            이메일: <span className="font-semibold">{user.email}</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            아래에서 내가 작성한 글과 댓글을 확인할 수 있습니다.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => setActiveTab("posts")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "posts" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-600"
              }`}
            >
              내가 쓴 글
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("comments")}
              className={`flex-1 py-3 text-sm font-medium ${
                activeTab === "comments" ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-600"
              }`}
            >
              내가 쓴 댓글
            </button>
          </div>

          <div className="p-6">
            {activeTab === "posts" ? (
              <>
                {loadingPosts ? (
                  <p className="text-sm text-gray-500">내가 쓴 글을 불러오는 중입니다...</p>
                ) : myPosts.length === 0 ? (
                  <p className="text-sm text-gray-500">아직 작성한 글이 없습니다.</p>
                ) : (
                  <ul className="space-y-3">
                    {myPosts.map((post) => (
                      <li key={post.id} className="border-b last:border-b-0 pb-3">
                        <Link
                          href={`/posts/${post.id}`}
                          className="text-sm font-semibold text-gray-900 hover:text-orange-500"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {post.boardName} · {post.createdAt}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                {loadingComments ? (
                  <p className="text-sm text-gray-500">내가 쓴 댓글을 불러오는 중입니다...</p>
                ) : myComments.length === 0 ? (
                  <p className="text-sm text-gray-500">아직 작성한 댓글이 없습니다.</p>
                ) : (
                  <ul className="space-y-3">
                    {myComments.map((comment) => (
                      <li key={comment.id} className="border-b last:border-b-0 pb-3">
                        <Link
                          href={`/posts/${comment.postId}`}
                          className="text-xs text-orange-500 hover:underline"
                        >
                          {comment.postTitle}
                        </Link>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap mt-1">{comment.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{comment.createdAt}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


