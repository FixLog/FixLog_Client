// import { useState } from "react";
import MainPagePostPreview from "./MainPagePostPreview";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



interface MainPostsProps {
    posts: {
      post_id: number;
      post_title: string;
      post_tag: string[];
      nickname: string;
      created_at: string;
      image_url?: string; 
    }[];
  }
  

function MainPosts ({ posts }: MainPostsProps) {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"latest" | "popular">("latest");


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
                <h2 className="text-[38px] font-semibold text-gray-800">
                    {activeTab === "latest" ? "최신 글" : "인기 글"}
                </h2>
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
                    {posts.map((post) => (
                        <MainPagePostPreview
                            key={post.post_id}
                            id={post.post_id}
                            title={post.post_title}
                            img={post.image_url}
                            tags={post.post_tag}
                            nickname={post.nickname}
                            createdAt={post.created_at}
                      />
                    ))}
                </div>
            </div>
        </div>
            
    )
}

export default MainPosts;