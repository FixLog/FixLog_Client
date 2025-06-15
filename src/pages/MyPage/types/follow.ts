// types/follow.ts

// 팔로워(userId 기준으로 나를 팔로우한 사람들)
export interface User_Follower {
  id: number;
  follower_id: number;
  nickname: string;
}

// 팔로잉(userId 기준으로 내가 팔로우한 사람들)
export interface User_Following {
  id: number;
  following_id: number;
  nickname: string;
}

// 모달에서 사용하는 유저 타입
export interface SimplifiedUser {
  id: number;
  nickname: string;
  isFollowing?: boolean;
}
