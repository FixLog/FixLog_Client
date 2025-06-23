import "./App.css";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import MyPage from "./pages/MyPage/MyPage";
import RouteGuard from "./components/router/RouteGuard";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
import ViewAllPage from "./pages/ViewAllPage/ViewAllPage";
import WritePage from "./pages/WritePage/WritePage";
import SignupPage from "./pages/UserPage/SignupPage";
import SignupSuccessPage from "./pages/UserPage/SignupSuccessPage";
import LoginPage from "./pages/UserPage/LoginPage";
import DeleteAccountPage from "./pages/UserPage/DeleteAccountPage";
import TagCollectionPage from "./pages/TagPage/TagCollectionPage";
import TagDetailPage from "./pages/TagPage/TagDetailPage";
import MyAllPostsPage from "./pages/MyAllPostsPage/MyAllPostsPage";
import ViewPage from "./pages/ViewPage/ViewPage";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

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
          <Route path="/my-page/:nickname" element={<MyPage />} />
          <Route path="/edit-profile-page" element={<EditProfilePage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/posts/:post_id" element={<ViewPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          <Route path="/my-all-posts/:type" element={<MyAllPostsPage />} />
          <Route path="/my-all-posts/:type/:folderId" element={<MyAllPostsPage />} />
        </Route>          

        {/* 로그인 없이 접근 가능한 페이지들은 여기에 추가! */}
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-success" element={<SignupSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search-result" element={<SearchResultPage />} />
        <Route path="/view-all/:type" element={<ViewAllPage  />} />
        <Route path="/tag-collection" element={<TagCollectionPage />} />
        <Route path="/tag-detail" element={<TagDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;