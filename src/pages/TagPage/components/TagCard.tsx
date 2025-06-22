import { useNavigate } from "react-router-dom";

interface Tag {
    id: number;
    name: string;
    content: string;
  }
  
  interface TagCardProps {
    tag: Tag;
  }

function TagCard({ tag } : TagCardProps) {
    const navigate = useNavigate();

    console.log(tag); // 빌드 오류 해결 용 (실제 배포 시 제거)

    return (
        <div 
            className="w-[384px] h-[216px] p-[20px] font-pretendard border rounded-[8px] shadow-sm shrink-0 cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/tag-detail`)}
        >
            {/*태그명*/}
            <span 
                className="bg-sub2 text-[18px] font-semibold rounded-[8px] px-[8px] py-[4px]"
                style={{ color: '#6EAB0C' }}
            >
                tag-name
            </span>

            {/*태그 설명*/}
            <p className="text-gray-700 text-16px font-normal leading-[24px] mt-[20px] mb-[33px]">
                개발 분야, 언어, 에러 유형 등 다양한 주제를 태그로 분류해 한눈에 확인할 수 있습니다. 관심 있는 태그를 선택하면 관련된 포스트들을 빠르게 탐색할 수 있습니다.
            </p>

            {/*포스팅 수*/}
            <div className="flex items-center text-gray-600 text-[14px]">
                <p className="mr-[17px]">포스팅</p>
                <p>nnnnn개</p>
            </div>
        </div>
    );
}

export default TagCard;