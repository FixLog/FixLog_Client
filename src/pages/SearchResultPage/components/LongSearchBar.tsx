import SearchIcon from "../../../assets/img/SearchIcon.png";

interface LongSearchBarProps {
    query: string;
    setQuery: (query: string) => void;
}

const LongSearchBar = ({ query, setQuery } : LongSearchBarProps) => {

    return (
        <div className="flex flex-col items-center justify-center gap-[65px] mt-[70px]">
            <div className="flex items-center justify-between bg-gray-100 rounded-xl px-[17px] py-[17px] w-[1199px]">
                <div className="flex items-center gap-[20px] w-full">
                    <img src={SearchIcon} alt="검색 아이콘" className="w-[24px] h-[24px]"/>
                    <input
                    type="text"
                    placeholder="검색어입력"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-500 placeholder-gray-500 text-[18px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default LongSearchBar;

