import PostPreview from "../../../components/common/PostPreview";
import { mockPosts } from "../../../mocks/mockPosts";
import { useState } from "react";

function SearchResultPosts() {
  const [sortOption, setSortOption] = useState<"latest" | "popular">("latest");

    return (
      <div>
        <div className="flex justify-end w-[1200px] mb-6 border-t-[1.5px] border-gray-300 pt-[19px] mt-[45px]"> 
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as "latest" | "popular")}
              className="border border-gray-300 rounded-3xl px-4 py-2"
            >
              <option value="latest">최신순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center mt-10">
          {mockPosts.map((post) => (
            <PostPreview
              key={post.post_id}
              id={parseInt(post.post_id)}
              title={post.post_title}
              summary={`${post.nickname}님의 포스트입니다.`}
              img={post.image_url} 
              tags={post.post_tag.split(" ").map((tag) => tag.replace("#", ""))}
              date={new Date(post.created_at).toLocaleDateString()}
            />
          ))}
        </div>
      </div>
    );
  }
  
  export default SearchResultPosts;