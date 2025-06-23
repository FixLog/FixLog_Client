import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import heartIcon from "../../../assets/icons/heart.png";
import heartOnIcon from "../../../assets/icons/heartOn.png";
import folderIcon from "../../../assets/icons/folder.png";
import folderOnIcon from "../../../assets/icons/folderOn.png";
import linkIcon from "../../../assets/icons/link.png";
import etcIcon from "../../../assets/icons/etc.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

interface ViewComponentProps {
  postId: string;
  initialLiked: boolean;
  initialMarked: boolean;
  myNickname?: string | null;
  authorNickname: string;
}

export default function ViewComponent({
  postId,
  initialLiked,
  initialMarked,
  myNickname,
  authorNickname
}: ViewComponentProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [marked, setMarked] = useState(initialMarked);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 });
  const etcBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleLike = async () => {
    try {
      await axiosInstance.post(`/posts/${postId}/like`);
      setLiked((prev) => !prev);
    } catch (error: any) {
      const message = error.response?.data?.message || "좋아요에 실패했습니다.";
      alert(message);
      console.error("좋아요 실패:", error);
    }
  };

  const toggleBookmark = async () => {
    try {
      await axiosInstance.post(`/posts/${postId}/bookmark`);
      setMarked((prev) => !prev);
    } catch (error: any) {
      const message = error.response?.data?.message || "북마크에 실패했습니다.";
      alert(message);
      console.error("북마크 실패:", error);
    }
  };

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었습니다.");
    });
  };
  const handleEdit = () => {
    setShowModal(false);
    navigate(`/posts/${postId}/edit`);
  };
  const handleEtcClick = () => {
    if (etcBtnRef.current) {
      const rect = etcBtnRef.current.getBoundingClientRect();
      setModalPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      setShowModal(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        etcBtnRef.current &&
        !etcBtnRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

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
      {myNickname === authorNickname && (
        <>
          <button onClick={handleEtcClick} ref={etcBtnRef}>
            <img src={etcIcon} alt="기타" className="w-5 h-5" />
          </button>
          {showModal && (
            <div
              ref={modalRef}
              className="fixed z-50 bg-white rounded-md shadow-lg py-2"
              style={{ top: modalPos.top + 8, left: modalPos.left - 65 }}
            >
              <button
                onClick={handleEdit}
                className="px-6 py-2 text-sm text-black hover:bg-gray-100 w-full text-left"
              >
                수정하기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
