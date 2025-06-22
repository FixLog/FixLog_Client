import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderSection from "./components/HeaderSection";
import AccountSection from "./components/AccountSection";
import PhotoAndBioSection from "./components/PhotoAndBioSection";
import PostDefaultImage from "../../assets/img/PostDefaultImage.png";

interface ProfileData {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  bio: string | null;
  socialType: string;
}

function EditProfilePage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(PostDefaultImage);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`${apiUrl}/members/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data.data;
        setProfileData(data);
        setNickname(data.nickname);
        setBio(data.bio ?? "");
        setPreviewUrl(data.profileImageUrl ?? PostDefaultImage);
      } catch (err) {
        console.error("회원정보 불러오기 실패:", err);
        alert("회원 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [apiUrl, navigate]);

  const getAuthHeader = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return null;
    }
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const handleUpdateNickname = async () => {
    const config = getAuthHeader();
    if (!config) return;
    if (profileData && nickname === profileData.nickname) {
      return alert("닉네임이 변경되지 않았습니다.");
    }
    try {
      await axios.patch(
        `${apiUrl}/mypage/members/nickname`,
        { nickname },
        config
      );
      alert("닉네임이 수정되었습니다!");
      setProfileData((prev) => (prev ? { ...prev, nickname } : null));
    } catch (err) {
      console.error("닉네임 수정 실패:", err);
      alert("닉네임 수정 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateBio = async () => {
    const config = getAuthHeader();
    if (!config) return;
    if (profileData && bio === (profileData.bio ?? "")) {
      return alert("소개글이 변경되지 않았습니다.");
    }
    try {
      await axios.patch(`${apiUrl}/mypage/members/bio`, { bio }, config);
      alert("소개글이 수정되었습니다!");
      setProfileData((prev) => (prev ? { ...prev, bio } : null));
    } catch (err) {
      console.error("소개글 수정 실패:", err);
      alert("소개글 수정 중 오류가 발생했습니다.");
    }
  };

  const handleUpdatePassword = async () => {
    const config = getAuthHeader();
    if (!config) return;
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
      return alert("모든 비밀번호 필드를 올바르게 입력해주세요.");
    }
    try {
      await axios.patch(
        `${apiUrl}/mypage/members/password`,
        { currentPassword, newPassword },
        config
      );
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("비밀번호 변경 실패:", err);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateImage = async () => {
    const config = getAuthHeader();
    if (!config) return; // accessToken 없으면 return
    if (!imageFile) return alert("이미지를 먼저 선택해주세요."); // handleImageChange 실행 안되면 return
    try {
      const presignRes = await axios.get(
        `${apiUrl}/mypage/members/profile-image/presign?filename=${imageFile.name}`,
        config
      );
      const { uploadUrl, fileUrl } = presignRes.data.data;
      const patchConfig = {
        headers: { ...config.headers, "Content-Type": "application/json" }
      };
      await axios.put(uploadUrl, {
        headers: { "Content-Type": imageFile.type },
        body: imageFile.name
      });
      await axios.patch(
        `${apiUrl}/mypage/members/profile-image`,
        { imageUrl: fileUrl },
        patchConfig
      );
      alert("프로필 이미지가 성공적으로 변경되었습니다!");
      setPreviewUrl(fileUrl);
      setImageFile(null);
    } catch (err) {
      console.error("이미지 업로드 실패:", err);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div className="p-6">회원 정보를 불러오는 중입니다...</div>;
  }

  if (!profileData) {
    return <div className="p-6">회원 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div>
      <HeaderSection isLogin={true} />
      <main className="max-w-[900px] mx-auto px-8 pt-12">
        <h1 className="text-2xl font-bold mb-10">회원 정보 수정</h1>
        <AccountSection
          email={profileData.email}
          nickname={nickname}
          onNicknameChange={(e) => setNickname(e.target.value)}
          onUpdateNickname={handleUpdateNickname}
          currentPassword={currentPassword}
          onCurrentPasswordChange={(e) => setCurrentPassword(e.target.value)}
          newPassword={newPassword}
          onNewPasswordChange={(e) => setNewPassword(e.target.value)}
          confirmPassword={confirmPassword}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          onUpdatePassword={handleUpdatePassword}
        />
        <PhotoAndBioSection
          previewUrl={previewUrl}
          onImageChange={handleImageChange}
          onUpdateImage={handleUpdateImage}
          bio={bio}
          onBioChange={(e) => setBio(e.target.value)}
          onUpdateBio={handleUpdateBio}
        />
      </main>
    </div>
  );
}

export default EditProfilePage;
