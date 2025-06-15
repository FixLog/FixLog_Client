import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import HeaderSection from "./components/HeaderSection";
import AccountSection from "./components/AccountSection";
import PhotoAndBioSection from "./components/PhotoAndBioSection";

interface ProfileData {
  email: string;
  nickname: string;
  profileImageUrl: string;
  bio: string | null;
  socialType: string;
}

function EditProfilePage() {
  const location = useLocation();
  const { isLogin, profileData: initialProfileData } = location.state || {};

  const [profileData, setProfileData] = useState<ProfileData | null>(
    initialProfileData ?? null
  );
  // const [loading, setLoading] = useState(!initialProfileData);
  const [previewUrl, setPreviewUrl] = useState(
    profileData?.profileImageUrl ?? ""
  );
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!initialProfileData) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get("/members/me");
          setProfileData(res.data.data);
          setPreviewUrl(res.data.data.profileImageUrl);
        } catch (err) {
          console.error("회원정보 불러오기 실패:", err);
        } finally {
          // setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [initialProfileData]);

  // if (loading || !profileData) {
  //   return <div className="p-6">회원 정보를 불러오는 중입니다...</div>;
  // }

  return (
    <div>
      <HeaderSection isLogin={isLogin} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">회원 정보 수정</h1>
        <AccountSection
          // email={profileData.email}
          email="test@test.com"
          // nickname={profileData.nickname}
          nickname="nickname"
        />
        <PhotoAndBioSection
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          imageFile={imageFile}
          setImageFile={setImageFile}
          // bio={profileData.bio ?? ""}
          bio="test 소개글"
        />
      </div>
    </div>
  );
}

export default EditProfilePage;
