// ProfileSection.tsx
// 작성자: 이서연
// 마지막 수정 일자: 2025.06.08

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserListModal from "./UserListModal";

interface ProfileSectionProps {
  userId: string;
  currentUserId: string;
  isLogin: boolean;
}

interface User {
  id: string;
  nickname: string;
  isFollowing: boolean;
}

const ProfileSection = ({
  userId,
  currentUserId,
  isLogin
}: ProfileSectionProps) => {
  // TODO: 유저 정보 불러오는 api 만들어지면 그거에 맞게 profileData 구조 바꿔야 함
  const [profileData, setProfileData] = useState({
    nickname: "Loading...",
    email: "Loading...",
    followers: 0,
    following: 0,
    bio: "Loading...",
    profileImage: "https://via.placeholder.com/96x96"
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const isMyProfile = userId === currentUserId;

  // 모달 상태 관리
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  // TODO: 실제 팔로워/팔로잉 데이터로 대체해야 함
  // const [followersData, setFollowersData] = useState<User[]>([
  //   { id: "1", nickname: "팔로워1", isFollowing: true },
  //   { id: "2", nickname: "팔로워2", isFollowing: false },
  //   { id: "3", nickname: "팔로워3", isFollowing: true }
  // ]);
  // 린터 오류 때문에 상수로 일단 데이터 작성
  const followersData: User[] = [
    { id: "1", nickname: "팔로워1", isFollowing: true },
    { id: "2", nickname: "팔로워2", isFollowing: false },
    { id: "3", nickname: "팔로워3", isFollowing: true }
  ];

  // const [followingData, setFollowingData] = useState<User[]>([
  //   { id: "4", nickname: "팔로잉1", isFollowing: true },
  //   { id: "5", nickname: "팔로잉2", isFollowing: true },
  //   { id: "6", nickname: "팔로잉3", isFollowing: false }
  // ]);

  const followingData: User[] = [
    { id: "4", nickname: "팔로잉1", isFollowing: true },
    { id: "5", nickname: "팔로잉2", isFollowing: true },
    { id: "6", nickname: "팔로잉3", isFollowing: false }
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // TODO: 맞는 api 주소로 변경해야 함
        const response = await axios.get(`/api/user/${userId}/profile`);
        // ${API_BASE_URL}/api/user/${userId}/profile 이런식으로 baseURL 작성 필요
        setProfileData(response.data);
        // 팔로우 상태 확인
        if (!isMyProfile) {
          const followStatus = await axios.get(
            `/api/user/${userId}/follow-status`
          );
          setIsFollowing(followStatus.data.isFollowing);
        }
      } catch (error) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
        setProfileData((prevData) => ({
          ...prevData,
          nickname: "Error",
          email: "Error",
          bio: "프로필을 불러올 수 없습니다."
        }));
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/follow`);
        setProfileData((prev) => ({ ...prev, followers: prev.followers - 1 }));
        // TODO: 팔로워/팔로잉 데이터도 업데이트
      } else {
        await axios.post(`/follow/unfollow`);
        setProfileData((prev) => ({ ...prev, followers: prev.followers + 1 }));
        // TODO: 팔로워/팔로잉 데이터도 업데이트
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("팔로우/언팔로우 중 오류 발생:", error);
    }
  };

  const handleShowFollowers = () => setShowFollowersModal(true);
  const handleCloseFollowersModal = () => setShowFollowersModal(false);

  const handleShowFollowing = () => setShowFollowingModal(true);
  const handleCloseFollowingModal = () => setShowFollowingModal(false);

  return (
    <div className="flex items-start gap-4 p-4">
      <div className="relative w-24 h-24 rounded-full object-cover justify-center bg-blue-300 border-black">
        <img
          src={profileData.profileImage}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-bold">
              사용자 닉네임
              {profileData.nickname}
            </div>
            <div className="text-gray-600 text-sm">
              사용자 이메일
              {profileData.email}
            </div>
            <div className="flex gap-4 mt-2 text-sm">
              <button
                onClick={handleShowFollowers}
                className="cursor-pointer hover:underline"
              >
                팔로워 3{profileData.followers}
              </button>
              <button
                onClick={handleShowFollowing}
                className="cursor-pointer hover:underline"
              >
                팔로잉 3{profileData.following}
              </button>
            </div>
          </div>
          {isMyProfile ? (
            <Link
              to="/edit-profile-page"
              state={{ isLogin: isLogin }}
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
          <p className="text-sm text-gray-700">
            {" "}
            소개글 3줄 이상 작성??
            {profileData.bio}
          </p>
        </div>
      </div>

      {/* 팔로워 모달 */}
      <UserListModal
        isOpen={showFollowersModal}
        onClose={handleCloseFollowersModal}
        title="팔로워"
        users={followersData}
      />

      {/* 팔로잉 모달 */}
      <UserListModal
        isOpen={showFollowingModal}
        onClose={handleCloseFollowingModal}
        title="팔로잉"
        users={followingData}
      />
    </div>
  );
};

export default ProfileSection;
