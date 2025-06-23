export const Tags: Record<string, string[]> = {
  "# 파트": ["backend", "data analysis", "machine-learning", "frontend"],
  "# 대분류": [
    "django",
    "keras",
    "kubernetes",
    "matplotlib/seaborn",
    "next.js",
    "node.js",
    "o-auth",
    "pandas",
    "pytorch",
    "react",
    "react-native",
    "scikit-learn",
    "spring-boot"
  ],
  "# 중분류": ["c", "css", "haskell", "java", "java-script", "json", "python", "r"],
  "# 소분류": [
    "404-error",
    "500-error",
    "class-not-found",
    "cors-error",
    "db-timeout",
    "http-error",
    "null-pointer-exception",
    "out-of-memory",
    "permission-error",
    "render-loo",
    "state-missing",
    "style-break",
    "undefined-property"
  ]
};

export const TagDisplayName: Record<string, string> = {
  // # 파트
  backend: "백엔드",
  "data analysis": "데이터분석",
  "machine-learning": "머신러닝",
  frontend: "프론트엔드",

  // # 대분류
  django: "장고",
  keras: "케라스",
  kubernetes: "쿠버네티스",
  "matplotlib/seaborn": "matplotlib/seaborn",
  "next.js": "넥스트",
  "node.js": "노드",
  "o-auth": "OAuth 2.0",
  pandas: "판다스",
  pytorch: "파이토치",
  react: "리액트",
  "react-native": "리액트 네이티브",
  "scikit-learn": "사이킷런",
  "spring-boot": "스프링부트",

  // # 중분류
  c: "C",
  css: "css",
  haskell: "Haskell",
  java: "자바",
  "java-script": "자바스크립트",
  json: "JSON",
  python: "파이썬",
  r: "R",

  // # 소분류
  "404-error": "404 Not Found",
  "500-error": "500 Internal Server Error",
  "class-not-found": "ClassNotFoundException",
  "cors-error": "CORS 정책 오류",
  "db-timeout": "Database connection timeout",
  "http-error": "HTTP 에러",
  "null-pointer-exception": "NullPointerException",
  "out-of-memory": "OutOfMemoryError",
  "permission-error": "Permission Error",
  "render-loo": "렌더링 무한 루프",
  "state-missing": "상태(state) 업데이트 누락",
  "style-break": "스타일 깨짐",
  "undefined-property": "Cannot read property of undefined"
};
