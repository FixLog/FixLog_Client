interface GridArticleCardProps {
  id?: number;
  title: string;
  img?: string;
  summary: string;
  tags: string[];
  nickname: string;
  createdAt: string;
}

const GridArticleCard = ({
  title,
  img,
  summary,
  tags,
  nickname,
  createdAt
}: GridArticleCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm w-full">
      {/* 썸네일 이미지 */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
        {img ? (
          <img src={img} alt="썸네일" className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm text-gray-400">썸네일</span>
        )}
      </div>

      {/* 본문 */}
      <div className="p-4">
        {/* 제목 */}
        <h2 className="text-base font-semibold line-clamp-2 mb-2">{title}</h2>
        <p className="text-xs text-gray-500 flex flex-wrap gap-1 mb-4">
          {summary}
        </p>

        {/* 태그 */}
        <div className="text-xs text-gray-500 flex flex-wrap gap-1 mb-4">
          {tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>

        {/* 작성자 정보 */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{nickname}</span>
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default GridArticleCard;
