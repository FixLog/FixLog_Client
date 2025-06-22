import { useEffect, useRef, useState } from "react";
import Accordion from "./components/Accordion";
import SectionEditor from "./components/SectionEditor";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import TagSelect from "../../components/common/TagSelect";

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
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [title, setTitle] = useState("제목을 입력하세요");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  useEffect(() => {
    sections.forEach((section) => {
      queryClient.removeQueries({ queryKey: ["draft", section.key] });
    });
  }, []);

  const handleCancel = () => {
    const confirmed = window.confirm("홈으로 돌아가시겠어요?");
    if (confirmed) navigate("/");
  };

  const handleSubmit = async () => {
    const data: Record<string, string> = {};
    for (const section of sections) {
      const value = queryClient.getQueryData<string>(["draft", section.key]);
      data[section.key] = value ?? "";
    }

    const requestBody = {
      postTitle: title ?? "",
      coverImageUrl: null,
      problem: data.problem ?? "",
      errorMessage: data.error ?? "",
      environment: data.env ?? "",
      reproduceCode: data.reproduce ?? "",
      solutionCode: data.solution ?? "",
      causeAnalysis: data.cause ?? "",
      referenceLink: data.link ?? "",
      extraContent: data.etc ?? "",
      tags: selectedTags ?? "" 
    };

    try {
      const res = await axiosInstance.post("/posts", requestBody);
      if (res.data.success) {
        alert("등록이 완료되었습니다.");
        navigate("/");
      } else {
        alert("등록 실패: " + res.data.message);
      }
    } catch (err) {
      alert("에러 발생");
      console.error(err);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b flex justify-end gap-4 px-6 py-3 shadow-sm">
        <button
          className="px-6 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
          onClick={handleCancel}
        >
          취소
        </button>
        <button
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      <div className="max-w-3xl mx-auto pt-24 px-4 pb-16">
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

<TagSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} />


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
    </>
  );
}
