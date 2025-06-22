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

const ProfileSection = ({
  userId,
  currentUserId,
  isLogin
}: ProfileSectionProps) => {
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        // 다른 유저의 정보를 조회하기 위해 nickname 파라미터 추가
        const configWithParams = token
          ? { ...config, params: { nickname: userId } }
          : { params: { nickname: userId } };

        // 프로필 정보 (이 부분은 '/members/me'로 자신의 정보만 가져오고 있어, 다른 유저 프로필 조회 시 문제가 될 수 있으나 일단 유지합니다)
        const profileRes = await axios.get(`${apiUrl}/members/me`, config);
        const profile = profileRes?.data?.data;
        if (profile) {
          setProfileData(profile);
        } else {
          console.warn("회원 정보가 유효하지 않습니다.");
        }

        // API 명세에 따라 팔로워 목록 주소 변경
        const followersRes = await axios.get(
          `${apiUrl}/follow/followers`,
          configWithParams
        );
        console.log("팔로워 API 응답:", followersRes.data);
        // API 응답 구조에 따라 데이터 추출
        const followers = Array.isArray(followersRes.data)
          ? followersRes.data
          : followersRes.data?.data || [];
        console.log("처리된 팔로워 데이터:", followers);
        setFollowersData(followers);

        // API 명세에 따라 팔로잉 목록 주소 변경
        const followingRes = await axios.get(
          `${apiUrl}/follow/followings`,
          configWithParams
        );
        console.log("팔로잉 API 응답:", followingRes.data);
        // API 응답 구조에 따라 데이터 추출
        const following = Array.isArray(followingRes.data)
          ? followingRes.data
          : followingRes.data?.data || [];
        console.log("처리된 팔로잉 데이터:", following);
        setFollowingData(following);

        // 팔로우 상태
        if (!isMyProfile) {
          // 이 API는 명세에 없음. 다른 로직으로 대체 필요
          const followStatus = await axios.get(
            `${apiUrl}/api/user/${userId}/follow-status`,
            config
          );
          setIsFollowing(followStatus.data.isFollowing);
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        // 에러 발생 시 빈 배열로 초기화
        setFollowersData([]);
        setFollowingData([]);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId, isMyProfile]);

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
      // isFollowing이 true이면 언팔로우(DELETE) 요청
      if (isFollowing) {
        await axios.delete(`${apiUrl}/follow/unfollow`, {
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
    <div className="flex items-start gap-4 p-4">
      <div className="relative w-24 h-24 rounded-full object-cover justify-center bg-blue-300 border-black">
        <img
          src={profileData.profileImageUrl || PostDefaultImage}
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
