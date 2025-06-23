import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import { useNavigate } from "react-router-dom";

interface Article {
  id: number;
  postId: number;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  imageUrl: string;
}

interface RawPost {
  postId: number;
  postTitle: string;
  postSummary: string;
  tags: string[];
  createdAt: string;
  imageUrl: string;
}

interface MyPageArticleListProps {
  activeTab: "mywrites" | "bookmarks" | "likes" | "forks";
}

const apiUrl = import.meta.env.VITE_API_URL;

const API_ENDPOINTS = {
  mywrites: `${apiUrl}/mypage/posts`,
  likes: `${apiUrl}/mypage/likes`,
  forks: `${apiUrl}/mypage/forks`
};

const MyPageArticleList = ({ activeTab }: MyPageArticleListProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "bookmarks") {
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

      const endpoint = API_ENDPOINTS[activeTab];

      try {
        const res = await axios.get(endpoint, config);
        const content = res.data.data.content;

        const parsed: Article[] = content.map((article: RawPost) => ({
          id: article.postId,
          postId: article.postId,
          title: article.postTitle,
          summary: article.postSummary,
          tags: article.tags,
          date: article.createdAt.slice(0, 10),
          imageUrl: article.imageUrl
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
  }, [activeTab, navigate]);

  if (loading) return <p className="mt-4">로딩 중...</p>;

  if (articles.length === 0) {
    return <p className="mt-4 text-gray-500">게시글이 없습니다.</p>;
  }

  return (
    <div className="space-y-6 mt-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          postId={String(article.postId)}
          title={article.title}
          summary={article.summary}
          tags={article.tags}
          date={article.date}
          imageUrl={article.imageUrl}
        />
      ))}
    </div>
  );
};

export default MyPageArticleList;
