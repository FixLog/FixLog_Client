import Header from "../../components/common/Header";
import ProfileSection from "./components/ProfileSection";
import MyPageNavTabs from "./components/MyPageNavTabs";
import ArticleCard from "./components/ArticleCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "bookmarks" | "likes" | "mywrites" | "forks"
  >("mywrites");

  // TODO: isLogin 상태 관리 로직 추가
  const isLogin = true; // 일단 로그인 상태로 가정

  // TODO: 현재 로그인 유저 ID(userId) 화면 속 유저 Id(currentUserId) 상태 관리 로직 추가
  const userId = "1234";
  const currentUserId = "1234"; // 일단 현재 로그인 유저가 자신의 마이페이지를 보는 상태로 가정

  // TODO: 불러오는거 로직 생각 필요
  const title = "title";
  const summary = "summary";
  const tags = ["tags"];
  const date = "date";

  const handleViewAllClick = () => {
    navigate(`/view-all/${activeTab}`);
  };

  return (
    <div className="min-h-screen bg-gray100">
      <Header isLogin={isLogin} />
      <main className="container mx-auto py-8 px-4">
        {/* 프로필 섹션 컴포넌트 */}
        <ProfileSection
          userId={userId}
          currentUserId={currentUserId}
          isLogin={isLogin}
        />
        {/* 네비게이션 탭 컴포넌트 */}
        <MyPageNavTabs onTabChange={setActiveTab} />
        {/* 전체보기 버튼 */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleViewAllClick}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
          >
            전체보기 ›
          </button>
        </div>
        {/* 게시글 목록 섹션 */}
        <div className="space-y-6">
          <ArticleCard
            title={title}
            summary={summary}
            tags={tags}
            date={date}
          />
          <ArticleCard
            title={title}
            summary={summary}
            tags={tags}
            date={date}
          />
          <ArticleCard
            title={title}
            summary={summary}
            tags={tags}
            date={date}
          />
          <ArticleCard
            title={title}
            summary={summary}
            tags={tags}
            date={date}
          />
        </div>
      </main>
    </div>
  );
};

export default MyPage;
