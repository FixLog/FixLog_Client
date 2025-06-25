import { useState } from "react";
import DropDownButtonIcon from "../../assets/img/DropDownButtonIcon.png";
// import PythonIcon from "../../assets/img/PythonIcon.png";
import CloseIcon from "../../assets/img/DropDownCloseButton.png";
import { Tags, TagDisplayName } from "../../mocks/MockTags";

interface TagSelectProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;  
}

const TagSelect = ({ selectedTags, setSelectedTags }: TagSelectProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);

  const handleOpen = (label: string, options: string[]) => {
    setOpenCategory(label);
    setDropdownOptions(options);
  };

  const handleSelect = (option: string) => {
    const existingIndex = selectedTags.findIndex((tag) => dropdownOptions.includes(tag));
    if (existingIndex !== -1) {
      const newTags = [...selectedTags];
      newTags[existingIndex] = option;
      setSelectedTags(newTags);
    } else {
      setSelectedTags([...selectedTags, option]);
    }
    setOpenCategory(null);
  };

  const getDisplayText = (value: string) => TagDisplayName[value] ?? value;

  return (
    <div className="relative">
      <div className="flex gap-[16px] justify-start mt-[20px]">
        {Object.entries(Tags).map(([label, options]) => {
          const selectedInCategory = options.find((option) => selectedTags.includes(option));
          const labelToShow = selectedInCategory
            ? `# ${getDisplayText(selectedInCategory)}`
            : label;

          return (
            <button
              key={label}
              onClick={() => handleOpen(label, options)}
              className={`flex items-center justify-between px-[11px] py-[15px] rounded-xl font-pretendard text-[16px] border-[1.5px] text-gray-600 min-w-[131px] h-[42px]
              ${selectedInCategory ? "bg-sub1 font-semibold border-main" : "bg-white border-gray-300"}`}
            >
              <span>{labelToShow}</span>
              <img src={DropDownButtonIcon} className="w-[16px] h-[16px]" />
            </button>
          );
        })}
      </div>

      {openCategory && (
        <div className="absolute z-20 left-[0px] top-[0px] w-[792px] h-[214px] bg-white border-[1.5px] border-gray-300 rounded-xl overflow-y-auto">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <span className="font-pretendard text-gray-700">{openCategory}</span>
            <button onClick={() => setOpenCategory(null)}>
              <img src={CloseIcon} alt="닫기" className="w-[16px] h-[16px]" />
            </button>
          </div>
          <ul>
            {dropdownOptions.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="flex items-center gap-2 px-4 py-3 font-pretendard text-gray-700 hover:bg-gray-100 cursor-pointer border-b last:border-0"
              >
                {/* <img src={PythonIcon} className="w-[20px] h-[20px]" /> */}
                <span>{getDisplayText(option)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagSelect;
