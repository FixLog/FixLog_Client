import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import PostCard from "./components/PostCard";

function TagDetailPage() {
    // const navigate = useNavigate();

    // 정렬
    const sortOption = ['최신순', '인기순'];

    const [dropdownView, setDropdownView] = useState(false);
    const [selectOption, setSelectOption] = useState(sortOption[0]);

    const handleClickOption = (option: string) => {
        setSelectOption(option);
        setDropdownView(false);
    };

    // 페이지네이션
    const [page, setPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);

    const CARDS_PER_PAGE = 10;
    const PAGES_PER_GROUP = 5;

    // code for test
    const postData = Array.from({ length: 100 }, (_, i) => ({
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
            <Header isLogin = {true}/>
            <div className="w-[1200px] mb-[100px]">
                <p className="font-semibold text-gray-750 text-[38px] mt-[47px] mb-[56px] cursor-default">태그 모음</p>
                <p className="text-gray-700 text-[18px] leading-[27px] cursor-default">
                    개발 분야, 언어, 에러 유형 등 다양한 주제를 태그로 분류해 한눈에 확인할 수 있습니다.<br/>
                    관심 있는 태그를 선택하면 관련된 포스트들을 빠르게 탐색할 수 있습니다.
                </p>

                <div className="flex justify-between mt-[100px] mb-[48px]">
                    {/*태그명*/}
                    <p className="text-gray-800 text-[28px] font-bold cursor-default">
                        tag-name
                    </p>
                    
                    {/*정렬*/}
                    <div className="relative">
                        <div 
                            onClick={() => setDropdownView((prev) => !prev)}
                            className="flex justify-between items-center text-gray-700 text-[16px] w-[108px] h-[40px] rounded-[100px] px-[15px] py-[7px] gap-[6px] border border-gray-300 cursor-pointer"
                        >
                            {selectOption}
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                                <path d="M1 1.33329L6.67692 6.53839C6.71836 6.57887 6.76841 6.61113 6.82397 6.63319C6.87954 6.65525 6.93945 6.66663 7 6.66663C7.06055 6.66663 7.12046 6.65525 7.17603 6.63319C7.23159 6.61113 7.28164 6.57887 7.32308 6.53839L13 1.33329" stroke="#14161D" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>

                        {dropdownView && (
                            <div className="flex flex-col space-y-[16px] absolute top-[49px] z-10 w-[108px] px-[15px] py-[18px] bg-white border border-gray-300 rounded-[8px] shadow-md">
                                {sortOption
                                    .filter(option => option !== selectOption)
                                    .map((option) => (
                                        <div
                                            key={option}
                                            onClick={() => handleClickOption(option)}
                                            className="text-gray-700 text-[16px] text-center hover:bg-gray-100 cursor-pointer"
                                        >
                                            {option}
                                        </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/*포스트 컴포넌트*/}
                <div className="flex flex-col">
                    {paginatedPosts.map((post, idx) => (
                        <div key={post.id} className="flex flex-col">
                            <PostCard post={post} />

                            {idx < paginatedPosts.length - 1 && (
                                <>
                                <div className="my-[40px]">
                                    <hr className="border-gray-300" />
                                </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/*페이지네이션*/}
                <div className="flex justify-center items-center gap-x-[20px] mt-[72px]">
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