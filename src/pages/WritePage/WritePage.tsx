import { useEffect, useRef, useState } from "react";
import Accordion from "./components/Accordion";
import SectionEditor from "./components/SectionEditor";

const sections = [
  { title: "문제 상황", key: "problem" },
  { title: "에러 메시지", key: "error" },
  { title: "개발 환경", key: "env" },
  { title: "재현 코드", key: "reproduce" },
  { title: "해결 코드", key: "solution" },
  { title: "원인 분석", key: "cause" },
  { title: "참고 링크", key: "link" },
  { title: "기타", key: "etc" }
];

export default function WritePage() {
  const [title, setTitle] = useState("제목을 입력하세요");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
    {isEditing ? (
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setIsEditing(false);
        }}
        className="text-2xl font-bold w-full border-b border-gray-300 focus:outline-none pb-1"
      />
    ) : (
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        {title || "제목을 입력하세요"}
      </h1>
    )}

    <p className="text-sm text-gray-500 mt-1 mb-6">태그를 입력하세요</p>
      {sections.map((section) => (
        <Accordion
          key={section.key}
          title={section.title}
          sectionKey={section.key}
        >
          <SectionEditor sectionKey={section.key} />
        </Accordion>
      ))}
    </div>
  );
}
