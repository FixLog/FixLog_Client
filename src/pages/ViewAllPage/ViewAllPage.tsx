import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import PageNavigator from "../../components/common/PageNavigator";
import DefaultPost from "../MainPage/components/MainPagePostPreview";
import { fetchViewAllPosts, type ViewAllPost } from "../../api/ViewAllPosts";

function ViewAllPage() {
  const { type } = useParams();
  const [posts, setPosts] = useState<ViewAllPost[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 12;

  const getPageTitle = () => {
    switch (type) {
      case "popular":
        return "인기 글";
      case "latest":
        return "최신 글";
      default:
        return "전체 글";
    }
  };
  console.log("현재 페이지 타입:", type);

  const getSortType = (): 0 | 1 => {
    return type === "popular" ? 1 : 0;
  };

  const loadPosts = async (page: number) => {
    try {
      const res = await fetchViewAllPosts({
        sort: getSortType(),
        page,
        size: PAGE_SIZE,
      });
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("전체 글 불러오기 실패", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1); 
  }, [type]);

  useEffect(() => {
    loadPosts(currentPage);
  }, [type, currentPage]);

  const token = localStorage.getItem("accessToken");
  const isLogin = token !== null;

  return (
    <>
      <Header isLogin={isLogin} />
      <div className="w-[1200px] mx-auto mt-[50px]">
        <div className="flex items-start text-[38px] font-semibold font-pretendard text-black">
          {getPageTitle()}
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-x-[24px] gap-y-[54px] w-[1200px] mt-[80px] items-start">
            {posts.map((post, index) => (
              <DefaultPost
                key={index}
                id={post.postId} 
                title={post.postTitle}
                img={
                  post.coverImage && post.coverImage !== "null"
                    ? post.coverImage
                    : undefined
                }
                tags={post.tags}
                nickname={post.nickname}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        </div>

        <PageNavigator
          currentPage={currentPage}
          totalPageNumber={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default ViewAllPage;
