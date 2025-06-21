import PostPreview from "../../../components/common/PostPreview";
import { useState } from "react";
import type { Post } from "../../../api/search";


interface SearchResultPostsProps {
  posts?: Post[];
}

function SearchResultPosts({ posts }: SearchResultPostsProps) {
  const [sortOption, setSortOption] = useState<"latest" | "popular">("latest");
  console.log("미친 포스트 호출 결과.." + posts);

  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-10">
        검색 결과가 없습니다.
      </div>
    );
  }

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
        {posts.map((post) => (
          <PostPreview
            key={post.postId}
            id={post.postId}
            title={post.title}
            summary={post.content.slice(0, 200)} // 200자 이하로 요약
            img={post.writerProfileImage} // 프사 or 썸네일
            tags={post.tags}
            date={new Date(post.createdAt).toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResultPosts;


