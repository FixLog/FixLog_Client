import { useState } from "react";

import ShortSearchBar from "./components/ShortSearchBar";
import TagSelect from "../../components/common/TagSelect";
import { Tags } from "../../mocks/MockTags"
import MainPosts from "./components/MainPosts";

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
        <MainPosts />
      </div>
    </div>
    </>
  );
}
export default MainPage;