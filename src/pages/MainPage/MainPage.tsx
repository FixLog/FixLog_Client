import { useState } from "react";

import ShortSearchBar from "./components/ShortSearchBar";
import TagSelect from "../../components/common/TagSelect";
import { Tags } from "../../mocks/MockTags"
import MainPagePosts from "./components/MainPagePosts";
import PageNavigator from "../../components/common/PageNavigator";

function MainPage() {
  const [query, setQuery] = useState<string>("");
  return (
    <>
    <div className="flex flex-col items-center">
      <div className="w-[772px]">
        <ShortSearchBar query = {query} setQuery = {setQuery} />
        <TagSelect Tags = {Tags} />
      </div>
      <div className="w-full">
        <MainPagePosts />
      </div>
    </div>
    <PageNavigator totalPageNumber={13}/>
    </>
  );
}
export default MainPage;