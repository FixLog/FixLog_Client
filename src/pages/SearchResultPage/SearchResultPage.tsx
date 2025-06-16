import PageNavigator from "../../components/common/PageNavigator";
import TagSelect from "../../components/common/TagSelect";
import LongSearchBar from "./components/LongSearchBar";
import SearchResultPosts from "./components/SearchResultPosts";
import { Tags } from "../../mocks/MockTags";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/common/Header";


function SearchResultPage() {
    const [query, setQuery] = useState<string>("");
  

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get("query") || "";

    useEffect(() => {
      setQuery(initialQuery);
    }, [initialQuery]);

    return (
      <>
      <Header isLogin={false} />
      <div className="w-[1200px] mx-auto mt-[55px] mb-[70px]">
        <div className="font-pretendard flex items-start text-[38px] font-semibold text-black">
          검색 결과
        </div>
        <div className="w-[1199px]">
          <LongSearchBar query = {query} setQuery = {setQuery} />
          <TagSelect Tags = {Tags} />
        </div>
        <div className="flex flex-col items-center">
            <SearchResultPosts />
            <PageNavigator totalPageNumber={13} />
        </div>
      </div>
      </>
    );
}
export default SearchResultPage;