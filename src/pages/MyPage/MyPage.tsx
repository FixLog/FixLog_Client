import Header from "../../components/common/Header";
import ProfileSection from "./components/ProfileSection";
import MyPageNavTabs from "./components/MyPageNavTabs";
import MyPageArticleList from "./components/MyPageArticleList";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const MyPage = () => {
  const navigate = useNavigate();
  const { nickname: pageNickname } = useParams();
  const [activeTab, setActiveTab] = useState<
    "mywrites" | "bookmarks" | "likes" | "forks"
  >("mywrites");
  const [isLogin, setIsLogin] = useState(false);
  const [myNickname, setMyNickname] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLogin(!!token);

    if (token) {
      axios.get(`${apiUrl}/members/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setMyNickname(res.data.data.nickname);
      }).catch(() => {
        setMyNickname(null);
      });
    } else {
      setMyNickname(null);
    }
  }, []);

  const isOwner = typeof myNickname === "string" && typeof pageNickname === "string" && myNickname === pageNickname;

  const handleTabChange = (tab: "mywrites" | "bookmarks" | "likes" | "forks") => {
    if (!isOwner && tab !== "mywrites") return;
    setActiveTab(tab);
  };

  const handleViewAllClick = () => {
    navigate(`/view-all/${activeTab}`);
  };

  return (
    <div className="min-h-screen bg-gray100">
      <Header isLogin={isLogin} />
      <main className="max-w-[900px] mx-auto px-8 pt-12">
        {/* 프로필 섹션 컴포넌트 */}
        <ProfileSection
          userId={pageNickname ?? ""}
          currentUserId={myNickname ?? ""}
          isLogin={isLogin}
        />
        {/* 네비게이션 탭 컴포넌트 */}
        <MyPageNavTabs
          onTabChange={handleTabChange}
          isOwner={isOwner}
          activeTab={activeTab}
        />
        {/* 전체보기 버튼: 본인만 보이게 */}
        {isOwner && (
          <div className="flex justify-end mt-6 mb-2">
            <button
              onClick={handleViewAllClick}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
            >
              전체보기 &gt;
            </button>
          </div>
        )}
        {/* 포스팅 목록 */}
        <MyPageArticleList activeTab={activeTab} />
      </main>
    </div>
  );
};

export default MyPage;
