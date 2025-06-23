import { useNavigate } from "react-router-dom";
import PostPreviewImage from "../../assets/img/PostPreviewImage.png";

interface PostPreviewProps {
  id: number;
  title: string;
  summary: string;
  img?: string; // 썸네일 이미지가 따로 없다면 기본 이미지 사용
  tags: string[];
  date: string;
  author?: string; 
}

function PostPreview({ id, title, summary, img, tags, date, author }: PostPreviewProps) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <button
      onClick={handlePostClick}
      className="flex w-[1167px] mb-[30px] rounded-xl overflow-hidden bg-white"
    >
      <img
        src={img || PostPreviewImage}
        alt="썸네일"
        className="w-[282px] h-[168px] object-cover rounded-xl"
      />

      <div className="flex flex-col justify-between px-5 py-3 w-full text-left">
        <div>
          <h2 className="font-pretendard text-[23px] font-semibold text-gray-900 mb-1">{title}</h2>
          <p className="font-pretendard text-[18px] text-gray-600 line-clamp-2">
            {summary}
          </p>

          {author && (
            <p className="font-pretendard text-[15px] text-gray-500 mt-2">
              by {author}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-[12px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-pretendard bg-gray-100 text-gray-800 text-[14px] px-2 py-[2px] rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="font-pretendard text-[14px] text-gray-500 mt-2 text-right self-end">
          {date}
        </p>
      </div>
    </button>
  );
}

export default PostPreview;
