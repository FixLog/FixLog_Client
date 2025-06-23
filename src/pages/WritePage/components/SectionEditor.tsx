import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ImageUploadModal } from "./ImageModal";

interface SectionEditorProps {
  sectionKey: string;
  onSelectCoverImage?: (url: string) => void;
}

export default function SectionEditor({ sectionKey, onSelectCoverImage }: SectionEditorProps) {
  const queryClient = useQueryClient();
  const cacheKey = ["draft", sectionKey];

  const cached = queryClient.getQueryData<string>(cacheKey) ?? "";
  const [value, setValue] = useState(cached);
  const [showModal, setShowModal] = useState(false);
  const [lastImageUrl, setLastImageUrl] = useState<string | null>(null);
  const [isCoverSelected, setIsCoverSelected] = useState(false);

  useEffect(() => {
    if (cached === "") {
      queryClient.setQueryData(cacheKey, "");
    }
  }, []);

  const handleChange = (val: string | undefined) => {
    setValue(val ?? "");
    queryClient.setQueryData(cacheKey, val ?? "");
  };

  const handleUploadSuccess = (markdownImage: string) => {
    const newValue = `${value}\n\n${markdownImage}`.trim();
    handleChange(newValue);
    const match = markdownImage.match(/\((.*?)\)/);
    const imageUrl = match?.[1];
    if (imageUrl) {
      setLastImageUrl(imageUrl);
      setIsCoverSelected(false);
    }
  };

  const handleSelectCover = () => {
    if (lastImageUrl) {
      onSelectCoverImage?.(lastImageUrl);
      setIsCoverSelected(true);
    }
  };

  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={handleChange} height={500} />

      <div className="mt-2 flex gap-2">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-main text-black rounded hover:bg-blue-600"
        >
          이미지 삽입
        </button>

        {lastImageUrl && (
          <button
            onClick={handleSelectCover}
            className={`px-4 py-2 rounded text-sm transition 
              ${isCoverSelected ? "bg-main text-black" : "bg-gray-200 hover:bg-gray-300 text-black"}`}
          >
            대표 이미지로 선택
          </button>
        )}
      </div>

      {showModal && (
        <ImageUploadModal
          onClose={() => setShowModal(false)}
          onUploadSuccess={(url) => handleUploadSuccess(url)}
        />
      )}
    </div>
  );
}
