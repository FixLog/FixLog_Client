import "./App.css";
// import Header from "./components/Header";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import RouteGuard from "./components/router/RouteGuard";
import PostingPage from "./pages/PostingPage";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
import ViewAllPage from "./pages/ViewAllPage/ViewAllPage";
import WritePage from "./pages/WritePage/WritePage";

const App: React.FC = () => {
  const isLoggedIn = true; // TODO: 이후 토큰 존재 여부 검사해서 수정

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <RouteGuard isLoggedIn={isLoggedIn}>
              <Outlet />
            </RouteGuard>
          }
        >
          {/* 로그인 후에 접근 가능한 페이지들은 여기에 추가! */}
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/posting-page" element={<PostingPage />} />
          <Route path="/write" element={<WritePage />} />
        </Route>

        {/* 로그인 없이 접근 가능한 페이지들은 여기에 추가! */}
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="/view-all/:type" element={<ViewAllPage  />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
