import SearchButton from "../../../assets/img/SearchButton.png";
import SearchIcon from "../../../assets/img/SearchIcon.png";
import FixlogLogoWithText from "../../../assets/img/FixlogLogoWithText.png"
import { useNavigate } from "react-router-dom";

interface ShortSearchBarProps {
    query: string;
    setQuery: (query: string) => void;
    selectedTags: string[];
}

const ShortSearchBar = ({ query, setQuery, selectedTags } : ShortSearchBarProps) => {

    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate(`/search-result?query=${encodeURIComponent(query)}&tags=${selectedTags.join()}`); 
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-[65px] mt-[99px]">
            <img src={FixlogLogoWithText} className="w-[504px]" />
            <div className="flex items-center justify-between bg-gray-100 rounded-xl px-[17px] py-[17px] w-[772px]">
                <div className="flex items-center gap-[20px] w-full">
                    <img src={SearchIcon} alt="검색 아이콘" className="w-[24px] h-[24px]" />
                    <input
                    type="text"
                    placeholder="검색어입력"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full font-pretendard bg-transparent outline-none text-gray-500 placeholder-gray-500 text-[18px]"
                    />
                </div>
            <button
            onClick={handleSearchClick}>
                <img src={SearchButton} alt="검색 실행" className="w-[34px] h-[34px]" />
            </button>
            </div>
        </div>
    );
};

export default ShortSearchBar;

