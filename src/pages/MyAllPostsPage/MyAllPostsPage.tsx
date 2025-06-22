import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/common/Header";
import ArticleCard from "../MyPage/components/ArticleCard";
import PageNavigator from "../../components/common/PageNavigator";

interface Article {
  id: number;
  title: string;
  summary: string;
  tags: string[];
  date: string;
}

interface RawPost {
  postId: number;
  postTitle: string;
  postSummary: string;
  tags: string[];
  createdAt: string;
}

const PAGE_TITLES: { [key: string]: string } = {
  mywrites: "내가 쓴 글",
  bookmarks: "북마크",
  likes: "좋아요 한 글",
  forks: "Fork 한 글"
};

const MyAllPostsPage = () => {
  const { type, folderId } = useParams<{ type: string; folderId?: string }>();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [folderName, setFolderName] = useState<string>(""); // 북마크 폴더명 저장

  // 북마크 폴더명 조회 함수
  const fetchFolderName = useCallback(async () => {
    if (type !== "bookmarks" || !folderId) return;

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await axios.get(
        `${apiUrl}/bookmark-folders/${folderId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setFolderName(response.data.data.folderName);
    } catch (err) {
      console.error("폴더명 조회 실패:", err);
      setFolderName("알 수 없는 폴더");
    }
  }, [type, folderId, apiUrl]);

  const getEndpoint = useCallback(() => {
    if (!type) return null;
    if (type === "bookmarks" && folderId) {
      return `${apiUrl}/bookmark-folders/${folderId}/bookmarks`;
    }
    const simpleEndpoints: { [key: string]: string } = {
      mywrites: `${apiUrl}/mypage/posts`,
      likes: `${apiUrl}/mypage/likes`,
      forks: `${apiUrl}/mypage/forks`
    };
    return simpleEndpoints[type] || null;
  }, [type, folderId, apiUrl]);

  const fetchArticles = useCallback(async () => {
    const endpoint = getEndpoint();
    if (!endpoint) return;

    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 0, size: 12, sort: 0 } // 항상 첫 번째 페이지 요청
      };
      const res = await axios.get(endpoint, config);
      const data = res.data.data;

      const parsed: Article[] = data.content.map((article: RawPost) => ({
        id: article.postId,
        title: article.postTitle,
        summary: article.postSummary,
        tags: article.tags,
        date: article.createdAt.slice(0, 10)
      }));

      setArticles(parsed);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("전체 게시글 로딩 실패:", err);
      setArticles([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [getEndpoint, navigate]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // 북마크 폴더인 경우 폴더명 조회
  useEffect(() => {
    fetchFolderName();
  }, [fetchFolderName]);

  // 페이지 제목 생성
  const getPageTitle = () => {
    if (type === "bookmarks" && folderName) {
      return folderName;
    }

    const baseTitle = type ? PAGE_TITLES[type] || "전체보기" : "전체보기";
    return baseTitle;
  };

  const pageTitle = getPageTitle();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header isLogin={isLoggedIn} />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 self-start">{pageTitle}</h1>
        {loading ? (
          <p className="text-center mt-8">로딩 중...</p>
        ) : articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  summary={article.summary}
                  tags={article.tags}
                  date={article.date}
                />
              ))}
            </div>
            <div className="mt-12">
              {/* <PageNavigator totalPageNumber={totalPages} /> */}
              {/* 연동하며 PageNavigator를 수정하게 되어서 우선 mock data로 넣어뒀습니다..! */}
              <PageNavigator
                    currentPage={1}
                    totalPageNumber={totalPages}
                    onPageChange={(page) => console.log(`페이지 변경: ${page}`)} // 페이지 변경 시 동작할 함수 
              />
            </div>
          </>
        ) : (
          <p className="text-center mt-8 text-gray-500">게시글이 없습니다.</p>
        )}
      </main>
    </div>
  );
};

export default MyAllPostsPage;
