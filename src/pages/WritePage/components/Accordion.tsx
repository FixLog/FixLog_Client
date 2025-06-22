import { useState } from "react";
import { IoChevronDown, IoAdd } from "react-icons/io5";

interface AccordionProps {
  title: string;
  sectionKey: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({
  title,
  sectionKey,
  children,
  defaultOpen = false
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <div className="border-b border-gray-200 px-2 py-3">
      <div className="flex justify-between items-center">
        <span className="text-heading4 font-semibold text-black" data-section={sectionKey}>{title}</span>
        <button
          onClick={toggleOpen}
          className="w-[42px] h-[42px] bg-white border border-[#D7D7D7] flex items-center justify-center shrink-0"
        >
          {isOpen ? (
            <IoChevronDown className="w-5 h-5 text-gray-500 rotate-180 transition-transform" />
          ) : (
            <IoAdd className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}
