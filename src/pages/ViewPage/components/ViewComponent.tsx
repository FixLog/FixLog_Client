import { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import heartIcon from "../../../assets/icons/heart.png";
import heartOnIcon from "../../../assets/icons/heartOn.png";
import folderIcon from "../../../assets/icons/folder.png";
import folderOnIcon from "../../../assets/icons/folderOn.png";
import linkIcon from "../../../assets/icons/link.png";
import etcIcon from "../../../assets/icons/etc.png";

interface ViewComponentProps {
  postId: string;
  initialLiked: boolean;
  initialMarked: boolean;
}

export default function ViewComponent({ postId, initialLiked, initialMarked }: ViewComponentProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [marked, setMarked] = useState(initialMarked);

  const toggleLike = async () => {
    try {
      await axiosInstance.post(`/posts/${postId}/like`);
      setLiked((prev) => !prev);
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };

  const toggleBookmark = async () => {
    try {
      await axiosInstance.post(`/posts/${postId}/bookmark`);
      setMarked((prev) => !prev);
    } catch (error) {
      console.error("북마크 실패:", error);
    }
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었습니다.");
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button onClick={toggleLike}>
        <img src={liked ? heartOnIcon : heartIcon} alt="좋아요" className="w-5 h-5" />
      </button>
      <button onClick={toggleBookmark}>
        <img src={marked ? folderOnIcon : folderIcon} alt="북마크" className="w-5 h-5" />
      </button>
      <button onClick={copyLink}>
        <img src={linkIcon} alt="링크 복사" className="w-5 h-5" />
      </button>
      <img src={etcIcon} alt="기타" className="w-5 h-5" />
    </div>
  );
}
