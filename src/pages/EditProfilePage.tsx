// EditProfilePage.tsx
// 작성자: 이서연
// 마지막 수정 일자: 2025.06.08

import { useLocation } from "react-router-dom";
import Header from "../components/Header";

function EditProfilePage() {
  const location = useLocation();
  const { isLogin } = location.state || { isLogin: false }; // 기본값 설정

  console.log("Is Login (from state):", isLogin); // isLogin 값이 콘솔에 출력됩니다.

  return (
    <div>
      <Header isLogin={isLogin} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">회원 정보 수정</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">계정 관리</h2>
          <div className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                아이디 (이메일)
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value="fixlog@test.com"
                readOnly
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nickname"
              >
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue="김픽스"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="새 비밀번호"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm-password"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirm-password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="새 비밀번호 확인"
              />
            </div>
          </div>
          <button className="mt-6 text-red-500 hover:underline">
            탈퇴하기
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">프로필 관리</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
              {/* 프로필 이미지 */}
              <img
                src="https://via.placeholder.com/96"
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              이미지 변경하기
            </button>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bio"
            >
              소개글 수정하기
            </label>
            <textarea
              id="bio"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder="소개글을 입력하세요."
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            취소
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
