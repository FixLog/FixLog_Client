import { useState, useEffect } from "react";
import UserListModal from "./UserListModal";
import axios from "axios";

import type { User_Follower, User_Following, SimplifiedUser } from "../types/follow";

interface FollowListSectionProps {
  followers: User_Follower[];
  following: User_Following[];
  followersCount: number;
  followingCount: number;
  onFollowChange?: () => void;
}

const FollowListSection = ({
  followers = [],
  following = [],
  followersCount,
  followingCount,
  onFollowChange
}: FollowListSectionProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [simplifiedFollowers, setSimplifiedFollowers] = useState<SimplifiedUser[]>([]);
  const [simplifiedFollowing, setSimplifiedFollowing] = useState<SimplifiedUser[]>([]);

  const followingIds = new Set(Array.isArray(following) ? following.map((f) => f.following_id) : []);

  useEffect(() => {
    if (Array.isArray(followers) && Array.isArray(following)) {
      const mapped = followers.map((f) => ({
        id: Number(f.follower_id),
        nickname: f.nickname,
        isFollowing: followingIds.has(Number(f.follower_id))
      }));

      const followingMapped = following.map((f) => ({
        id: Number(f.following_id),
        nickname: f.nickname,
        isFollowing: true
      }));

      setSimplifiedFollowers(mapped);
      setSimplifiedFollowing(followingMapped);
    }
  }, [followers, following]);

  const toggleFollow = async (userId: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const currentUser =
      simplifiedFollowers.find((u) => u.id === userId) || simplifiedFollowing.find((u) => u.id === userId);

    if (!currentUser) {
      console.error("사용자를 찾을 수 없습니다:", userId);
      return;
    }
    const isCurrentlyFollowing = currentUser.isFollowing;

    try {
      if (isCurrentlyFollowing) {
        await axios.post(
          `${apiUrl}/follow/unfollow`,
          {
            target_member_id: Number(userId)
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const updateList = (list: SimplifiedUser[]) =>
          list.map((user) => (user.id === userId ? { ...user, isFollowing: !isCurrentlyFollowing } : user));
        setSimplifiedFollowers(updateList);
        setSimplifiedFollowing(updateList);
      } else {
        await axios.post(
          `${apiUrl}/follow`,
          { target_member_id: Number(userId) },
          { headers: { Authorization: `Bearer ${token}`, ContentType: "application/json" } }
        );

        const updateList = (list: SimplifiedUser[]) =>
          list.map((user) => (user.id === userId ? { ...user, isFollowing: !isCurrentlyFollowing } : user));
        setSimplifiedFollowers(updateList);
        setSimplifiedFollowing(updateList);
      }
      if (onFollowChange) onFollowChange();
    } catch (err) {
      console.error("팔로우/언팔로우 실패:", err);
      alert("팔로우/언팔로우 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex gap-4 mt-2 text-sm">
      <button className="flex gap-2 hover:text-gray-600 transition-colors" onClick={() => setShowFollowersModal(true)}>
        팔로워
        <div className="font-medium">{followersCount}</div>
      </button>
      <button className="flex gap-2 hover:text-gray-600 transition-colors" onClick={() => setShowFollowingModal(true)}>
        팔로잉
        <div className="font-medium">{followingCount}</div>
      </button>
      <UserListModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="팔로워"
        users={simplifiedFollowers}
        onToggleFollow={toggleFollow}
      />
      <UserListModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="팔로잉"
        users={simplifiedFollowing}
        onToggleFollow={toggleFollow}
      />
    </div>
  );
};

export default FollowListSection;
