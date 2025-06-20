import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import FixlogLogo from "../../assets/img/FixlogLogo.png";

function LoginPage () {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // 아이디·비밀번호 찾기
  const handleFind = () => {
    navigate('/');
  };

  // 로그인 버튼 (API)
  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const loginData = await response.json();
        const accessToken = loginData.data.accessToken;

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          console.log("Access Token 저장:", accessToken);
        }
        console.log("로그인 성공");
        navigate('/');

      } else {
        console.error("로그인 실패");
        setShowModal(true);
      }

    } catch (error) {
      console.error("로그인 실패: ", error);
      setShowModal(true);
    }
  };

  // Github 계정으로 로그인 버튼
  const handleGithubLogin = () => {
    navigate('/');
  };

  // 회원가입
  const handleSignup = () => {
    navigate('/signup');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  // 빌드 오류 해결용으로 주석 처리..! (나중에 실제 사용 시 주석 해제 필요)
  // const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const LoginErrorModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center w-[488px] h-[228px] bg-white rounded-[8px] p-[50px] text-center shadow-lg">
        <p className="font-semibold text-center text-[22px] text-gray-700 mb-[40px] cursor-default">이메일과 비밀번호를 다시 확인해 주세요.</p>
        <Button 
          onClick={() => setShowModal(false)}
          text="확인" fontSize="text-[18px]" width="w-[384px]" bgColor="bg-gray-800" textColor="text-white"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center font-pretendard mb-[70px]">
      <Header isLogin={true}/>
      <img src={FixlogLogo} className="h-[60px] w-auto mt-[70px] mb-[20px]" />
      <p className="text-2xl font-semibold text-gray-600 mb-[64px] cursor-default">
        로그인하고 에러 검색하러 가기
      </p>

      {/*이메일*/}
      <div className="w-[384px] mb-[24px] cursor-default">
        <p className="text-[16px] font-semibold text-gray-750 mb-[10px]">이메일</p>
        <div>
          <input 
            type="email" 
            className="bg-gray-150 text-gray-900 w-[384px] h-[54px] rounded-[8px] p-[15px] border border-transparent outline-none focus:bg-white focus:border-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      {/*비밀번호*/}
      <div className="w-[384px] mb-[48px] cursor-default">
        <p className="text-[16px] font-semibold text-gray-750 mb-[10px]">비밀번호</p>
        <input 
          type="password" 
          className="bg-gray-150 text-gray-900 w-[384px] h-[54px] mr-[10px] rounded-[8px] p-[15px] border border-transparent outline-none focus:bg-white focus:border-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/*로그인 유지 & 아이디·비밀번호 찾기*/}
      <div className="w-[384px] flex justify-between mb-[20px]">
        <label className="flex items-center text-[14px] text-gray-750 cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}
            required
          />
          <div
            className="mr-[8px]"
          >
            {autoLogin ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 17" fill="none">
                <rect y="0.5" width="16" height="16" rx="4" fill="#252525"/>
                <path d="M2.5 9L5.76972 12.2697C6.16918 12.6692 6.81999 12.6587 7.20636 12.2465L14 5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            ) : (
              <div className="w-[16px] h-[16px] border border-gray-400 bg-gray-100 rounded-[4px]" />
            )}
          </div>
          로그인 유지
        </label>

        <button onClick={handleFind} className="border-none text-[14px] text-gray-750 cursor-pointer hover:underline">
          아이디 · 비밀번호 찾기
        </button>
      </div>

      {/*로그인 버튼*/}
      <Button onClick={handleLogin} text="로그인" fontSize="text-[18px]" width="w-[384px]"/>
      
      {/*로그인 오류 모달*/}
      {showModal && <LoginErrorModal/>}
      
      {/*---또는---*/}
      <div className="flex items-center w-[384px] my-[16px] cursor-default">
        <hr className="flex-grow border-gray-300"/>
        <span className="text-gray-500 text-[14px] mx-[24px]">또는</span>
        <hr className="flex-grow border-gray-300"/>
      </div>
      
      {/*Github 계정으로 로그인*/}
      <Button onClick={handleGithubLogin} text="Github 계정으로 로그인" fontSize="text-[18px]" width="w-[384px]" bgColor="bg-gray-800" textColor="text-white"/>

      {/*회원가입 버튼*/}
      <div className="flex items-center mt-[48px] cursor-default">
        <span className="text-gray-750 text-[16px] mr-[12px]">아직 회원이 아니신가요?</span>
        <button onClick={handleSignup} className="flex items-center border-none text-gray-750 text-[16px] font-semibold cursor-pointer hover:underline">
          회원가입하기
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none" className="ml-[8px]">
            <path d="M1 1.5L6.29289 6.79289C6.68342 7.18342 6.68342 7.81658 6.29289 8.20711L1 13.5" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;