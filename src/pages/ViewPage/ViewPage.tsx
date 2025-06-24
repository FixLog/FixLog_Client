import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Header from "../../components/common/Header";
import ViewComponent from "./components/ViewComponent";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ProfileImage from "../../assets/img/ProfileImage.png"

interface PostInfo {
  userId: number;
  nickname: string;
  postTitle: string;
  coverImageUrl: string;
  problem: string;
  errorMessage: string;
  environment: string;
  reproduceCode: string;
  solutionCode: string;
  causeAnalysis: string;
  referenceLink: string;
  extraContent: string;
  tags: string[];
  writerProfileImage: string;
}

interface PostData {
  postInfo: PostInfo;
  createdAt: string;
  nickname: string;
  profileImageUrl: string;
  liked: boolean;
  marked: boolean;
}

export default function ViewPage() {
  const { post_id } = useParams();
  const [data, setData] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosInstance.get(`/posts/${post_id}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [post_id]);

  if (!data) return <div className="p-8">로딩 중...</div>;

  const {
    postInfo: {
      writerProfileImage,
      postTitle,
      problem,
      errorMessage,
      environment,
      reproduceCode,
      solutionCode,
      causeAnalysis,
      referenceLink,
      extraContent,
      tags
    },
    createdAt,
    // profileImageUrl,
    nickname
  } = data;

  return (
    <div className="relative font-pretendard">
      <Header isLogin={true} />
      <div className="max-w-[1300px] mx-auto h-[65px] w-full z-40 bg-white border-b border-gray-200 py-4 px-6 flex justify-start">
        <div className="text-body1 font-bold text-gray-700">{data.postInfo.nickname}의 블로그</div>
      </div>

      <div className="fixed right-6 top-[350px] text-gray-500 text-sm space-y-4">
        <a href="#problem" className="block hover:font-semibold">
          문제 상황
        </a>
        <a href="#error" className="block hover:font-semibold">
          에러 메시지
        </a>
        <a href="#env" className="block hover:font-semibold">
          개발 환경
        </a>
        <a href="#reproduce" className="block hover:font-semibold">
          재현 코드
        </a>
        <a href="#solution" className="block hover:font-semibold">
          해결 코드
        </a>
        <a href="#cause" className="block hover:font-semibold">
          원인 분석
        </a>
        <a href="#link" className="block hover:font-semibold">
          참고 링크
        </a>
        <a href="#extra" className="block hover:font-semibold">
          기타
        </a>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-[140px] pb-10">
        <h1 className="text-heading1 font-bold mb-2">{postTitle}</h1>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#E1FBB8] text-[#6EAB0C] text-sm px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img src={writerProfileImage || ProfileImage} alt="프로필" className="w-6 h-6 rounded-full" />
            <span>{data.postInfo.nickname}</span>
            <span>|</span>
            <span>{createdAt}</span>
          </div>
          <ViewComponent
            postId={post_id!}
            initialLiked={data.liked}
            initialMarked={data.marked}
            myNickname={nickname}
            authorNickname={data.postInfo.nickname}
          />
        </div>

        <Section id="problem" title="문제 상황" content={problem} />
        <Section id="error" title="에러 메시지" content={errorMessage} />
        <Section id="env" title="개발 환경" content={environment} />
        <Section id="reproduce" title="재현 코드" content={reproduceCode} />
        <Section id="solution" title="해결 코드" content={solutionCode} />
        <Section id="cause" title="원인 분석" content={causeAnalysis} />
        <Section id="link" title="참고 링크" content={referenceLink} />
        <Section id="extra" title="기타" content={extraContent} />
      </div>
    </div>
  );
}

function Section({ id, title, content }: { id: string; title: string; content: string }) {
  if (!content) return null;

  return (
    <section id={id} className="mb-6">
      <h2 className="text-heading3 font-semibold mb-1">{title}</h2>
      <div className="prose prose-sm mt-2 text-gray-800 max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            code({ inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </section>
  );
}
