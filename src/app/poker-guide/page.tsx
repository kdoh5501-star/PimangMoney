export default function PokerGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">포커 기초 가이드</h1>
        <p className="text-sm text-gray-600 mb-6">
          텍사스 홀덤 규칙, 족보, 기본 전략 등을 정리하는 입문용 가이드입니다. 이후에는 여러 편의 가이드 글로 나누어질 수
          있습니다.
        </p>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">예시 가이드: 포커 족보 한눈에 보기</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            로열 스트레이트 플러시 &gt; 스트레이트 플러시 &gt; 포카드 &gt; 풀하우스 &gt; 플러시 &gt; 스트레이트 &gt;
            트리플 &gt; 투페어 &gt; 원페어 &gt; 하이카드 순서로 족보가 결정됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}


