import axiosInstance from "../utils/axiosInstance";

export interface ViewAllPost {
  postTitle: string;
  coverImage: string | null;
  tags: string[];
  writerProfileImageUrl: string;
  nickname: string;
  createdAt: string;
  likeCount: number;
}

export interface ViewAllPostsResponse {
  success: boolean;
  message: string;
  data: {
    userProfileImageUrl: string;
    posts: ViewAllPost[];
    totalPages: number;
  };
}

interface FetchViewAllPostsParams {
  sort: 0 | 1;      // 0: 최신순, 1: 인기순
  page: number;     // 1-based page index
  size: number;     // 페이지당 항목 수
}

// GET 요청 함수
export const fetchViewAllPosts = async ({
  sort,
  page,
  size,
}: FetchViewAllPostsParams): Promise<ViewAllPostsResponse> => {
  const response = await axiosInstance.get<ViewAllPostsResponse>(
    "/main/full",
    {
      params: { sort, page, size },
    }
  );
  return response.data;
};
