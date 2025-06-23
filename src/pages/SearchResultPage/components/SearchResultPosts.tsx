import PostPreview from "../../../components/common/PostPreview";
// import { useState } from "react";
import type { Post } from "../../../api/search";
import PostDefaultImage from "../../../assets/img/PostDefaultImage.png"



interface SearchResultPostsProps {
  posts?: Post[];
  query: string; 
}

function SearchResultPosts({ posts, query }: SearchResultPostsProps) {
  // const [sortOption, setSortOption] = useState<"latest" | "popular">("latest");
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-10 mt-[100px] mb-[100px]">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center items-center mt-[44px]">
        <div className="flex w-[1200px] justify-between">
          {query.trim() !== "" && (
            <div className="text-[28px] font-bold text-gray-800 mt-[20px]">
              ‘{query}’ 검색 결과
            </div>
          )}

          {/* 추후 구현 */}
          {/* <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as "latest" | "popular")}
            className="border border-gray-300 rounded-3xl px-4 py-2"
          >
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select> */}
        </div>
      </div>
      <div className="flex flex-col items-center mt-10">
        {posts.map((post) => (
          <PostPreview
            key={post.postId}
            id={post.postId}
            title={post.title}
            summary={post.content.slice(0, 200)} // 200자 이하로 요약
            img={post.writerProfileImage ?? PostDefaultImage} // null 또는 undefined일 경우 대체 이미지
            tags={post.tags}
            date={new Date(post.createdAt).toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResultPosts;


