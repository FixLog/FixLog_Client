import React, { useRef } from "react";

interface ImageUploadModalProps {
  onClose: () => void;
  onUploadSuccess: (base64Url: string) => void;
}

export const ImageUploadModal = ({ onClose, onUploadSuccess }: ImageUploadModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
  
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/images`, {
        method: "POST",
        body: formData
      });
  
      const json = await res.json();
      if (json.success) {
        onUploadSuccess(json.data); 
        onClose();
      } else {
        alert("업로드 실패: " + json.message);
      }
    } catch (err) {
      console.error(err);
      alert("에러 발생");
    }
  };
  

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        className="bg-white p-6 rounded-lg w-[500px] h-[200px] border-2 border-dashed flex flex-col items-center justify-center text-center text-gray-500"
        onClick={(e) => e.stopPropagation()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label
          htmlFor="upload"
          className="cursor-pointer border border-gray-300 px-4 py-2 rounded-md mb-2"
        >
          파일 선택
        </label>
        <input
          id="upload"
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        또는 여기에 사진을 드래그해보세요.
      </div>
    </div>
  );
};
