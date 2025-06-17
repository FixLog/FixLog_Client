import { useState, useEffect } from "react";
import axios from "axios";

interface AccountSectionProps {
  email: string;
  nickname: string;
}

const AccountSection = ({ email, nickname }: AccountSectionProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [nicknameValue, setNicknameValue] = useState(nickname);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState<null | boolean>(null);

  const handleUpdateNickname = async () => {
    try {
      await axios.patch(
        `${apiUrl}/mypage/members/nickname`,
        { nickname: nicknameValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      alert("닉네임이 수정되었습니다!");
    } catch (err) {
      console.error("닉네임 수정 실패:", err);
      alert("닉네임 수정 중 오류 발생");
    }
  };

  useEffect(() => {
    if (confirmPassword === "") {
      setPasswordMatch(null);
      return;
    }
    setPasswordMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("모든 비밀번호 입력란을 채워주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    try {
      await axios.patch(
        `${apiUrl}/mypage/members/password`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      alert("비밀번호가 성공적으로 변경되었습니다!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("비밀번호 변경 실패:", err);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-white border shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-3">계정 관리</h2>
        <button className="mt-2 text-black">탈퇴하기</button>
      </div>
      <div className="space-y-4">
        <div className="flex">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            아이디 (이메일)
          </label>
          <input
            type="email"
            id="email"
            className="border rounded py-2 px-3 ml-6 text-gray-700"
            value={email}
            readOnly
          />
        </div>
        <div className="flex">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nickname"
          >
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            className="border rounded py-2 px-3 ml-20 text-gray-700"
            value={nicknameValue}
            onChange={(e) => setNicknameValue(e.target.value)}
          />
          <button
            onClick={handleUpdateNickname}
            className="px-5 ml-4 bg-sub1 font-bold border rounded text-black"
          >
            변경하기
          </button>
        </div>
        <div className="flex">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="border rounded py-2 px-3 ml-16 text-gray-700"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirm-password"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirm-password"
            className="border rounded py-2 px-3 ml-8 text-gray-700"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={handleUpdatePassword}
            className="px-5 ml-4 bg-sub1 font-bold border rounded text-black"
          >
            변경하기
          </button>
        </div>
        {passwordMatch === true && (
          <p className="text-main text-sm ml-32">비밀번호가 일치합니다</p>
        )}
        {passwordMatch === false && (
          <p className="text-point text-sm ml-32">
            비밀번호가 일치하지 않습니다
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountSection;
