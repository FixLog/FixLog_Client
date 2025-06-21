import PageNavigator from "../../components/common/PageNavigator";
import { mockPosts } from "../../mocks/mockPosts";
import DefaultPost from "../MainPage/components/MainPagePostPreview";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";

function ViewAllPage() {
  const { type } = useParams();
  
  const getPageTitle = () => {
    switch (type) {
      case "popular":
        return "인기 글";
      case "latest":
        return "최신 글";
      case "mywrites":
        return "내가 쓴 글";
      case "bookmarks":
        return "북마크한 글";
      case "likes":
        return "좋아요한 글";
      case "forks":
        return "Fork 한 글";
      default:
        return "전체 글";
    }
  };

  return (
    <>
    <Header isLogin={true} />
    <div className="w-[1200px] mx-auto mt-[55px] mb-[100px]">
      <div className="flex items-start text-[38px] font-semibold font-pretendard text-black">
        {getPageTitle()}
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-x-[24px] gap-y-[54px] w-[1200px] mt-[106px] items-start">
          {mockPosts.map((post) => (
            <DefaultPost
              key={post.post_id}
              id={post.post_id}
              title={post.post_title}
              img={post.image_url}
              tags={post.post_tag}
              nickname={post.nickname}
              createdAt={post.created_at}
            />
          ))}
        </div>
      </div>
      <PageNavigator totalPageNumber={13} />
    </div>
    </>
  );
}

export default ViewAllPage;