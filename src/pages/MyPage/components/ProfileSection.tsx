import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FollowSection from "./FollowSection";
import type { User_Follower, User_Following } from "../types/follow";

interface ProfileSectionProps {
  userId: string;
  currentUserId: string;
  isLogin: boolean;
}

const ProfileSection = ({
  userId,
  currentUserId,
  isLogin
}: ProfileSectionProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [profileData, setProfileData] = useState<{
    email: string;
    nickname: string;
    profileImageUrl: string;
    bio: string;
    socialType: string;
  }>({
    email: "Loading...",
    nickname: "Loading...",
    profileImageUrl: "Loading",
    bio: "Loading...",
    socialType: "Loading"
  });

  const [followersData, setFollowersData] = useState<User_Follower[]>([]);
  const [followingData, setFollowingData] = useState<User_Following[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const isMyProfile = userId === currentUserId;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

        // 프로필 정보
        const profileRes = await axios.get(`${apiUrl}/members/me`, config);
        const profile = profileRes?.data?.data;
        if (profile && profile.profileImageUrl) {
          setProfileData(profile);
        } else {
          console.warn("회원 정보가 유효하지 않습니다.");
        }

        // 팔로워 목록
        const followersRes = await axios.get(
          `${apiUrl}/api/user/${userId}/followers`,
          config
        );
        setFollowersData(followersRes.data);

        // 팔로잉 목록
        const followingRes = await axios.get(
          `${apiUrl}/api/user/${userId}/following`,
          config
        );
        setFollowingData(followingRes.data);

        // 팔로우 상태
        if (!isMyProfile) {
          const followStatus = await axios.get(
            `${apiUrl}/api/user/${userId}/follow-status`,
            config
          );
          setIsFollowing(followStatus.data.isFollowing);
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.post(`${apiUrl}/follow`);
        setFollowersData((prev) => prev.slice(0, -1)); // 단순 감소 처리
      } else {
        await axios.delete(`${apiUrl}/follow/unfollow`);
        setFollowersData((prev) => [
          ...prev,
          {
            id: Date.now(), // 임시 ID
            follower_id: Number(currentUserId),
            nickname: "나" // 실제로는 API 재요청이 더 정확함
          }
        ]);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("팔로우/언팔로우 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex items-start gap-4 p-4">
      <div className="relative w-24 h-24 rounded-full object-cover justify-center bg-blue-300 border-black">
        <img
          src={profileData.profileImageUrl}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold">{profileData.nickname}</div>
            <div className="text-gray-600 text-sm">{profileData.email}</div>
            <div className="flex gap-4 mt-2 text-sm">
              <FollowSection
                followers={followersData}
                following={followingData}
                followersCount={followersData.length}
                followingCount={followingData.length}
              />
            </div>
          </div>
          {isMyProfile ? (
            <Link
              to="/edit-profile-page"
              state={{ isLogin: isLogin, profileData: profileData }}
              className="text-gray-600 text-sm cursor-pointer hover:underline"
            >
              회원정보 수정 &gt;
            </Link>
          ) : (
            <button
              onClick={handleFollow}
              className={`px-4 py-2  text-sm font-medium ${
                isFollowing
                  ? "text-main border border-main px-4 py-1 rounded hover:bg-main hover:text-white transition-colors "
                  : "text-white border bg-main border-main px-4 py-1 rounded transition-colors "
              }`}
            >
              {isFollowing ? "언팔로우" : "팔로우"}
            </button>
          )}
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-1">소개</h3>
          <p className="text-sm h-20 text-gray-700">
            {profileData.bio ?? "소개글이 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
