import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import LogoIcon from "../../assets/icons/Logo.svg";
import AlarmIcon from "../../assets/icons/Alarm.svg";
import WriteIcon from "../../assets/icons/Write.svg";

interface HeaderProps {
  isLogin: boolean;
  setIsLogin?: (login: boolean) => void;
}

type NavTabType = "tags" | "latest" | "popular" | null;

const Header = ({ isLogin, setIsLogin }: HeaderProps) => {
  // 드롭다운 메뉴 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 네비게이션 탭 상태 관리
  // const [activeTab, setActiveTab] = useState<NavTabType>(null);
  const [myNickname, setMyNickname] = useState<string | null>(null);
  const [myProfileUrl, setMyProfileUrl] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("accessToken");

  // 닉네임 불러오기(마이페이지 접근 위함)
  useEffect(() => {
    // 로그인 상태일 때만 API 호출
    if (isLogin) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        axios
          .get(`${apiUrl}/members/me`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then((res) => {
            setMyNickname(res.data.data.nickname);
            setMyProfileUrl(res.data.data.profileImageUrl);
          })
          .catch((err) => {
            console.error("내 정보 불러오기 실패:", err);
          });
      }
    }
  }, [isLogin, apiUrl]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 탭
  const navTabs: { label: string; value: NavTabType }[] = [
    { label: "태그 모음", value: "tags" },
    { label: "최신글", value: "latest" },
    { label: "인기글", value: "popular" }
  ];

  const getActiveTab = (): NavTabType => {
    if (location.pathname.startsWith("/tag-collection")) return "tags"; // 태그 모음
    if (location.pathname.startsWith("/view-all/latest")) return "latest"; // 최신글
    if (location.pathname.startsWith("/view-all/popular")) return "popular"; // 인기글
    return null;
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tab: NavTabType) => {
    if (tab === "tags") {
      navigate("/tag-collection"); // 태그 모음
    } else if (tab === "latest") {
      navigate("/view-all/latest"); // 최신글
    } else if (tab === "popular") {
      navigate("/view-all/popular"); // 인기글
    }
  };

  const handleMyPageClick = () => {
    if (myNickname && token) {
      navigate(`/my-page/${myNickname}`);
    } else {
      alert("접근 권한이 없습니다.");
    }
    setIsDropdownOpen(false); // 메뉴 닫기
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLogin?.(false);
    setIsDropdownOpen(false); // 메뉴 닫기
    navigate("/");
  };

  return (
    <header className="w-full border-b bg-white shadow-sm font-pretendard">
      <div className="max-w-[1300px] mx-auto flex items-center h-[65px] px-8">
        {/* 로고 */}
        <Link to="/" className="flex items-center h-full">
          <img src={LogoIcon} alt="FixLog" className="h-8" />
        </Link>
        {/* 네비게이션 */}
        <nav className="flex gap-10 items-center text-base font-semibold ml-16 flex-1">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.value;
            const baseClass = "px-4 py-2 transition-colors duration-150";
            const activeClass = "border-b-2 border-main text-black";
            const inactiveClass = "text-gray-500 hover:text-black";

            return (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* 우측 섹션 (로그인 상태에 따라 다름) */}
        <div className="flex items-center gap-6">
          {isLogin && token ? (
            // 로그인 상태
            <>
              {/* 작성하기 버튼 */}
              <Link to="/write">
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
                {/* 드롭다운 위치 기준 */}
                <button
                  className="w-8 h-8 rounded-full bg-gray300 overflow-hidden focus:outline-none "
                  onClick={toggleDropdown}
                >
                  <img src={myProfileUrl || ""} alt="프로필" className="h-full w-full object-cover" />
                </button>
                {/* 드롭다운 메뉴 */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                      onClick={handleMyPageClick}
                      className="block px-4 py-2 text-sm text-gray700 hover:bg-gray100 w-full text-left transition-colors"
                    >
                      마이페이지
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray700 hover:bg-gray100 w-full text-left transition-colors "
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // 비로그인 상태
            <div className="flex gap-2">
              <Link to="/login">
                <button className="w-[80px] h-[32px] flex items-center justify-center font-semibold text-gray-800 text-[16px] bg-sub1 px-[14px] py-[8px] rounded-[100px] border border-transparent hover:bg-transparent hover:border-sub1 transition-colors">
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-auto h-[32px] flex items-center justify-center font-medium text-gray-600 text-[16px] bg-transparent px-[14px] py-[8px] rounded-[100px] hover:text-gray-900 transition-colors">
                  회원가입
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
