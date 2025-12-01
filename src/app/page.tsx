"use client";

import Link from "next/link";
import { Search, Flame, Clock, TrendingUp, Megaphone, Eye, ThumbsUp, MessageSquare } from "lucide-react";
import { useState } from "react";

type Post = {
  id: number;
  category: "베스트" | "공지" | "자유" | "꿀팁";
  title: string;
  content: string;
  tags: string[];
  author: string;
  time: string;
  views: number;
  likes: number;
  comments: number;
};

const mockPosts: Post[] = [
  {
    id: 1,
    category: "베스트",
    title: "오늘 로얄 스트레이트 플러시 뗐습니다 ㅋㅋㅋ",
    content: "10년 포커 처먼서 처음봄.. 스크린샷 찍었어야 근데 너무 흥분해서 그냥 올인했더요",
    tags: ["추가", "생활팁시"],
    author: "역지커미",
    time: "34시간 전",
    views: 856,
    likes: 128,
    comments: 34,
  },
  {
    id: 2,
    category: "공지",
    title: "[필독] 커뮤니티 이용 규칙 및 주의사항",
    content: "본 커뮤니티는 원활한 운영과 즐거운 공간만들기 위해 아래 내용 지켜주셔야 합니다.",
    tags: ["공지", "필독"],
    author: "운영자",
    time: "3일 전",
    views: 2341,
    likes: 89,
    comments: 23,
  },
  {
    id: 3,
    category: "자유",
    title: "피망 포커 vs 한게임 포커 뭐가 나음?",
    content: "둘 다 해보신 분들 계신가요? 어느 게 더 재밌고 유저가 많나요?",
    tags: ["피망", "한게임", "비교"],
    author: "바그관",
    time: "24시간 전",
    views: 612,
    likes: 38,
    comments: 41,
  },
  {
    id: 4,
    category: "꿀팁",
    title: "텍사스 홀덤 1년 하면서 느낀 점",
    content: "초심자의 입문 올려드립니다. 특히 버드 사이클에 팬드 레이저로 낚실 자가는 되..",
    tags: ["텍사스홀덤", "전략", "꿀팁"],
    author: "포커고수",
    time: "16시간 전",
    views: 543,
    likes: 76,
    comments: 19,
  },
  {
    id: 5,
    category: "자유",
    title: "AAA 프리플랍에서 올든 당했는데 이게 맞나요?",
    content: "프리플랍에서 포켓 에이스 들고 3뱃 했는데 다른 팬드.. 이런 때 어떻게 해야 하나요",
    tags: ["전략", "질문"],
    author: "고민중",
    time: "18시간 전",
    views: 421,
    likes: 34,
    comments: 27,
  },
  {
    id: 6,
    category: "자유",
    title: "피망 포커 처음 시작하는데 팁 좀 주세요",
    content: "피망 포커 처음 시작하는데 피망머니 충전은 어떻게 하나요? 그리고 초보자가 주의할 점 알려주요",
    tags: ["피망머니", "초보", "질문"],
    author: "모커포수",
    time: "2시간 전",
    views: 324,
    likes: 43,
    comments: 16,
  },
];

const recentComments = [
  { text: "피망 포커 처음 시작하는데 팁 좀 주세요", author: "매탑피", time: "4시간 전" },
  { text: "피망머니는 공식 사이트에서 충전하시면 됩니다.", author: "알려드리는사람", time: "3시간 전" },
  { text: "고수 분들 스트레이트 플러시 뗀적있음?", author: "포커고수만", time: "방금" },
  { text: "대박.. 저는 평생 못 본듯 ㅋㅋ", author: "보면다", time: "역시간 전" },
  { text: "AAA 프리플랍에서 올든 당했는데 이게 맞나요?", author: "고민중", time: "18시간 전" },
  { text: "3뱃 사이즈가 너무 작진 않았나요?", author: "조언자", time: "역시간 전" },
];

const popularTags = [
  { name: "#피망머니", count: 143 },
  { name: "#초보", count: 89 },
  { name: "#전략", count: 234 },
  { name: "#텍사스홀덤", count: 312 },
  { name: "#꿀팁", count: 156 },
  { name: "#FAQ", count: 67 },
  { name: "#꿀오즈", count: 45 },
  { name: "#포커", count: 521 },
];

type TabId = "all" | "notice" | "free" | "tip";

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "전체글" },
  { id: "notice", label: "공지" },
  { id: "free", label: "자유" },
  { id: "tip", label: "꿀팁" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const filteredPosts = mockPosts.filter((post) => {
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
                <a href="#" className="hover:text-orange-500 transition">홈</a>
                <a href="#" className="hover:text-orange-500 transition">자유게시판</a>
                <a href="#" className="hover:text-orange-500 transition">Q&A</a>
                <a href="#" className="hover:text-orange-500 transition">꿀팁</a>
                <a href="#" className="hover:text-orange-500 transition">피망머니 가이드</a>
                <a href="#" className="hover:text-orange-500 transition">포커 가이드</a>
              </nav>
            </div>

            {/* Search & Login */}
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="검색"
                  className="pl-10 pr-4 py-2 bg-[#34495e] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
                />
              </div>
              <Link
                href="/login"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg text-sm font-medium transition"
              >
                로그인
              </Link>
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
              {filteredPosts.map((post) => (
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-orange-500 cursor-pointer">
                        {post.title}
                      </h3>
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
                      <span>{comment.author}</span>
                      <span>•</span>
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
