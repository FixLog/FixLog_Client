import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "./ArticleCard";

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
}

const apiUrl = import.meta.env.VITE_API_URL;

const API_ENDPOINTS = {
  mywrites: `${apiUrl}/mypage/posts`,
  bookmarks: `${apiUrl}/mypage/bookmarks`, // 수정 필요함
  likes: `${apiUrl}/mypage/likes`,
  forks: `${apiUrl}/mypage/forks` // 아직 구현 안하는걸로
};

const MyPageArticleList = ({ activeTab }: MyPageArticleListProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_ENDPOINTS[activeTab]}?page=0&sort=0&size=4`
        );
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
  }, [activeTab]);

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
