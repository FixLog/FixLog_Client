import axiosInstance from "../utils/axiosInstance";

export interface Post {
  postTitle: string;
  coverImage: string | null;
  tags: string[];
  writerProfileImageUrl: string;
  nickname: string;
  createdAt: string;
  likeCount: number;
}

export interface MainPageResponse {
  success: boolean;
  message: string;
  data: {
    userProfileImageUrl: string;
    posts: Post[];
  };
}

export const fetchMainPageByLatest = async (): Promise<MainPageResponse> => {
  const response = await axiosInstance.get<MainPageResponse>(
    "/main",
    {
      params: {
        sort: 0,
        size: 12,
      },
    }
  );
  return response.data;
};

export const fetchMainPageByPopular = async (): Promise<MainPageResponse> => {
  const response = await axiosInstance.get<MainPageResponse>(
    "/main",
    {
      params: {
        sort: 1,
        size: 12,
      },
    }
  );
  return response.data;
};
