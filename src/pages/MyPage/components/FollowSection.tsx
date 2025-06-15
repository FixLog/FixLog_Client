import { useState, useEffect } from "react";
import UserListModal from "./UserListModal";
import axios from "axios";

import type {
  User_Follower,
  User_Following,
  SimplifiedUser
} from "../types/follow";

interface FollowListSectionProps {
  followers: User_Follower[];
  following: User_Following[];
  followersCount: number;
  followingCount: number;
}

const FollowListSection = ({
  followers = [],
  following = [],
  followersCount,
  followingCount
}: FollowListSectionProps) => {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [simplifiedFollowers, setSimplifiedFollowers] = useState<
    SimplifiedUser[]
  >([]);
  const [simplifiedFollowing, setSimplifiedFollowing] = useState<
    SimplifiedUser[]
  >([]);

  const followingIds = new Set(
    Array.isArray(following) ? following.map((f) => f.following_id) : []
  );

  useEffect(() => {
    if (Array.isArray(followers) && Array.isArray(following)) {
      const mapped = followers.map((f) => ({
        id: f.follower_id,
        nickname: f.nickname,
        isFollowing: followingIds.has(f.follower_id)
      }));

      const followingMapped = following.map((f) => ({
        id: f.following_id,
        nickname: f.nickname,
        isFollowing: true
      }));

      setSimplifiedFollowers(mapped);
      setSimplifiedFollowing(followingMapped);
    }
  }, [followers, following]);

  const toggleFollow = async (userId: number) => {
    const updateList = (list: SimplifiedUser[]) =>
      list.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      );

    setSimplifiedFollowers((prev) => updateList(prev));
    setSimplifiedFollowing((prev) => updateList(prev));

    try {
      const user =
        simplifiedFollowing.find((u) => u.id === userId) ||
        simplifiedFollowers.find((u) => u.id === userId);
      if (user?.isFollowing) {
        await axios.delete("/follow/unfollow", {
          data: { target_member_id: userId }
        });
      } else {
        await axios.post("/follow", { target_member_id: userId });
      }
    } catch (err) {
      console.error("팔로우/언팔로우 실패:", err);
    }
  };
  return (
    <div className="flex gap-4 mt-2 text-sm">
      <button onClick={() => setShowFollowersModal(true)}>
        팔로워
        {/* {followersCount} */}
      </button>
      <button onClick={() => setShowFollowingModal(true)}>
        팔로잉
        {/* {followingCount} */}
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
