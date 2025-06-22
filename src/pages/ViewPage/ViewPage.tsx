import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

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
    nickname,
    profileImageUrl
  } = data;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">{postTitle}</h1>
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <img src={profileImageUrl} alt="프로필" className="w-6 h-6 rounded-full" />
        <span>{nickname}</span>
        <span>•</span>
        <span>{createdAt}</span>
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-sm px-2 py-1 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <section className="mb-6">
        <h2 className="text-lg font-semibold">문제 상황</h2>
        <p className="bg-red-50 border border-red-300 text-red-700 p-4 mt-2 rounded whitespace-pre-wrap">
          {problem}
        </p>
      </section>

      {errorMessage && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold">에러 메시지</h2>
          <pre className="bg-gray-100 p-3 rounded mt-2 whitespace-pre-wrap">
            {errorMessage}
          </pre>
        </section>
      )}

      <Section title="개발 환경" content={environment} />
      <Section title="재현 코드" content={reproduceCode} />
      <Section title="해결 코드" content={solutionCode} />
      <Section title="원인 분석" content={causeAnalysis} />
      <Section title="참고 링크" content={referenceLink} isLink />
      <Section title="기타" content={extraContent} />
    </div>
  );
}

function Section({ title, content, isLink = false }: { title: string; content: string; isLink?: boolean }) {
  if (!content) return null;
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      {isLink ? (
        <a href={content} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {content}
        </a>
      ) : (
        <p className="whitespace-pre-wrap text-gray-800">{content}</p>
      )}
    </section>
  );
}
