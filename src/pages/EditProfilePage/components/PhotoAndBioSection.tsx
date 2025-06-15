import axios from "axios";

interface ProfileSectionProps {
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  bio: string;
}

const ProfileSection = ({
  previewUrl,
  setPreviewUrl,
  imageFile,
  setImageFile,
  bio
}: ProfileSectionProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return alert("이미지를 먼저 선택해주세요.");

    try {
      const presignRes = await axios.get(
        `/mypage/members/profile-image/presign?filename=${imageFile.name}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      const { uploadUrl, fileUrl } = presignRes.data.data;
      await axios.put(uploadUrl, imageFile, {
        headers: { "Content-Type": imageFile.type }
      });
      await axios.patch(
        "/mypage/members/profile-image",
        { imageUrl: fileUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        }
      );
      alert("프로필 이미지가 성공적으로 변경되었습니다!");
      setPreviewUrl(fileUrl);
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateBio = async () => {
    const newBio = (document.getElementById("bio") as HTMLTextAreaElement)
      .value;
    try {
      await axios.patch("/mypage/members/bio", { bio: newBio });
      alert("소개글이 수정되었습니다!");
    } catch (err) {
      console.error("소개글 수정 실패", err);
      alert("소개글 수정 중 오류 발생");
    }
  };

  return (
    <div className="bg-white border shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-3">프로필 관리</h2>
      <div className="flex space-x-4 mb-4">
        <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
          <img
            src={previewUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button
            onClick={handleUploadImage}
            className="mt-3 bg-sub1 text-black px-0.5 py-2 rounded font-bold"
          >
            이미지 변경하기
          </button>
        </div>
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="bio"
        >
          소개글 수정하기
        </label>
        <textarea
          id="bio"
          className="shadow bg-gray-150 border rounded w-full py-2 px-3 text-gray-600 h-32"
          defaultValue={bio ?? "소개글을 입력하세요"}
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={handleUpdateBio}
            className="bg-sub1 text-black font-bold py-2 px-4 rounded"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
