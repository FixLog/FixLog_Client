// src/pages/MyPage.tsx
// 작성자: 이서연
// 마지막 수정 일자: 2025.06.08

import Header from "../components/Header";
import ProfileSection from "../components/ProfileSection";
import MyPageNavTabs from "../components/MyPageNavTabs";
import ArticleCard from "../components/ArticleCard"; // 나중에 만들 컴포넌트

const MyPage = () => {
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
        <MyPageNavTabs />
        {/* 게시글 목록 섹션 */}
        <div className="mt-8 space-y-6">
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
