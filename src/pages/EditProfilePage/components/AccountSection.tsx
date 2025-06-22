interface AccountSectionProps {
  email: string;
  nickname: string;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateNickname: () => void;
  currentPassword?: string;
  onCurrentPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newPassword?: string;
  confirmPassword?: string;
  onNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdatePassword: () => void;
}

const AccountSection = ({
  email,
  nickname,
  onNicknameChange,
  onUpdateNickname,
  currentPassword,
  onCurrentPasswordChange,
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onUpdatePassword
}: AccountSectionProps) => {
  const passwordMatch =
    newPassword || confirmPassword ? newPassword === confirmPassword : null;

  return (
    <section className="bg-white border border-gray-300 rounded-lg px-12 py-10 mb-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">계정 관리</h2>
        <button className="text-black text-sm hover:underline">탈퇴하기</button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <label
            className="w-40 text-gray-700 text-base font-bold"
            htmlFor="email"
          >
            아이디(이메일)
          </label>
          <input
            type="email"
            id="email"
            className="border rounded py-2 px-4 text-gray-700 w-96 bg-gray-100"
            value={email}
            readOnly
          />
        </div>
        <div className="flex items-center gap-6">
          <label
            className="w-40 text-gray-700 text-base font-bold"
            htmlFor="nickname"
          >
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            className="border rounded py-2 px-4 text-gray-700 w-96"
            value={nickname}
            onChange={onNicknameChange}
          />
          <button
            onClick={onUpdateNickname}
            className="px-5 py-1 ml-4 bg-sub1 font-bold border rounded text-black"
          >
            변경하기
          </button>
        </div>
        <div className="flex items-center gap-6">
          <label
            className="w-40 text-gray-700 text-base font-bold"
            htmlFor="current-password"
          >
            현재 비밀번호
          </label>
          <input
            type="password"
            id="current-password"
            className="border rounded py-2 px-4 text-gray-700 w-96"
            placeholder="현재 비밀번호"
            value={currentPassword}
            onChange={onCurrentPasswordChange}
          />
        </div>
        <div className="flex items-center gap-6">
          <label
            className="w-40 text-gray-700 text-base font-bold"
            htmlFor="password"
          >
            새 비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="border rounded py-2 px-4 text-gray-700 w-96"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={onNewPasswordChange}
          />
        </div>
        <div className="flex items-center gap-6">
          <label
            className="w-40 text-gray-700 text-base font-bold"
            htmlFor="confirm-password"
          >
            새 비밀번호 확인
          </label>
          <input
            type="password"
            id="confirm-password"
            className="border rounded py-2 px-4 text-gray-700 w-96"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
          <button
            onClick={onUpdatePassword}
            className="px-5 py-1 ml-4 bg-sub1 font-bold border rounded text-black"
          >
            변경하기
          </button>
        </div>
        {passwordMatch === true && (
          <p className="text-main text-sm ml-[200px]">비밀번호가 일치합니다</p>
        )}
        {passwordMatch === false && (
          <p className="text-point text-sm ml-[200px]">
            비밀번호가 일치하지 않습니다
          </p>
        )}
      </div>
    </section>
  );
};

export default AccountSection;
