import axiosInstance from "../utils/axiosInstance";

export interface Post {
  postId: number;
  title: string;
  content: string;
  writerNickname: string;
  writerProfileImage: string;
  tags: string[];
  createdAt: string;
  likeCount: number;
  bookmarkCount: number;
}

export interface SearchResponse {
  content: Post[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export const fetchSearchResults = async (
  keyword: string,
  tags: string[],
  page: number = 0,
  size: number = 5
): Promise<SearchResponse> => {
  const tagQuery = tags.join(",");
  const response = await axiosInstance.get("/main/search", {
    params: {
      keyword,
      tags: tagQuery,
      page,
      size, 
    },
  });
  console.log("📦 전체 axios 응답", response);
  console.log("📦 response.data", response.data);

//   console.log(response.data)
  return response.data.data;
};
