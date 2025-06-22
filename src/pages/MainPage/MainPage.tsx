import { useState } from "react";

import ShortSearchBar from "./components/ShortSearchBar";
import TagSelect from "../../components/common/TagSelect";
import MainPosts from "./components/MainPosts";
import Header from "../../components/common/Header";
import MainPageBackgroundImg from "../../assets/img/MainPageBackgroundImg.png";

function MainPage() {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const token = localStorage.getItem("accessToken");
  const isLogin = token !== null;

  return (
    <>
      <div className="flex flex-col items-center">
        <Header isLogin={isLogin} />
        <div 
          className="w-full h-[737px] bg-no-repeat bg-cover bg-center flex flex-col items-center"
          style={{ backgroundImage: `url(${MainPageBackgroundImg})` }}>
          <div className="w-[792px]">
            <ShortSearchBar query={query} setQuery={setQuery} selectedTags={selectedTags} />
            <TagSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </div>
        </div>
        <div className="w-full">
          <MainPosts />
        </div>
      </div>
    </>
  );
}
export default MainPage;