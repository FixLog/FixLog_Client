import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FollowSection from "./FollowSection";
import type { User_Follower, User_Following } from "../types/follow";
import PostDefaultImage from "../../../assets/img/PostDefaultImage.png";

interface ProfileSectionProps {
  userId: string;
  currentUserId: string;
  isLogin: boolean;
}

const ProfileSection = ({ userId, currentUserId, isLogin }: ProfileSectionProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [profileData, setProfileData] = useState<{
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    bio: string | null;
    socialType: string;
  }>({
    email: "Loading...",
    nickname: "Loading...",
    profileImageUrl: null,
    bio: "Loading...",
    socialType: "Loading"
  });

  const [followersData, setFollowersData] = useState<User_Follower[]>([]);
  const [followingData, setFollowingData] = useState<User_Following[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const isMyProfile = userId === currentUserId;
  const [refreshKey, setRefreshKey] = useState(0);

  const refetchProfileData = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const configWithParams = token ? { ...config, params: { nickname: userId } } : { params: { nickname: userId } };
        const profileRes = await axios.get(`${apiUrl}/members/me`, config);
        const profile = profileRes?.data?.data;
        if (profile) {
          setProfileData(profile);
        } else {
          console.warn("회원 정보가 유효하지 않습니다.");
        }
        const followersRes = await axios.get(`${apiUrl}/follow/followers`, configWithParams);
        const followers = Array.isArray(followersRes.data) ? followersRes.data : followersRes.data?.data || [];
        setFollowersData(followers);
        const followingRes = await axios.get(`${apiUrl}/follow/followings`, configWithParams);
        const following = Array.isArray(followingRes.data) ? followingRes.data : followingRes.data?.data || [];
        setFollowingData(following);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };
    if (userId) {
      fetchProfileData();
    }
  }, [userId, isMyProfile, refreshKey]);

  const handleFollow = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      // isFollowing이 true이면 언팔로우(POST) 요청
      if (isFollowing) {
        await axios.post(`${apiUrl}/follow/unfollow`, {
          ...config,
          data: { nickname: userId } // 본문에 언팔로우할 유저 닉네임 포함
        });
      } else {
        // isFollowing이 false이면 팔로우(POST) 요청
        await axios.post(`${apiUrl}/follow`, { nickname: userId }, config);
      }

      // API 호출 성공 시 버튼 상태만 변경 (팔로워 수 등은 페이지 새로고침 시 반영)
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("팔로우/언팔로우 중 오류 발생:", error);
      alert("요청 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-start gap-4 pt-4 pb-4">
      <div className="w-[160px] h-[160px] rounded-full object-cover justify-center border border-gray-300 shadow-md overflow-hidden">
        <img
          src={profileData.profileImageUrl || PostDefaultImage}
          alt="프로필 이미지"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col pl-[65px]">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-black text-[26px] font-bold mb-[10px]">{profileData.nickname}</div>
            <div className="text-black text-[19px] font-normal mb-[10px]">{profileData.email}</div>
            <div className="flex gap-4 mt-2 mb-[63.5px]">
              <FollowSection
                followers={followersData}
                following={followingData}
                followersCount={followersData.length}
                followingCount={followingData.length}
                onFollowChange={refetchProfileData}
              />
            </div>
          </div>
          {isMyProfile ? (
            <Link
              to="/edit-profile-page"
              state={{ isLogin: isLogin, profileData: profileData }}
              className="text-gray-700 text-[15px] font-normal cursor-pointer"
            >
              회원정보 수정 &gt;
            </Link>
          ) : (
            <button
              onClick={handleFollow}
              className={`px-4 py-2 text-sm font-medium ${
                isFollowing
                  ? "text-main border border-main px-4 py-1 rounded hover:bg-main hover:text-white transition-colors "
                  : "text-white border bg-main border-main px-4 py-1 rounded transition-colors "
              }`}
            >
              {isFollowing ? "언팔로우" : "팔로우"}
            </button>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-[18px] mb-[16px] text-black">소개</h3>
          <p className="text-[18px] font-normal text-black mb-[62px]">{profileData.bio ?? "소개글이 없습니다."}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
