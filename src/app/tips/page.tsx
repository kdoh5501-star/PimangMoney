export default function TipsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">꿀팁 게시판</h1>
        <p className="text-sm text-gray-600 mb-6">
          피망 포커 전략, 운영 팁, 생활 꿀팁 등을 공유하는 공간입니다. 나중에는 여러 꿀팁 글이 리스트 형태로 올라가게 됩니다.
        </p>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">예시 꿀팁: 초보를 위한 기본 베팅 전략</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            프리플랍에서는 너무 많은 핸드를 플레이하지 말고, 포지션에 따라 선택적으로 참여하는 것이 좋습니다. 자세한 전략 글이
            이 영역에 들어가게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}


