import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Tag {
    tagName: string;
    tagInfo: string;
  }
  
interface TagCardProps {
    tag: Tag;
}

function TagCard({ tag } : TagCardProps) {
    const navigate = useNavigate();

    // 포스팅 수 랜덤값 생성(1~25)
    const [postCount, setPostCount] = useState(0);
    useEffect(() => {
        setPostCount(Math.floor(Math.random() * 25) + 1);
    }, []);

    return (
        <div 
            className="flex flex-col w-[384px] h-[216px] p-[20px] font-pretendard border rounded-[8px] shadow-sm shrink-0 cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/tag-detail`)}
        >
            {/*태그명*/}
            <span 
                className="w-fit bg-sub2 text-[18px] font-semibold rounded-[8px] px-[8px] py-[4px]"
                style={{ color: '#6EAB0C' }}
            >
                {tag.tagName}
            </span>

            {/*태그 설명*/}
            <p className="text-gray-700 text-16px font-normal leading-[24px] my-[20px]">
                {tag.tagInfo}
            </p>

            {/*포스팅 수*/}
            <div className="flex items-center text-gray-600 text-[14px] mt-auto">
                <p className="mr-[17px]">포스팅</p>
                <p>{postCount}개</p>
            </div>
        </div>
    );
}

export default TagCard;