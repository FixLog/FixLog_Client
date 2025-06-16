import { useState } from "react";

import ShortSearchBar from "./components/ShortSearchBar";
import TagSelect from "../../components/common/TagSelect";
import { Tags } from "../../mocks/MockTags"
import MainPosts from "./components/MainPosts";
import Header from "../../components/common/Header";

function MainPage() {
  const [query, setQuery] = useState<string>("");
  // isLogin 상태를 토큰 유무로 검사해서 수정해야 함
  return (
    <>
    <div className="flex flex-col items-center">
      <Header isLogin={true} />
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