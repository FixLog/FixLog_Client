import PageNavigator from "../../components/common/PageNavigator";
import TagSelect from "../../components/common/TagSelect";
import LongSearchBar from "./components/LongSearchBar";
import SearchResultPosts from "./components/SearchResultPosts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/common/Header";
<<<<<<< HEAD
import { fetchSearchResults } from "../../api/search";
import type { Post } from "../../api/search";
=======
>>>>>>> 5d9f64e (fix : font pretendard 로 수정)


function SearchResultPage() {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  // const [page, setPage] = useState<number>(0); // 0-based index

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";
  const initialTags = queryParams.get("tags") || "";
  const initialSelectedTags = initialTags ? initialTags.split(",") : [];

  useEffect(() => {
    setQuery(initialQuery);
    setSelectedTags(initialSelectedTags);
  }, [location.search]); // 쿼리 스트링이 바뀔 때마다 실행

  useEffect(() => {
    if (query || selectedTags.length > 0) {
      fetchSearchResults(query, selectedTags, 0, 5)
        .then((res) => {
          console.log("✅ 검색 결과 응답:", res);
          setPosts(res.content);
          setTotalPages(res.totalPages);
        })
        .catch((err) => {
          console.error("검색 결과 로딩 실패", err);
        });
    }
  }, [query, selectedTags]);
  

<<<<<<< HEAD
  return (
    <>
=======
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get("query") || "";

    useEffect(() => {
      setQuery(initialQuery);
    }, [initialQuery]);

    return (
      <>
>>>>>>> 5d9f64e (fix : font pretendard 로 수정)
      <Header isLogin={false} />
      <div className="w-[1200px] mx-auto mt-[55px] mb-[70px]">
        <div className="font-pretendard flex items-start text-[38px] font-semibold text-black">
          검색 결과
        </div>
        <div className="w-[1199px]">
          <LongSearchBar query={query} setQuery={setQuery} selectedTags={selectedTags} />
          <TagSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        </div>
        <div className="flex flex-col items-center">
          <SearchResultPosts posts={posts} />
          <PageNavigator
            totalPageNumber={totalPages}
            // onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
<<<<<<< HEAD
    </>
  );
=======
      </>
    );
>>>>>>> 5d9f64e (fix : font pretendard 로 수정)
}

export default SearchResultPage;
