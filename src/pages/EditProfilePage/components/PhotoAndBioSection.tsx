interface PhotoAndBioSectionProps {
  previewUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateImage: () => void;
  bio: string;
  onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onUpdateBio: () => void;
}

const PhotoAndBioSection = ({
  previewUrl,
  onImageChange,
  onUpdateImage,
  bio,
  onBioChange,
  onUpdateBio
}: PhotoAndBioSectionProps) => {
  return (
    <section className="bg-white border shadow-md rounded-lg px-12 py-10 mb-12">
      <h2 className="text-xl font-semibold mb-8">프로필 관리</h2>
      <div className="flex items-start gap-12 mb-10">
        <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
          <img
            src={previewUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <label className="bg-sub1 text-black py-2 px-4 rounded font-bold w-fit cursor-pointer">
            이미지 선택
            <input
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
            />
          </label>
          <button
            onClick={onUpdateImage}
            className="bg-sub1 text-black py-2 px-4 rounded font-bold w-fit"
          >
            이미지 변경하기
          </button>
        </div>
      </div>
      <div>
        <label
          className="block text-gray-700 text-base font-bold mb-2"
          htmlFor="bio"
        >
          소개글
        </label>
        <textarea
          id="bio"
          className="shadow bg-gray-150 border rounded w-full py-3 px-4 text-gray-600 h-32"
          value={bio}
          onChange={onBioChange}
          placeholder="소개글을 입력하세요"
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            onClick={onUpdateBio}
            className="bg-sub1 text-black font-bold py-2 px-6 rounded"
          >
            수정하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default PhotoAndBioSection;
