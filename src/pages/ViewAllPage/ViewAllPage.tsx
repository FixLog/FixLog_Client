import PageNavigator from "../../components/common/PageNavigator";
import { mockPosts } from "../../mocks/mockPosts";
import DefaultPost from "../MainPage/components/MainPagePostPreview";
import { useParams } from "react-router-dom";


function ViewAllPage() {

  const { type } = useParams(); 
  const pageTitle = type === "popular" ? "인기 글" : "최신 글"; 

  return (
    <div className="w-[1200px] mx-auto mt-[55px] mb-[100px]">
      <div className="flex items-start text-[38px] font-semibold text-black">
        {pageTitle}
      </div>
      <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-x-[24px] gap-y-[54px] w-[1200px] mt-[106px] items-start">
            {mockPosts.map((post) => (
                <DefaultPost
                key={post.post_id}
                id={post.post_id}
                title={post.post_title}
                img={post.image_url} 
                tag={post.post_tag}
                nickname={post.nickname}
                createdAt={post.created_at}
                />
            ))}
            </div>
        </div>
        <PageNavigator totalPageNumber={13}/>
    </div>
  );
}
export default ViewAllPage;