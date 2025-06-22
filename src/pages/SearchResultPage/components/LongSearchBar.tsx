import SearchIcon from "../../../assets/img/SearchIcon.png";
import { useNavigate } from "react-router-dom";
import SearchButtonImg from "../../../assets/img/SearchButtonImg.png";


interface LongSearchBarProps {
    query: string;
    setQuery: (query: string) => void;
    selectedTags: string[];
}

const LongSearchBar = ({ query, setQuery, selectedTags } : LongSearchBarProps) => {

    const navigate = useNavigate()

    const handleSearchClick = () => {
        navigate(`/search-result?query=${encodeURIComponent(query)}&tags=${selectedTags.join()}`); 
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-[65px] mt-[20px]">
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-[10px] py-[10px] w-[1199px]">
                <div className="flex items-center gap-[20px] w-full">
                    <img src={SearchIcon} alt="검색 아이콘" className="w-[24px] h-[24px] ml-[24px]" />
                    <input
                    type="text"
                    placeholder="검색어입력"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full font-pretendard bg-transparent outline-none text-gray-800 placeholder-gray-500 text-[18px]"
                    />
                </div>
                <button
                    onClick={handleSearchClick}>
                    <img src={SearchButtonImg} alt="검색 실행" className="w-[48px] h-[48px]" />
                </button>
            </div>
        </div>
    );
};

export default LongSearchBar;

