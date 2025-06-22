import { useState } from "react";

import DropDownButtonIcon from "../../assets/img/DropDownButtonIcon.png";
import PythonIcon from "../../assets/img/PythonIcon.png"; 
import CloseIcon from "../../assets/img/DropDownCloseButton.png"; 
import { Tags } from "../../mocks/MockTags"


// TODO: 태그 클릭했을 때 나오는 화면 위치 버튼별로 조정하기 (디자인 확인 후 작업)

interface TagSelectProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagSelect = ({ selectedTags, setSelectedTags }: TagSelectProps) => {
  return (
    <div className="flex gap-[16px] justify-left mt-[20px]">
      {Object.entries(Tags).map(([label, options]) => (
        <DropdownTagButton
          key={label}
          defaultLabel={label}
          options={options}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      ))}
    </div>
  );
};

interface DropdownTagButtonProps {
  options: string[];
  defaultLabel: string;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const DropdownTagButton = ({
  options,
  defaultLabel,
  selectedTags,
  setSelectedTags,
}: DropdownTagButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 현재 카테고리에서 선택된 태그 (저장된 건 # 없이 비교)
  const selectedInCategory = options.find((option) =>
    selectedTags.includes(option)
  );

  // 보여줄 라벨 (선택된 태그는 # 붙이기)
  const labelToShow = selectedInCategory ? `# ${selectedInCategory}` : defaultLabel;

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  
  const handleSelect = (option: string) => {
    // 1. 현재 카테고리에서 선택된 태그 찾기
    const existingIndex = selectedTags.findIndex((tag) =>
      options.includes(tag)
    );
  
    if (existingIndex !== -1) {
      // 2. 이미 선택된 태그가 있다면 → 해당 위치에 새 태그로 교체
      const newTags = [...selectedTags];
      newTags[existingIndex] = option;
      setSelectedTags(newTags);
    } else {
      // 3. 해당 카테고리에서 처음 선택한 경우 → 맨 뒤에 삽입
      setSelectedTags([...selectedTags, option]);
    }
  
    setIsOpen(false);
  };
  

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-between px-[11px] py-[15px] rounded-xl font-pretendard text-[16px] border-[1.5px] text-gray-600 w-[131px] h-[42px]
          ${selectedInCategory ? "bg-sub1 font-semibold border-main" : "bg-white border-gray-300"}
        `}
      >
        <span>{labelToShow}</span>
        <img src={DropDownButtonIcon} className="w-[16px] h-[16px]" />
      </button>

      {isOpen && (
        <div className="absolute z-20 top-[0px] left-0 w-[760px] h-[214px] bg-white border-[1.5px] border-gray-300 rounded-xl overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <span className="font-pretendard text-gray-700">{defaultLabel}</span>
            <button onClick={() => setIsOpen(false)}>
              <img src={CloseIcon} alt="닫기" className="w-[16px] h-[16px]" />
            </button>
          </div>
          <ul>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="flex items-center gap-2 px-4 py-3 font-pretendard text-gray-700 hover:bg-gray-100 cursor-pointer border-b last:border-0"
              >
                <img src={PythonIcon} className="w-[20px] h-[20px]" />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagSelect;
