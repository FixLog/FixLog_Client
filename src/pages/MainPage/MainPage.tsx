import { useState } from "react";

import ShortSearchBar from "./components/ShortSearchBar";
import TagSelect from "../../components/common/TagSelect";
import MainPosts from "./components/MainPosts";
import Header from "../../components/common/Header";

function MainPage() {
  const [query, setQuery] = useState<string>("");
<<<<<<< HEAD
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // isLogin 상태를 localstorage의 토큰 유무로 검사해서 수정해야 함 (추후 작성 예정)
  console.log("query = " + query);
  console.log("selectedTags = " + selectedTags);
=======
  // isLogin 상태를 토큰 유무로 검사해서 수정해야 함
>>>>>>> 5d9f64e (fix : font pretendard 로 수정)
  return (
    <>
    <div className="flex flex-col items-center">
      <Header isLogin={true} />
      <div className="w-[772px]">
        <ShortSearchBar query = {query} setQuery = {setQuery} selectedTags = {selectedTags} />
        <TagSelect selectedTags = {selectedTags} setSelectedTags = {setSelectedTags} />
      </div>
      <div className="w-full">
        <MainPosts />
      </div>
    </div>
    </>
  );
}
export default MainPage;