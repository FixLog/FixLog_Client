import { useNavigate } from "react-router-dom";
import PostPreviewImage from "../../assets/img/PostPreviewImage.png"

interface PostPreviewProps {
  id: number;
  title: string;
  summary: string;
  img?: string;
  tags: string[];
  date: string;
}

function PostPreview({ id, title, summary, img, tags, date }: PostPreviewProps) {
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
        src={img? img : PostPreviewImage}
        alt="썸네일"
        className="w-[282px] h-[168px] object-cover"
      />

      <div className="flex flex-col justify-between px-5 py-3 w-full text-left">
        <div>
          <h2 className="text-[23px] font-semibold text-gray-900 mb-1">{title}</h2>
          <p className="text-[18px] text-gray-600 line-clamp-2">{summary}</p>
          <div className="flex flex-wrap gap-2 mt-[20px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 text-[14px] px-2 py-[2px] rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[14px] text-gray-500 mt-2 text-right self-end">{date}</p>
        </div>
    </button>
  );
}

export default PostPreview;
