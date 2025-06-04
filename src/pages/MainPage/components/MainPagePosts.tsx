import { useState } from "react";
import { mockPosts } from "../../../mocks/mockPosts";
import DefaultPost from "./DefaultPost";

function MainPagePosts () {
    const [activeTab, setActiveTab] = useState<"latest" | "popular">("latest");

    return (
        <div>
            <div className="flex justify-center border-b-[1.5px] border-gray-200 mt-[143px] mb-4">
                <div className="flex w-[1200px] justify-start">
                    <div className="flex gap-[8px]">
                        <button
                            onClick={() => setActiveTab("latest")}
                            className={`pb-2 w-[85px] h-[45px] text-[24px] ${
                            activeTab === "latest"
                                ? "text-gray-750 font-semibold border-b-2 border-black"
                                : "text-gray-400"
                            }`}
                        >
                            최신
                        </button>
                        <button
                            onClick={() => setActiveTab("popular")}
                            className={`pb-2 w-[85px] h-[45px] text-[24px] ${
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
                    <button className="flex text-[16px] mt-[23px] text-gray-500 items-center ">
                            전체보기 ›
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-4 gap-x-[24px] gap-y-[54px] w-[1200px] mt-[40px] items-start">
                {mockPosts.map((post) => (
                    <DefaultPost
                    key={post.post_id}
                    id={post.post_id}
                    title={post.post_title}
                    img={post.image_url}
                    tag={post.post_tag}
                    nickname={post.nickname}
                    createdAt={post.created_at}
                    />
                ))}
                </div>
            </div>
        </div>
            
    )
}

export default MainPagePosts;