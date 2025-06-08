import PageNavigator from "../../components/common/PageNavigator";
import TagSelect from "../../components/common/TagSelect";
import LongSearchBar from "./components/LongSearchBar";
import SearchResultPosts from "./components/SearchResultPosts";
import { Tags } from "../../mocks/MockTags";
import { useState } from "react";

function SearchResultPage() {
    const [query, setQuery] = useState<string>("");
  
  return (
    <div className="w-[1200px] mx-auto mt-[55px] mb-[70px]">
      <div className="flex items-start text-[38px] font-semibold text-black">
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
  );
}
export default SearchResultPage;