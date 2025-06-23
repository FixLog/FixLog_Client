import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainPagePostPreview from "./MainPagePostPreview";
import { fetchMainPageByLatest, fetchMainPageByPopular } from "../../../api/MainPagePosts";
import type { Post } from "../../../api/MainPagePosts";
import PostDefaultImage from "../../../assets/img/PostDefaultImage.png"
function MainPosts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"latest" | "popular">("latest");
  const [posts, setPosts] = useState<Post[]>([]);

  // 게시글 불러오기 함수
  const loadPosts = async (tab: "latest" | "popular") => {
    try {
      const response =
        tab === "latest"
          ? await fetchMainPageByLatest()
          : await fetchMainPageByPopular();
      setPosts(response.data.posts);
    } catch (error) {
      console.error("게시글 불러오기 실패", error);
    }
  };

  useEffect(() => {
    loadPosts(activeTab);
  }, [activeTab]);

  const handleViewAllClick = () => {
    navigate(`/view-all/${activeTab}`);
  };

  return (
    <div>
      <div className="flex justify-center mt-[-45px]">
        <div className="flex w-[1200px] justify-start">
          <div className="flex gap-[8px]">
            <button
              onClick={() => setActiveTab("latest")}
              className={`pb-2 w-[85px] h-[45px] font-pretendard text-[24px] ${
                activeTab === "latest"
                  ? "text-gray-750 font-semibold border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              최신
            </button>
            <button
              onClick={() => setActiveTab("popular")}
              className={`pb-2 w-[85px] h-[45px] font-pretendard text-[24px] ${
                activeTab === "popular"
                  ? "text-gray-750 font-semibold border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              인기
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-[44px]">
        <div className="flex w-[1200px] justify-between">
          <p className="text-[38px] font-semibold text-gray-800">
            {activeTab === "latest" ? "최신 글" : "인기 글"}
          </p>
          <button
            className="flex text-[16px] text-gray-500 items-center"
            onClick={handleViewAllClick}
          >
            전체보기 ›
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-x-[24px] gap-y-[54px] w-[1200px] mt-[48px] mb-[69px] items-start">
          {posts.map((post, index) => (
            <MainPagePostPreview
              key={index}
              id={post.postId} 
              title={post.postTitle}
              img={
                post.coverImage && post.coverImage !== "null"
                  ? post.coverImage
                  : PostDefaultImage
              }
              tags={post.tags}
              nickname={post.nickname}
              createdAt={post.createdAt}
              profileImageUrl ={post.writerProfileImageUrl || undefined} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPosts;