import { useState } from "react";
import PageNavigationButtonLeft from "../../assets/img/PageNavigationButtonLeft.png";
import PageNavigationButtonRight from "../../assets/img/PageNavigationButtonRight.png";

interface PageNavigatorProps {
  totalPageNumber: number;
}

function PageNavigator({ totalPageNumber }: PageNavigatorProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageGroupSize = 5;

  const pageGroupStart = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
  const pageGroupEnd = Math.min(pageGroupStart + pageGroupSize - 1, totalPageNumber);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPageNumber) {
      setCurrentPage(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPageNumber) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-[20px] mt-[89px] mb-[40px]">
      <button
        onClick={handlePrevPage}
        className="w-[24px] h-[24px] border-[1.5px] p-[3px] border-gray-300 flex items-center justify-center hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        <img src={PageNavigationButtonLeft} alt="이전" />
      </button>

      <div className="flex gap-[20px]">
        {Array.from({ length: pageGroupEnd - pageGroupStart + 1 }, (_, i) => {
          const page = pageGroupStart + i;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`font-bold font-pretendard font-[16px] ${currentPage === page ? "text-main" : "text-gray-800"}`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNextPage}
        className="w-[24px] h-[24px] border-[1.5px] p-[3px] border-gray-300 flex items-center justify-center hover:bg-gray-300"
        disabled={currentPage === totalPageNumber}
      >
        <img src={PageNavigationButtonRight} alt="다음" />
      </button>
    </div>
  );
}

export default PageNavigator;
