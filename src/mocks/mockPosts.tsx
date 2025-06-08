interface MockPost {
  post_id: string;
  post_title: string;
  post_tag: string;
  nickname: string;
  created_at: string;
  image_url?: string; 
}

export const mockPosts: MockPost[] = [
    {
      post_id: "1",
      post_title: "나중에 보려고 저장한 링크, 진짜 다시 보신 적 있나요?",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일1",
      post_tag: "#백엔드 #python #apache-kafka #snowflake-cloud-data-platform #cdc",
      nickname: "픽스로그",
      created_at: "2025-04-30T09:00:00Z"
    },
    {
      post_id: "2",
      post_title: "JWT 만료 에러 해결법",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일2",
      post_tag: "#토큰 #인증 #보안",
      nickname: "가나다",
      created_at: "2025-05-01T14:25:36Z"
    },
    {
      post_id: "3",
      post_title: "React에서 무한 렌더링 막는 3가지 방법",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일3",
      post_tag: "#react #useEffect #렌더링",
      nickname: "JS생활자",
      created_at: "2025-05-02T10:12:00Z"
    },
    {
      post_id: "4",
      post_title: "SpringBoot + JPA에서 발생하는 N+1 문제 정복기",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일4",
      post_tag: "#springboot #jpa #querydsl #n+1",
      nickname: "코딩진",
      created_at: "2025-05-03T13:45:10Z"
    },
    {
      post_id: "5",
      post_title: "CSS Flex vs Grid, 언제 어떤 걸 써야 할까?",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일5",
      post_tag: "#css #flex #grid #레이아웃",
      nickname: "디자인도전",
      created_at: "2025-05-04T08:00:00Z"
    },
    {
      post_id: "6",
      post_title: "GitHub Actions로 자동 배포 파이프라인 구축하기",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일6",
      post_tag: "#github-actions #cicd #devops",
      nickname: "배포왕",
      created_at: "2025-05-05T16:20:00Z"
    },
    {
      post_id: "7",
      post_title: "Node.js 비동기 처리 완벽 정리",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일7",
      post_tag: "#nodejs #async #promise #eventloop",
      nickname: "비동기장인",
      created_at: "2025-05-06T12:12:00Z"
    },
    {
      post_id: "8",
      post_title: "개발자 포트폴리오에 꼭 들어가야 할 5가지",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일8",
      post_tag: "#포트폴리오 #취업 #신입개발자",
      nickname: "면접마스터",
      created_at: "2025-05-07T10:00:00Z"
    },
    {
      post_id: "9",
      post_title: "AI로 자동 요약된 코딩 블로그를 만들 수 있을까?",
      // image_url: "https://via.placeholder.com/600x300.png?text=썸네일9",
      post_tag: "#chatgpt #gpt #ai #자동화",
      nickname: "AI도전기",
      created_at: "2025-05-08T15:30:00Z"
    },
    {
      post_id: "10",
      post_title: "Next.js에서 이미지 최적화하는 법",
      post_tag: "#nextjs #image #seo",
      nickname: "풀스택상자",
      created_at: "2025-05-09T09:50:00Z"
    },
    {
      post_id: "11",
      post_title: "Docker로 로컬 개발 환경 꾸미기",
      post_tag: "#docker #container #localdev",
      nickname: "도커박사",
      created_at: "2025-05-10T11:45:00Z"
    },
  ];
  