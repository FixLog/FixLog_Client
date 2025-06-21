import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";

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

interface MyPageArticleListProps {
  activeTab: "mywrites" | "bookmarks" | "likes" | "forks";
  folderId?: number | null;
}

const apiUrl = import.meta.env.VITE_API_URL;

const API_ENDPOINTS = {
  mywrites: `${apiUrl}/mypage/posts`,
  bookmarks: `${apiUrl}/mypage/bookmarks`, // 이 주소는 폴더별 조회를 위해 동적으로 변경될 것임
  likes: `${apiUrl}/mypage/likes`,
  forks: `${apiUrl}/mypage/forks`
};

const MyPageArticleList = ({ activeTab, folderId }: MyPageArticleListProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'bookmarks' && !folderId) {
      setArticles([]);
      setLoading(false);
      return;
    }

    const fetchArticles = async () => {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }
      
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 0, sort: 0, size: 4 }
      };

      let endpoint = API_ENDPOINTS[activeTab];
      if (activeTab === 'bookmarks' && folderId) {
        endpoint = `${apiUrl}/bookmark-folders/${folderId}/bookmarks`;
      }
      
      try {
        const res = await axios.get(endpoint, config);
        const content = res.data.data.content;

        const parsed: Article[] = content.map((article: RawPost) => ({
          id: article.postId,
          title: article.postTitle,
          summary: article.postSummary,
          tags: article.tags,
          date: article.createdAt.slice(0, 10) // 'YYYY-MM-DD'
        }));

        setArticles(parsed);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [activeTab, folderId, navigate]);

  if (loading) return <p className="mt-4">로딩 중...</p>;

  if (articles.length === 0) {
    return <p className="mt-4 text-gray-500">게시글이 없습니다.</p>;
  }

  return (
    <div className="space-y-6 mt-4">
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
  );
};

export default MyPageArticleList;
