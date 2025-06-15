import React from "react";

interface ArticleCardProps {
  title: string;
  summary: string;
  tags: string[];
  date: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  summary,
  tags,
  date
}) => {
  return (
    <div className="flex items-start gap-6 py-6 border-b border-gray-200">
      <div className="w-24 h-24 bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700 rounded-md">
        <img />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900 leading-snug">
          {title}
        </h2>

        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
          {summary}
        </p>

        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-700 bg-gray-100 rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-xs text-gray-400 text-right mt-1">{date}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
