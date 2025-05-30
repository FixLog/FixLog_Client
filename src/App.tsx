import "./App.css";

function App() {
  return (
    <div className="p-8 space-y-6 bg-gray100 rounded-xl">
      <h1 className="font-pretendard text-hero text-main">
        Pretendard + Tailwind 적용 테스트
      </h1>
      <p className="font-pretendard text-body1 text-gray700">
        이 텍스트는 Pretendard 폰트와 Tailwind 커스텀 색상, 폰트사이즈가
        적용되어야 합니다.
      </p>
      <div className="flex gap-4">
        <button className="bg-point text-black text-button1 px-6 py-2 rounded">
          포인트 버튼
        </button>
        <button className="bg-main text-black text-button1 px-6 py-2 rounded">
          메인 버튼
        </button>
        <button
          className="bg-gray-500 text-black text-button1 px-6 py-2 rounded cursor-not-allowed"
          disabled
        >
          비활성 버튼
        </button>
      </div>
      <div className="space-y-1">
        <div className="font-pretendard text-heading1 text-point">
          Heading1 - Pretendard
        </div>
        <div className="font-pretendard text-heading2 text-main">
          Heading2 - Pretendard
        </div>
        <div className="font-pretendard text-heading3 text-gray700">
          Heading3 - Pretendard
        </div>
        <div className="font-pretendard text-body1 text-gray500">
          Body1 - Pretendard
        </div>
        <div className="font-pretendard text-caption text-gray400">
          Caption - Pretendard
        </div>
      </div>
    </div>
  );
}

export default App;
