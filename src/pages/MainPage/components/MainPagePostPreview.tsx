import { useNavigate } from "react-router-dom";

interface DefaultPostProps {
  id: string;
  title: string;
  img?: string;
  tag: string;
  nickname: string;
  createdAt: string;
}

function DefaultPost({ id, title, img, tag, nickname, createdAt }: DefaultPostProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <button onClick={handleClick} className="w-[282px] text-left">
      <div className="w-full h-[180px] bg-gray-200 rounded-xl overflow-hidden">
        <img src={img} alt="썸네일" className="w-full h-[156px] object-cover" />
      </div>
      <div className="h-[60px]">
      <h2 className="mt-[20px] text-[20px] font-pretendard font-semibold text-gray-700 leading-snug">
        {title}
      </h2>
      </div>
      <div className="mt-[12px] h-[42px] space-y-1 text-sm font-pretendard text-gray-500 leading-tight break-words">
        {tag
          .split(" ")
          .filter((t) => t.trim() !== "")
          .map((t, index) => (
            <span key={index} className="mr-2">
              {t}
            </span>
          ))}
      </div>
      <div className="flex mt-[20px] h=[39px] justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <span className="font-pretendard text-[16px] text-gray-500">{nickname}</span>
        </div>
        <span className="font-pretendard text-[14px] text-gray-500">
          {new Date(createdAt).toISOString().slice(0, 10).replace(/-/g, ".")}
        </span>
      </div>
    </button>
  );
}

export default DefaultPost;
