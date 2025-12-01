"use client";

// 피망 커뮤니티 자유게시판 메인 페이지

import Link from "next/link";
import { Search, Flame, Clock, TrendingUp, Megaphone, Eye, ThumbsUp, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./AuthProvider";

type Category = "베스트" | "공지" | "자유" | "꿀팁";

type Post = {
  id: string;
  category: Category;
  title: string;
  content: string;
  tags: string[];
  author: string;
  time: string;
  views: number;
  likes: number;
  comments: number;
};
type RecentComment = {
  id: string;
  text: string;
  time: string;
};

type PopularTag = {
  name: string;
  count: number;
};

type TabId = "all" | "notice" | "free" | "tip";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "전체글" },
  { id: "notice", label: "공지" },
  { id: "free", label: "자유" },
  { id: "tip", label: "꿀팁" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [recentComments, setRecentComments] = useState<RecentComment[]>([]);
  const [popularTags, setPopularTags] = useState<PopularTag[]>([]);
  const { user, loading, isAdmin, signOut } = useAuth();

  useEffect(() => {
    async function loadPosts() {
      setPostsLoading(true);
      setPostsError(null);

      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id,
          title,
          content,
          tags,
          view_count,
          like_count,
          comment_count,
          created_at,
          boards (
            slug
          )
        `,
        )
        .eq("boards.slug", "free")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setPostsError("게시글을 불러오지 못했습니다.");
        setPostsLoading(false);
        return;
      }

      type Row = {
        id: string;
        title: string;
        content: string;
        tags: string[] | null;
        view_count: number | null;
        like_count: number | null;
        comment_count: number | null;
        created_at: string;
        boards: { slug: string | null }[] | null;
      };

      const mapCategory = (slug: string | null | undefined): Category => {
        switch (slug) {
          case "notice":
            return "공지";
          case "tips":
            return "꿀팁";
          case "free":
            return "자유";
          case "best":
            return "베스트";
          default:
            return "자유";
        }
      };

      const formatRelativeTime = (iso: string): string => {
        const created = new Date(iso);
        const diffMs = Date.now() - created.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);
        if (diffMinutes < 1) return "방금 전";
        if (diffMinutes < 60) return `${diffMinutes}분 전`;
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours}시간 전`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}일 전`;
        return created.toLocaleDateString("ko-KR");
      };

      const mapped: Post[] = (data as Row[]).map((row) => {
        const firstBoard = row.boards?.[0] ?? null;

        return {
          id: row.id,
          category: mapCategory(firstBoard?.slug ?? null),
          title: row.title,
          content: row.content,
          tags: row.tags ?? [],
          author: "익명",
          time: formatRelativeTime(row.created_at),
          views: row.view_count ?? 0,
          likes: row.like_count ?? 0,
          comments: row.comment_count ?? 0,
        };
      });

      setPosts(mapped);
      setPostsLoading(false);
    }

    void loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    switch (activeTab) {
      case "notice":
        return post.category === "공지";
      case "free":
        return post.category === "자유";
      case "tip":
        return post.category === "꿀팁";
      case "all":
      default:
        return true;
    }
  });

  useEffect(() => {
    async function loadSidebar() {
      // 최근 댓글 10개
      const { data: commentRows } = await supabase
        .from("comments")
        .select("id, content, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      const toRelativeTime = (iso: string): string => {
        const created = new Date(iso);
        const diffMs = Date.now() - created.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);
        if (diffMinutes < 1) return "방금 전";
        if (diffMinutes < 60) return `${diffMinutes}분 전`;
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours}시간 전`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays}일 전`;
        return created.toLocaleDateString("ko-KR");
      };

      setRecentComments(
        (commentRows ?? []).map((row) => ({
          id: row.id,
          text: row.content,
          time: toRelativeTime(row.created_at),
        })),
      );

      // 인기 태그 (최근 200개 글 기준 상위 20개)
      const { data: tagRows } = await supabase
        .from("posts")
        .select("tags, created_at")
        .order("created_at", { ascending: false })
        .limit(200);

      const counts = new Map<string, number>();
      (tagRows ?? []).forEach((row) => {
        (row.tags ?? []).forEach((tag: string) => {
          const trimmed = tag.trim();
          if (!trimmed) return;
          counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
        });
      });

      const popular: PopularTag[] = Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([name, count]) => ({
          name: `#${name}`,
          count,
        }));

      setPopularTags(popular);
    }

    void loadSidebar();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2c3e50] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold">
                <span className="text-orange-500">피망</span> 커뮤니티
              </h1>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <Link href="/" className="hover:text-orange-500 transition">
                  홈
                </Link>
                <Link href="/" className="hover:text-orange-500 transition">
                  자유게시판
                </Link>
                <Link href="/qna" className="hover:text-orange-500 transition">
                  Q&A
                </Link>
                <Link href="/tips" className="hover:text-orange-500 transition">
                  꿀팁
                </Link>
                <Link href="/money-guide" className="hover:text-orange-500 transition">
                  피망머니 가이드
                </Link>
                <Link href="/poker-guide" className="hover:text-orange-500 transition">
                  포커 가이드
                </Link>
              </nav>
            </div>

            {/* Search & Auth */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="검색"
                  className="pl-10 pr-4 py-2 bg-[#34495e] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                />
              </div>
              {loading ? (
                <div className="h-9 px-4 rounded-lg bg-[#34495e] animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="hidden md:inline-block text-sm text-yellow-300 hover:text-yellow-200"
                    >
                      관리자
                    </Link>
                  )}
                  <Link
                    href="/me"
                    className="hidden md:inline-block text-sm text-gray-200 hover:text-orange-300"
                  >
                    마이페이지
                  </Link>
                  <Link
                    href="/write"
                    className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    글쓰기
                  </Link>
                  <span className="text-sm text-gray-200">
                    {user.user_metadata?.nickname ?? user.email}
                  </span>
                  <button
                    type="button"
                    onClick={async () => {
                      await signOut();
                    }}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="bg-transparent border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-4">
              <div className="flex items-center gap-2 p-4 border-b">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      activeTab === tab.id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab.id === "all" && <Flame className="w-4 h-4" />}
                    {tab.id === "notice" && <Megaphone className="w-4 h-4" />}
                    {tab.id === "free" && <Clock className="w-4 h-4" />}
                    {tab.id === "tip" && <TrendingUp className="w-4 h-4" />}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {postsLoading && (
                <div className="bg-white rounded-lg shadow-sm p-5 text-center text-sm text-gray-500">
                  게시글을 불러오는 중입니다...
                </div>
              )}
              {postsError && !postsLoading && (
                <div className="bg-white rounded-lg shadow-sm p-5 text-center text-sm text-red-500">
                  {postsError}
                </div>
              )}
              {!postsLoading && !postsError && filteredPosts.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-5 text-center text-sm text-gray-500">
                  아직 등록된 게시글이 없습니다. 첫 번째 글을 작성해 보세요!
                </div>
              )}
              {!postsLoading &&
                !postsError &&
                filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition">
                    {/* Category Badge */}
                    <div className="flex items-start gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          post.category === "베스트"
                            ? "bg-orange-500 text-white"
                            : post.category === "공지"
                            ? "bg-red-500 text-white"
                            : post.category === "자유"
                            ? "bg-blue-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {post.category}
                      </span>
                      <div className="flex-1">
                        <Link
                          href={`/posts/${post.id}`}
                          className="text-lg font-semibold text-gray-900 mb-1 hover:text-orange-500 cursor-pointer line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <p className="text-sm text-gray-600 mb-3">{post.content}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs text-orange-500 hover:underline cursor-pointer">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{post.author}</span>
                          <span>{post.time}</span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {post.likes}
                          </div>
                          <div className="flex items-center gap-1 text-orange-500">
                            <MessageSquare className="w-3 h-3" />
                            {post.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-4">
            {/* Recent Comments */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                실시간 댓글
              </h3>
              <div className="space-y-3">
                {recentComments.map((comment, idx) => (
                  <div key={idx} className="text-sm border-b pb-3 last:border-b-0">
                    <p className="text-gray-900 mb-1 line-clamp-1 hover:text-orange-500 cursor-pointer">
                      {comment.text}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{comment.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                인기 태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, idx) => (
                  <button
                    key={idx}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-orange-50 rounded-full text-sm transition border border-transparent hover:border-orange-200"
                  >
                    <span className="text-orange-500 font-medium">{tag.name}</span>{" "}
                    <span className="text-gray-500 text-xs">{tag.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ad Banner */}
            <div className="bg-white rounded-lg shadow-sm p-8 text-center border-2 border-dashed border-gray-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎮</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">만 19세 미만 이용불가</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                본 사이트는 게임머니 실물 재산 추구하며,
                성인만 입장하시길 주구합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

