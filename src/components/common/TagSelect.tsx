import { useState } from "react";

import DropDownButtonIcon from "../../assets/img/DropDownButtonIcon.png";
import PythonIcon from "../../assets/img/PythonIcon.png"; 
import CloseIcon from "../../assets/img/DropDownCloseButton.png"; 

// TODO: 태그 클릭했을 때 나오는 화면 위치 버튼별로 조정하기 (디자인 확인 후 작업)

interface TagSelectParams {
    Tags: Record<string, string[]>;
}

const TagSelect = ({ Tags }: TagSelectParams) => {
    return (
      <div className="flex gap-[16px] justify-left mt-[20px]">
        {Object.entries(Tags).map(([label, options]) => (
          <DropdownTagButton
            key={label}
            defaultLabel={label}
            options={options}
          />
        ))}
      </div>
    );
  };

interface DropdownTagButtonProps {
  options: string[];
  defaultLabel: string;
}

const DropdownTagButton = ({ options, defaultLabel }: DropdownTagButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>(defaultLabel);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (option: string) => {
    setSelectedTag(`# ${option}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-between px-[11px] py-[15px] rounded-xl text-[16px] border-[1.5px] text-gray-600 w-[131px] h-[42px]
          ${selectedTag !== defaultLabel ? "bg-gray-150 font-semibold border-transparent" : "bg-white border-gray-300"}
        `}
      >
        <span>{selectedTag}</span>
        <img src={DropDownButtonIcon} className="w-[16px] h-[16px]" />
      </button>

      {isOpen && (
        <div className="absolute z-20 top-[0px] left-0 w-[760px] h-[214px] bg-white border-[1.5px] border-gray-300 rounded-xl overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <span className="text-gray-700">{defaultLabel}</span>
            <button onClick={() => setIsOpen(false)}>
              <img src={CloseIcon} alt="닫기" className="w-[16px] h-[16px]" />
            </button>
          </div>
          <ul>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer border-b last:border-0"
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
