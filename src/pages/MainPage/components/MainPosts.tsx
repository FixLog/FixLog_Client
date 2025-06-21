import { useState } from "react";
// import { mockPosts } from "../../../mocks/mockPosts";
import MainPagePostPreview from "./MainPagePostPreview";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../../api/search";

interface MainPostsProps {
  posts?: Post[];
}

function MainPosts ({ posts }: MainPostsProps) {
    const [activeTab, setActiveTab] = useState<"latest" | "popular">("latest");

    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigate(`/view-all/${activeTab}`);
    };
    if (!Array.isArray(posts) || posts.length === 0) {
    return (
        <div className="w-full text-center text-gray-500 py-10">
            게시물이 없습니다.
        </div>
    );
    }
    return (
        <div>
            <div className="flex justify-center border-b-[1.5px] border-gray-200 mt-[143px] mb-4">
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
            <div className="flex justify-center">
                <div className="flex w-[1200px] justify-end">
                    <button className="flex text-[16px] mt-[23px] text-gray-500 items-center "
                        onClick = {handleViewAllClick}
                        >
                            전체보기 ›
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-4 gap-x-[24px] gap-y-[54px] w-[1200px] mt-[40px] mb-[69px] items-start">
                    {posts.map((post) => (
                        <MainPagePostPreview
                        key={post.postId}
                        id={post.postId}
                        title={post.title}
                        img={post.writerProfileImage} 
                        tags={post.tags}
                        nickname={post.writerNickname}
                        createdAt={new Date(post.createdAt).toLocaleDateString()}
                        />
                    ))}
                </div>
            </div>
        </div>
            
    )
}

export default MainPosts;