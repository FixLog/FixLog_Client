import { useNavigate } from "react-router-dom";

import PostDefaultImage from "../../../assets/img/PostDefaultImage.png";

function PostCard({ post } : { post: { id: number, title: string, content: string } }) {
    const navigate = useNavigate();

    console.log(post); // 빌드 오류 해결 용 (실제 배포 시 제거)

    return (
        <div 
            className="flex w-[1167px] h-[168px] font-pretendard cursor-pointer"
            onClick={() => navigate(`/post`)}
        >
            {/*이미지*/}
            <img src={PostDefaultImage} className="w-[282px] h-[168px] mr-[25px]" />
            
            <div className="flex flex-col">
                {/*제목*/}
                <p className="text-[24px] font-semibold leading-[40px]">
                    “나중에 보려고 저장한 링크, 진짜 다시 보신 적 있나요?”
                </p>

                {/*내용*/}
                <div className="mt-[12px] mb-[20px] mr-[40px]">
                    <p className="text-[18px] leading-[28px]">
                        그 고민 끝에 만든 서비스가 바로, 링크 드라퍼(Link Dropper)입니다. 왜 만들었을까요? 링크는 정보를 수집하는 가장 쉬운 방법입니다. 하지만 단순히 저장만 하고 마는 경우가 많죠. 링크가 너무 많아서 정리가 어렵고, 나중에 보면...
                    </p>
                </div>
                
                <div className="flex justify-between items-center text-[14px] text-gray-700">
                    {/*태그*/}
                    <div className="flex flex-wrap gap-[8px] font-semibold">
                        {["백엔드", "python", "apache-kafka", "snowflake-cloud-data-platform", "cdc"].slice(0, 5).map((tag) => (
                            <span key={tag} className="px-[8px] py-[4px] rounded-[8px] bg-gray-150">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    {/*포스트 발행일*/}
                    <p>2025년 6월 25일</p>
                </div>
            </div>
        </div>
    );
}

export default PostCard;