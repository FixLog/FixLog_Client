import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import PostCard from "../../components/tag/PostCard";

function TagDetailPage() {
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);

    const CARDS_PER_PAGE = 6;
    const PAGES_PER_GROUP = 5;

    // code for test
    const postData = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        title: `Post Title ${i + 1}`,
        content: `Post content ${i + 1}`,
    }));

    const paginatedPosts = postData.slice(
        (page - 1) * CARDS_PER_PAGE,
        page * CARDS_PER_PAGE
    );

    const totalPages = Math.ceil(postData.length / CARDS_PER_PAGE);
    const totalGroups = Math.ceil(totalPages / PAGES_PER_GROUP);

    const startPage = pageGroup * PAGES_PER_GROUP + 1;
    const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

    return(
        <div className="flex flex-col items-center font-pretendard">
            <Header/>
            <div className="w-[1167px] my-[74px]">
                {/*태그명*/}
                <p className="text-[38px] font-semibold mb-[20px] cursor-default">tag-name</p>
                
                {/*태그 설명*/}
                <p className="text-gray-700 text-[16px] cursor-default">
                    개발 분야, 언어, 에러 유형 등 다양한 주제를 태그로 분류해 한눈에 확인할 수 있습니다. 관심 있는 태그를 선택하면 관련된 포스트들을 빠르게 탐색할 수 있습니다.
                </p>

                {/*포스트 컴포넌트*/}
                <div className="flex flex-col mt-[68px] gap-[32px]">
                    {paginatedPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                {/*페이지네이션*/}
                <div className="flex justify-center items-center gap-x-[20px] mt-[98px]">
                    {/*이전 페이지 그룹*/}
                    <button
                        disabled={pageGroup === 0}
                        onClick={() => {
                            const newGroup = Math.max(pageGroup - 1, 0);
                            setPageGroup(newGroup);
                            setPage(newGroup * PAGES_PER_GROUP + 1);
                        }}
                        className="w-[24px] h-[24px] flex items-center justify-center border disabled:opacity-30"
                    >
                        {/*왼쪽 화살표*/}
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                            <path d="M6.85882 13.4297L1.28193 7.34727C1.23856 7.30287 1.20399 7.24925 1.18036 7.18971C1.15672 7.13018 1.14453 7.06599 1.14453 7.00112C1.14453 6.93624 1.15672 6.87205 1.18036 6.81252C1.20399 6.75298 1.23856 6.69936 1.28193 6.65496L6.85882 0.572544" stroke="#14161D" strokeWidth="1.07143" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/*페이지 번호*/}
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                        const pageNum = startPage + i;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                className={`flex  w-auto h-[24px] text-[16px] font-bold ${
                                    page === pageNum
                                        ? 'text-sub1'
                                        : 'bg-white text-gray-700'
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    {/*다음 페이지 그룹*/}
                    <button
                        disabled={pageGroup >= totalGroups - 1}
                        onClick={() => {
                            const newGroup = Math.min(pageGroup + 1, totalGroups - 1);
                            setPageGroup(newGroup);
                            setPage(newGroup * PAGES_PER_GROUP + 1);
                        }}
                        className="w-[24px] h-[24px] flex items-center justify-center border disabled:opacity-30"
                    >
                        {/*오른쪽 화살표*/}
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                            <path d="M1.14118 13.4297L6.71807 7.34727C6.76144 7.30287 6.79601 7.24925 6.81964 7.18971C6.84328 7.13018 6.85547 7.06599 6.85547 7.00112C6.85547 6.93624 6.84328 6.87205 6.81964 6.81252C6.79601 6.75298 6.76144 6.69936 6.71807 6.65496L1.14118 0.572544" stroke="#14161D" strokeWidth="1.07143" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TagDetailPage;