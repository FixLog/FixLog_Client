import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import MainPage from "./pages/MainPage";
import SignupPage from "./pages/UserPage/SignupPage";
import SignupSuccessPage from "./pages/UserPage/SignupSuccessPage";
import LoginPage from "./pages/UserPage/LoginPage";
import DeleteAccountPage from "./pages/UserPage/DeleteAccountPage";
import MyPage from "./pages/MyPage";
import RouteGuard from "./components/router/RouteGuard";
import PostingPage from "./pages/PostingPage";
import TagCollectionPage from "./pages/TagPage/TagCollectionPage";
import TagDetailPage from "./pages/TagPage/TagDetailPage";

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
          <Route path="/tag-collection" element={<TagCollectionPage />} />
          <Route path="/tag-detail" element={<TagDetailPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
        </Route>

        {/* 로그인 없이 접근 가능한 페이지들은 여기에 추가! */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-success" element={<SignupSuccessPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
