export default function QnaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Q&amp;A 게시판</h1>
        <p className="text-sm text-gray-600 mb-6">
          피망 포커와 관련된 궁금한 점을 자유롭게 물어보는 공간입니다. 추후 자유게시판처럼 목록형 게시판으로 확장될 예정입니다.
        </p>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">예시 질문: 피망머니 환불 어떻게 하나요?</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            피망머니를 잘못 충전했는데 환불이 가능한가요? 실제 운영 정책과 절차에 대한 안내 글이 이 영역에 들어가게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}


