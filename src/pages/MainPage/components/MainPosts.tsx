// import { useState } from "react";
import MainPagePostPreview from "./MainPagePostPreview";
import { useNavigate } from "react-router-dom";


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

    const handleViewAllClick = () => {
        navigate(`/view-all`);
    };

    return (
        <div>
            <div className="w-full border-t-[1.5px] border-gray-300" />
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