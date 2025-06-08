// Header.tsx
// 작성자: 이서연
// 마지막 수정 일자: 2025.06.08
import { useState } from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../assets/icons/Logo.svg";
import AlarmIcon from "../assets/icons/Alarm.svg";
import WriteIcon from "../assets/icons/Write.svg";
import ProfileIcon from "../assets/icons/Profile.svg";

interface HeaderProps {
  isLogin: boolean;
}

type NavTabType = "tags" | "latest" | "popular";

const Header = ({ isLogin }: HeaderProps) => {
  // 드롭다운 메뉴 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 네비게이션 탭 상태 관리
  const [activeTab, setActiveTab] = useState<NavTabType>("tags");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabClick = (tab: NavTabType) => {
    setActiveTab(tab);
  };

  const navTabs: { label: string; value: NavTabType }[] = [
    { label: "태그 모음", value: "tags" },
    { label: "최신글", value: "latest" },
    { label: "인기글", value: "popular" }
  ];

  return (
    <header className="flex justify-between items-center w-full px-6 py-3 border-b bg-white shadow-sm font-pretendard">
      {/* 로고 */}
      <Link to="/">
        <img src={LogoIcon} alt="FixLog" />
      </Link>

      {/* 네비게이션 (로그인/비로그인 공통) */}
      <nav className="flex gap-6 items-center text-sm text-gray700 font-semibold">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.value;
          const baseClass = "px-4 py-2 transition-colors duration-150";
          const activeClass = "border-b-2 border-main text-black";
          const inactiveClass = "text-gray-500 hover:text-black";

          return (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`${baseClass} ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* 우측 섹션 (로그인 상태에 따라 다름) */}
      <div className="flex items-center gap-4">
        {isLogin ? (
          // 로그인 상태
          <>
            {/* 작성하기 버튼 */}
            <Link to="/posting-page">
              <button className="flex items-center gap-1 text-sm text-gray700 hover:text-black transition-colors ">
                <img src={WriteIcon} alt="작성하기" className="h-4 w-4" />
                작성하기
              </button>
            </Link>

            {/* 알림 아이콘 */}
            <button className="p-1 rounded-full hover:bg-gray100 transition-colors ">
              <img src={AlarmIcon} alt="알림" className="h-5 w-5" />
            </button>

            {/* 프로필 아이콘 및 드롭다운 */}
            <div className="relative">
              {" "}
              {/* 드롭다운 위치 기준 */}
              <button
                className="w-8 h-8 rounded-full bg-gray300 overflow-hidden focus:outline-none "
                onClick={toggleDropdown}
              >
                <img
                  src={ProfileIcon}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              </button>
              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/my-page">
                    <button className="block px-4 py-2 text-sm text-gray700 hover:bg-gray100 w-full text-left transition-colors ">
                      마이페이지
                    </button>
                  </Link>
                  <Link to="/">
                    <button className="block px-4 py-2 text-sm text-gray700 hover:bg-gray100 w-full text-left transition-colors ">
                      로그아웃
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </>
        ) : (
          // 비로그인 상태
          <div className="flex gap-2">
            <button className="text-sm text-main border border-main px-4 py-1 rounded hover:bg-main hover:text-white transition-colors ">
              로그인
            </button>
            <button className="text-sm text-white bg-main px-4 py-1 rounded hover:bg-sub1 hover:text-main transition-colors ">
              회원가입
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
