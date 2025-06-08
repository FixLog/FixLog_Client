// MyPageNavTabs.tsx
// 작성자: 이서연
// 마지막 수정 일자: 2025.06.08

import { useState } from "react";

type TabType = "bookmarks" | "likes" | "mywrites" | "forks";

interface MyPageNavTabsProps {
  onTabChange?: (tab: TabType) => void;
}

function MyPageNavTabs({ onTabChange }: MyPageNavTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("mywrites");

  const handleClick = (tab: TabType) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const tabs: { label: string; value: TabType }[] = [
    { label: "내가 쓴 글", value: "mywrites" },
    { label: "북마크한 글", value: "bookmarks" },
    { label: "좋아요한 글", value: "likes" },
    { label: "Fork 한 글", value: "forks" }
  ];

  return (
    <div className="flex border-b border-gray-200 mb-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        const baseClass =
          "px-4 py-2 text-sm font-medium transition-colors duration-150";
        const activeClass = "border-b-2 border-black text-black";
        const inactiveClass = "text-gray-500 hover:text-black";

        return (
          <button
            key={tab.value}
            onClick={() => handleClick(tab.value)}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default MyPageNavTabs;
