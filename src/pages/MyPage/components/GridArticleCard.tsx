import { useNavigate } from "react-router-dom";

interface GridArticleCardProps {
  id?: number;
  title: string;
  summary: string;
  tags: string[];
  nickname: string;
  createdAt: string;
  imageUrl: string;
  profileImageUrl: string;
}

const GridArticleCard = ({
  id,
  title,
  summary,
  tags,
  nickname,
  createdAt,
  imageUrl,
  profileImageUrl
}: GridArticleCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (id !== undefined) {
      navigate(`/posts/${id}`);
    }
  };
  return (
    <div
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm w-full cursor-pointer hover:shadow-md transition h-full"
      onClick={handleClick}
      style={{ minHeight: 380 }}
    >
      {/* 썸네일 */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="썸네일" className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm text-gray-400">썸네일</span>
        )}
      </div>
      {/* 본문 */}
      <div className="flex-1 flex flex-col px-4 pt-4 pb-2">
        <h2 className="text-lg font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">{title}</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-2 line-clamp-3">
          {summary.length > 200 ? summary.slice(0, 200) + "..." : summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs text-gray-700 bg-gray-100 rounded-full px-2 py-0.5">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      {/* 작성자/작성일자 하단 고정 */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full overflow-hidden">
            <img src={profileImageUrl} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm text-gray-600">{nickname}</span>
        </div>
        <span className="text-sm text-gray-400">{createdAt}</span>
      </div>
    </div>
  );
};

export default GridArticleCard;
