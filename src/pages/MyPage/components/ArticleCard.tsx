import React from "react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  postId: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  imageUrl: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ postId, title, summary, tags, date, imageUrl }) => {
  return (
    <Link to={`/posts/${postId}`} className="block">
      <div className="flex items-start gap-6 py-6 border-b border-gray-200 hover:bg-gray-50 transition">
        <div className="w-[282px] h-[168px] bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 rounded-md">
          <img src={imageUrl} alt="썸네일" className="w-full h-full" />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h2>

          <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{summary}</p>

          <div className="flex flex-wrap gap-2 mt-14">
            {tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-700 bg-gray-100 rounded-full px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-gray-400 text-right mt-1">{date}</div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
