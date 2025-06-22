import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ImageUploadModal } from "./ImageModal";

interface SectionEditorProps {
  sectionKey: string;
}

export default function SectionEditor({ sectionKey }: SectionEditorProps) {
  const queryClient = useQueryClient();
  const cacheKey = ["draft", sectionKey];

  const cached = queryClient.getQueryData<string>(cacheKey) ?? "";
  const [value, setValue] = useState(cached);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cached === "") {
      console.log(`Initializing section "${sectionKey}"`);
      queryClient.setQueryData(cacheKey, "");
    }
  }, []);

  const handleChange = (val: string | undefined) => {
    setValue(val ?? "");
    queryClient.setQueryData(cacheKey, val ?? "");
  };

  const handleUploadSuccess = (markdownImageString: string) => {
    const newValue = `${value}\n\n${markdownImageString}`;
    handleChange(newValue);
  };

  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={handleChange} height={500} />

      <button
        onClick={() => setShowModal(true)}
        className="mt-2 px-4 py-2 bg-main text-black rounded hover:bg-blue-600"
      >
        이미지 삽입
      </button>

      {showModal && (
        <ImageUploadModal
          onClose={() => setShowModal(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}
