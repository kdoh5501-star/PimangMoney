"use client";

import Link from "next/link";
import Image from "next/image";

// NOTE: 랜딩 페이지 레이아웃 관련 설명용 주석 (빌드에는 영향 없음)
// - 상단 메인 배너
// - 카카오톡 배너
// - 판매/매입 서비스 섹션
// - 필요 시 추가 섹션을 아래에 자유롭게 확장 가능
// - 이 줄은 배포를 위한 커밋 트리거 용도의 단순 주석입니다.

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <header className="bg-[#1a1f2b] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-orange-500">최강</span>또또머니상
            </span>
            <span className="text-xs text-gray-300 hidden sm:inline">피망머니 전문 거래소</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-orange-400">피망머니상</a>
            <a href="#steps" className="hover:text-orange-400">거래 방법</a>
            <a href="#safe" className="hover:text-orange-400">안전 안내</a>
            <Link href="/community" className="hover:text-orange-400">커뮤니티</Link>
          </nav>
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="hidden sm:inline text-gray-300">카카오톡</span>
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-semibold">dd221</span>
            <span className="hidden sm:inline text-gray-300">전화</span>
            <span className="px-3 py-1 rounded-full bg-gray-800 text-white font-semibold">010-7308-8948</span>
          </div>
        </div>
      </header>
      {/* 나머지 main 이하 코드는 그대로 두시면 됩니다 */}

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* Top large banner image */}
        <section className="mb-4">
          <div className="w-full rounded-2xl overflow-hidden border border-gray-300 bg-white">
            <Image
              src="/banners/main-banner.jpg"
              alt="최강또또머니상 메인 배너"
              width={1600}
              height={500}
              priority
              className="w-full h-72 md:h-96 object-contain"
            />
          </div>
        </section>

        {/* Hero section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-snug">
              피망머니 거래,
              <br />
              <span className="text-orange-500">최강또또머니상</span>에서 안전하게 한 번에
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-6">
              피망 포커 · 맞고 · 섯다 · 슬롯 등 다양한 피망게임에서 사용하는 머니를
              <br />
              업계 최저 시세와 빠른 처리 속도로 거래하세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://open.kakao.com/o/some-link"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
              >
                카카오톡 문의하기 (dd221)
              </a>
              <Link
                href="/community"
                className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-5 py-2 rounded-lg text-sm font-medium"
              >
                커뮤니티 둘러보기
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              연중무휴 24시간 운영 · 거래 내역 기록 보관 · 안전한 피망머니 거래 지원
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">오늘의 피망머니 거래 안내</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>· 피망 포커 / 맞고 / 슬롯 등 대부분 게임 지원</li>
              <li>· 최소 거래 금액과 한도는 상담 시 안내</li>
              <li>· 입금 확인 후 5분 내 지급 목표</li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              실제 시세와 조건은 카카오톡 상담을 통해 실시간으로 안내해 드립니다.
            </p>
          </div>
        </section>

        {/* Kakao banner */}
        <section className="grid md:grid-cols-[2fr,3fr] gap-8 items-center">
          <div className="w-full rounded-2xl overflow-hidden border border-yellow-400 bg-white">
            <Image
              src="/banners/kakao-banner.jpg"
              alt="카카오톡 상담 배너"
              width={800}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              <h2 className="text-lg font-bold mb-2">최강또또머니상</h2>
            <p>
              피망 포커, 뉴맞고, 섯다, 슬롯, 바카라, 홀덤 등 다양한 피망게임에서 사용하는 피망머니를 판매·매입하는 전문
              거래소입니다. 최저가 판매와 최고가 매입으로 많은 고객님의 만족을 얻고 있습니다.
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-3">피망머니란 무엇인가요?</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              피망머니는 포커, 뉴맞고, 섯다, 슬롯, 바카라, 블랙잭, 홀덤 등 피망 게임에서 사용하는 게임 머니입니다.
              게임을 더 풍부하게 즐기기 위해서는 안전하고 신뢰할 수 있는 거래처에서 피망머니를 구매·판매하는 것이
              중요합니다.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">돼지머니를 선택해야 하는 이유</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>· 업계 경쟁력 있는 시세로 거래 지원</li>
              <li>· 24시간 신속 응대 및 처리</li>
              <li>· 거래 내역 보관으로 분쟁 최소화</li>
              <li>· 피망머니 관련 다년간 운영 노하우</li>
            </ul>
          </div>
        </section>

        {/* Steps */}
        <section id="steps" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-4">피망머니 거래 방법</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-xs font-semibold text-orange-500 mb-1">STEP 1</p>
              <p className="font-semibold mb-1">카카오톡으로 시세 문의</p>
              <p className="text-gray-600">카카오톡 ID `dd221` 으로 연락하여 원하는 금액과 게임을 알려주세요.</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-xs font-semibold text-orange-500 mb-1">STEP 2</p>
              <p className="font-semibold mb-1">입금 및 확인</p>
              <p className="text-gray-600">안내받은 계좌로 입금 후, 입금자명과 금액을 알려주시면 바로 확인해 드립니다.</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-xs font-semibold text-orange-500 mb-1">STEP 3</p>
              <p className="font-semibold mb-1">피망머니 지급 완료</p>
              <p className="text-gray-600">피망머니 지급이 완료되면 카카오톡으로 다시 한 번 완료 안내를 드립니다.</p>
            </div>
          </div>
        </section>

        {/* Image + Text blocks (판매 / 매입 서비스) */}
        <section className="space-y-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="w-full rounded-2xl overflow-hidden border border-gray-300 bg-white">
              <Image
                src="/banners/sell-service.jpg"
                alt="피망머니 판매 서비스 이미지"
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">피망머니 판매 서비스</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                신뢰할 수 있는 플랫폼에서 피망머니를 구매하는 것이 가장 중요합니다. 최강또또머니상은 인증된 계좌와 보안
                시스템으로 안전한 거래 환경을 제공하며, 거래 전후 모든 내역을 투명하게 안내합니다.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-lg font-bold mb-2">피망머니 매입 서비스</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                사용하지 않는 피망머니를 현금화하고 싶을 때, 최강또또머니상의 매입 서비스를 이용하실 수 있습니다. 합리적인
                시세와 빠른 정산으로 피망머니를 안전하게 정리할 수 있도록 도와드립니다.
              </p>
            </div>
            <div className="order-1 md:order-2 w-full rounded-2xl overflow-hidden border border-gray-300 bg-white">
              <Image
                src="/banners/buy-service.jpg"
                alt="피망머니 매입 서비스 이미지"
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* Safety */}
        <section id="safe" className="space-y-4">
          <h2 className="text-xl font-bold">안전한 거래를 위한 안내</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
              <p className="font-semibold text-red-700 mb-1">성인만 이용 가능</p>
              <p className="text-red-700">
                본 서비스는 만 19세 이상만 이용하실 수 있으며, 과도한 게임 이용은 금전적 피해를 초래할 수 있습니다.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <p className="font-semibold text-gray-800 mb-1">사기 예방을 위한 수칙</p>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                <li>항상 공식 연락처(카카오톡 `dd221`)로만 거래하세요.</li>
                <li>거래 내역(날짜, 금액, 계좌, 상대 아이디)을 반드시 기록해 두세요.</li>
                <li>의심스러운 제안이나 비정상적인 조건은 즉시 거래를 중단하세요.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Community teaser */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">피망 커뮤니티 하이라이트</h2>
            <Link
              href="/community"
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              커뮤니티 전체 보기 →
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            자유게시판에서 피망 게임 후기, 전략, 질문 등을 자유롭게 나눠 보세요. 실시간 댓글과 인기 태그로
            다양한 이야기를 빠르게 확인할 수 있습니다.
          </p>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-10 py-6 text-center text-xs text-gray-500">
        <p className="mb-1">
          최강또또머니상 · KakaoTalk: <span className="font-semibold">dd221</span> · Tel: 010-7308-8948 · Email:
          admin@pmangmoneyshop.com
        </p>
        <p>© {new Date().getFullYear()} 최강또또머니상. All rights reserved.</p>
      </footer>
    </div>
  );
}

