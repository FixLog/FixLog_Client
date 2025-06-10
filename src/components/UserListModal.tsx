// src/components/UserListModal.tsx
// 작성자: 이서연
// 마지막 수정 일자: 2025.06.08

import React from 'react';

interface User {
  id: string;
  nickname: string;
  isFollowing: boolean; // 사용자가 현재 팔로잉하는지 여부
}

interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: User[];
}

const UserListModal: React.FC<UserListModalProps> = ({
  isOpen,
  onClose,
  title,
  users,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            &times;
          </button>
        </div>
        <div>
          {users.length === 0 ? (
            <p className="text-gray-500">목록이 비어 있습니다.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div> {/* 사용자 프로필 사진 */}
                  <span className="font-medium">{user.nickname}</span>
                </div>
                {/* TODO: 팔로우/언팔로우 버튼 기능 추가 */}
                <button
                  className={`px-3 py-1 rounded-full text-sm ${user.isFollowing
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-main text-white'}
                  `}
                >
                  {user.isFollowing ? '팔로잉' : '팔로우'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListModal; 