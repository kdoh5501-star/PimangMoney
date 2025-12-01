export default function MoneyGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">피망머니 가이드</h1>
        <p className="text-sm text-gray-600 mb-6">
          피망머니 충전, 사용, 주의사항 등을 정리하는 가이드 페이지입니다. 실제 운영 정책이 정리되면 이곳에 상세 안내가
          들어갑니다.
        </p>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">예시 안내: 피망머니 충전 기본 규칙</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            피망머니는 성인만 이용 가능하며, 과도한 충전은 도박 중독의 위험을 높일 수 있습니다. 책임 있는 게임 이용을
            위해 충전 한도를 스스로 관리해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}


