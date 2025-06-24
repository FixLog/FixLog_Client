// import React from "react";

type TabType = "bookmarks" | "likes" | "mywrites" | "forks";

interface MyPageNavTabsProps {
  onTabChange: (tab: TabType) => void;
  isOwner: boolean;
  activeTab: TabType;
}

function MyPageNavTabs({ onTabChange, isOwner, activeTab }: MyPageNavTabsProps) {
  const tabs: { label: string; value: TabType }[] = isOwner
    ? [
        { label: "내가 쓴 글", value: "mywrites" },
        { label: "북마크", value: "bookmarks" },
        { label: "좋아요", value: "likes" },
        { label: "Fork", value: "forks" }
      ]
    : [{ label: "작성한 글", value: "mywrites" }];

  const handleClick = (tab: TabType) => {
    if (!isOwner && tab !== "mywrites") return;
    onTabChange(tab);
  };

  return (
    <div className="flex border-b border-gray-200 mb-4 py-">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        const baseClass = "py-4 px-[15px] mr-[32.5px] text-[19px] font-bold transition-colors duration-150";
        const activeClass = "border-b-2 border-black font-bold text-black";
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
