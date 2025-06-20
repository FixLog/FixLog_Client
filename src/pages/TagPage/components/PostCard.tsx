import { useNavigate } from "react-router-dom";

import ProfileImage from "../../../assets/img/ProfileImage.png";
import PostDefaultImage from "../../../assets/img/PostDefaultImage.png";

function PostCard({ post } : { post: { id: number, title: string, content: string } }) {
    const navigate = useNavigate();

    console.log(post); // 빌드 오류 해결 용 (실제 배포 시 제거)

    return (
        <div 
            className="flex w-[1200px] h-[222px] font-pretendard cursor-pointer"
            onClick={() => navigate(`/post`)}
        >
            <div className="flex flex-col">
                <div className="flex flex-row items-center mb-[8px]">
                    {/*프로필 사진*/}
                    <img src={ProfileImage} className="w-[32px] h-[32px] mr-[12px]" />

                    {/*프로필 닉네임*/}
                    <p className="font-medium text-[16px] text-gray-600 mr-[23px]">픽스로그</p>

                    {/*포스트 발행일*/}
                    <p className="font-normal text-[16px] text-gray-600">2025.04.30.</p>
                </div>

                <div className="flex flex-row">
                    <div className="flex flex-col">
                        {/*제목*/}
                        <p className="text-gray-800 text-[26px] font-semibold leading-[40px] mb-[8px]">
                            “나중에 보려고 저장한 링크, 진짜 다시 보신 적 있나요?”
                        </p>

                        {/*내용*/}
                        <p className="text-gray-600 text-[18px] font-normal leading-[27px] mb-[24px]">
                            그 고민 끝에 만든 서비스가 바로, 링크 드라퍼(Link Dropper)입니다. 왜 만들었을까요? 링크는 정보를 수집하는 가장 쉬운 방법입니다. 하지만 단순히 저장만 하고 마는 경우가 많죠. 링크가 너무 많아서 정리가 어렵고, 나중에 보면...
                        </p>
                        
                        {/*태그*/}
                        <div className="flex flex-wrap text-[14px] text-gray-700 gap-[8px] font-semibold">
                            {["백엔드", "python", "apache-kafka", "snowflake-cloud-data-platform", "cdc", "snowflake-cloud-data-platform", "snowflake-cloud-data-platform", "백엔드", "python", "cdc"].map((tag) => (
                                <span key={tag} className="px-[8px] py-[4px] rounded-[8px] bg-gray-150">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/*이미지*/}
                    <img src={PostDefaultImage} className="w-[282px] h-[179px] ml-[32px]" />
                </div>
            </div>
        </div>
    );
}

export default PostCard;