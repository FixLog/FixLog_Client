// src/pages/ProfilePage.tsx
// 작성자: 이서연
// 마지막 수정 일자: 2025.06.02

import React from "react";
import Header from "../components/Header";
// import ProfileSection from '../compoents/ProfileSection'; // 나중에 만들 컴포넌트
// import NavigationTabs from '../compoents/NavigationTabs'; // 나중에 만들 컴포넌트
// import ArticleCard from '../compoents/ArticleCard'; // 나중에 만들 컴포넌트

const ProfilePage = () => {
  // TODO: isLogin 상태 관리 로직 추가
  const isLogin = true; // 일단 로그인 상태로 가정

  return (
    <div className="min-h-screen bg-gray100">
      {" "}
      {/* 전체 페이지 배경색 및 최소 높이 */}
      <Header isLogin={isLogin} />
      <main className="container mx-auto py-8 px-4">
        {" "}
        {/* 페이지 주요 콘텐츠 영역 */}
        {/* 프로필 섹션 컴포넌트 (나중에 추가) */}
        {/* <ProfileSection /> */}
        {/* 네비게이션 탭 컴포넌트 (나중에 추가) */}
        {/* <NavigationTabs /> */}
        {/* 게시글 목록 섹션 (나중에 추가) */}
        <div className="mt-8 space-y-6">
          {/* <ArticleCard /> */}
          {/* <ArticleCard /> */}
          {/* ... 게시글 목록 */}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
