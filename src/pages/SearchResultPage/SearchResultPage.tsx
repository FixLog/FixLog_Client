import PageNavigator from "../../components/common/PageNavigator";
import TagSelect from "../../components/common/TagSelect";
import LongSearchBar from "./components/LongSearchBar";
import SearchResultPosts from "./components/SearchResultPosts";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { fetchSearchResults } from "../../api/search";
import type { Post } from "../../api/search";
import SearchResultPageBg from "../../assets/img/SearchResultPageBg.png"

function SearchResultPage() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";
  const initialTags = queryParams.get("tags") || "";
  const initialSelectedTags = initialTags ? initialTags.split(",") : [];

  const [query, setQuery] = useState<string>(initialQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialSelectedTags);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1); 
  const navigate = useNavigate();

  // URL 쿼리 파라미터 업데이트
  useEffect(() => {
    const searchParams = new URLSearchParams();
  
    if (query) {
      searchParams.set("query", query);
    } else {
      searchParams.set("query", "");
    }
  
    if (selectedTags.length > 0) {
      searchParams.set("tags", selectedTags.join(","));
    } else {
      searchParams.set("tags", "");
    }
  
    navigate(`/search-result?${searchParams.toString()}`, { replace: true });
  }, [query, selectedTags]);
  

  // 검색 결과 로드
  useEffect(() => {
    console.log("query:", query);
    console.log("selectedTags:", selectedTags);
    fetchSearchResults(query, selectedTags, page - 1, 5) 
      .then((res) => {
        console.log("검색 결과 응답:", res);
        setPosts(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        console.error("검색 결과 로딩 실패", err); 
      });
  }, [query, selectedTags, page]); 

  const token = localStorage.getItem("accessToken");
  const isLogin = token !== null;

  return (
    <>
    <div
      className="bg-cover bg-center w-full h-[350px]" 
      style={{ backgroundImage: `url(${SearchResultPageBg})` }}
    >
    <Header isLogin={isLogin} />
      <div className="w-[1200px] mx-auto mt-[55px] mb-[55px]">
        <div className="font-pretendard flex items-start text-[38px] font-semibold text-black">
            검색 결과
          </div>
          <div className="w-[1199px]">
            <LongSearchBar query={query} setQuery={setQuery} selectedTags={selectedTags} />
            <TagSelect selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </div>
        <div className="flex flex-col items-center">
          <SearchResultPosts posts={posts} query={query} />
          <PageNavigator
            currentPage={page}
            totalPageNumber={totalPages}
            onPageChange={(p) => setPage(p)} 
          />
        </div>
      </div>
    </div>
      
    </>
  );
}

export default SearchResultPage;
