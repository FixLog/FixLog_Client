import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import FixlogLogo from "../../assets/img/FixlogLogo.png";

function SignupPage() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [agree, setAgree] = useState(false);
  
  const [checkEmail, setCheckEmail] = useState<null | boolean>(null);
  const [checkNickname, setCheckNickname] = useState<null | boolean>(null);

  //const [showPassword, setShowPassword] = useState(false);
  //const [showCheckPassword, setShowCheckPassword] = useState(false);

  const isFormValid =
    email.trim() !== "" &&
    nickname.trim() !== "" &&
    password.trim() !== "" &&
    checkPassword.trim() !== "" &&
    agree === true;

  // 이메일 중복 확인 (API)
  const handleEmail = async () => {
    if (email.trim() === '') {
      alert('이메일을 입력하세요.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/members/check-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok && data.success) {
        if (!data.data.duplicated) {
          alert(data.message);  // 사용 가능한 이메일입니다
          setCheckEmail(true);
        } else {
          alert(data.message);  // 이미 사용 중인 이메일입니다
          setCheckEmail(false);
        }
      } else {
        alert('이메일 중복 확인 실패');
        setCheckEmail(false);
      }
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
      alert('이메일 중복 확인 중 오류가 발생했습니다.');
      setCheckEmail(false);
    }
  };

  // 닉네임 중복 확인 (API)
  const handleNickname = async () => {
    if (nickname.trim() === '') {
      alert('닉네임을 입력하세요.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/members/check-nickname?nickname=${encodeURIComponent(nickname)}`);
      const data = await response.json();

      if (response.ok && data.success) {
        if (!data.data.duplicated) {
          alert(data.message);  // 사용 가능한 닉네임입니다
          setCheckNickname(true);
        } else {
          alert(data.message);  // 이미 사용 중인 닉네임입니다
          setCheckNickname(false);
        }
      } else {
        alert('닉네임 중복 확인 실패');
        setCheckNickname(false);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 실패:', error);
      alert('닉네임 중복 확인 중 오류가 발생했습니다.');
      setCheckNickname(false);
    }
  };

  // 회원가입 버튼 (API)
  const handleSignup = async () => {
    if (email.trim() === '') {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!checkEmail) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }
    if (nickname.trim() === '') {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!checkNickname) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    if (password !== checkPassword) {
      alert("입력하신 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/members/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          nickname
        })
      });

      if (response.ok) {
        console.log("회원가입 성공");

        // 회원가입 후 바로 로그인
        const login = await fetch(`${apiUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        });

        if (login.ok) {
          const loginData = await login.json();

          localStorage.setItem('accessToken', loginData.data.accessToken);
          console.log("Access Token 저장:", loginData.data.accessToken);

          navigate('/signup-success');
        } else {
          alert('회원가입 성공, 로그인 실패.');
          navigate('/login');
        }
        
      } else {
        console.error("회원가입 실패");
        alert("회원가입 실패");
      }

    } catch (error) {
      console.error("회원가입 실패: ", error);
      alert("회원가입 실패");
    }
  };

  // Github 계정으로 회원가입 버튼
  const handleGithubSignup = () => {
    navigate('/');
  };

  // 로그인
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center font-pretendard mb-[128px]">
      <Header isLogin={true}/>
      <img src={FixlogLogo} className="h-[60px] w-auto mt-[89px] mb-[20px]" />
      <p className="text-2xl font-semibold text-gray-600 mb-[90px] cursor-default">
        개발자들의 트러블슈팅 커뮤니티 가입하기
      </p>
      
      {/*이메일*/}
      <div className="w-[384px] mb-[24px] cursor-default">
        <p className="text-[16px] font-semibold text-gray-750 mb-[10px]">이메일</p>
        <div className="flex gap-[10px]">
          <input 
            type="email" 
            className="bg-gray-150 text-gray-900 w-[283px] h-[54px] rounded-[8px] p-[15px] border border-transparent outline-none focus:bg-white focus:border-gray-800"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setCheckEmail(null);
            }}
            required
          />
          <Button 
            text="중복 확인"
            onClick={handleEmail} 
            isDisabled={checkEmail === true}
            bgColor={checkEmail === true ? 'bg-gray-300' : 'bg-sub1'}
            textColor={checkEmail === true ? 'text-gray-500' : 'text-gray-750'}
          />
        </div>
      </div>

      {/*닉네임*/}
      <div className="w-[384px] mb-[24px] cursor-default">
        <p className="text-[16px] font-semibold text-gray-750 mb-[10px]">닉네임</p>
        <div className="flex gap-[10px]">
          <input 
            type="text" 
            className="bg-gray-150 text-gray-900 w-[283px] h-[54px] rounded-[8px] p-[15px] border border-transparent outline-none focus:bg-white focus:border-gray-800"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setCheckNickname(null);
            }}
            required
          />
          <Button 
            text="중복 확인"
            onClick={handleNickname} 
            isDisabled={checkNickname === true}
            bgColor={checkNickname === true ? 'bg-gray-300' : 'bg-sub1'}
            textColor={checkNickname === true ? 'text-gray-500' : 'text-gray-750'}
          />
        </div>
        <p className="text-[14px] text-gray-500 mt-[8px]">
          한글, 영문, 숫자, 특수문자 2-20자
        </p>
      </div>

      {/*비밀번호*/}
      <div className="w-[384px] mb-[24px] cursor-default">
        <p className="text-[16px] font-semibold text-gray-750 mb-[10px]">비밀번호</p>
        <input 
          type="password" 
          className="bg-gray-150 text-gray-900 w-[384px] h-[54px] mr-[10px] rounded-[8px] p-[15px] border border-transparent outline-none focus:bg-white focus:border-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-[14px] text-gray-500 mt-[8px]">
          영문, 숫자 조합 8자리 이상
        </p>
      </div>
      
      {/*비밀번호 확인*/}
      <div className="w-[384px] mb-[24px] cursor-default">
        <p className="text-[16px] font-semibold text-gray-750 mb-[10px]">비밀번호 확인</p>
        <input 
          type="password" 
          className="bg-gray-150 text-gray-900 w-[384px] h-[54px] mr-[10px] rounded-[8px] p-[15px] border border-transparent outline-none focus:bg-white focus:border-gray-800"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
          required
        />
      </div>

      {/*개인정보 동의*/}
      <div className="w-[384px] mb-[24px] text-left">
        <label className="flex items-center text-[14px] text-gray-750 mb-[24px] cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <div
            className="mr-[8px]"
          >
            {agree ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 17" fill="none">
                <rect y="0.5" width="16" height="16" rx="4" fill="#252525"/>
                <path d="M2.5 9L5.76972 12.2697C6.16918 12.6692 6.81999 12.6587 7.20636 12.2465L14 5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            ) : (
              <div className="w-[16px] h-[16px] border border-gray-400 bg-gray-100 rounded-[4px]" />
            )}
          </div>
          개인정보 제공 및 활용에 동의합니다.
        </label>
      </div>

      {/*회원가입 버튼*/}
      <Button 
        text="회원가입" 
        fontSize="text-[18px]" 
        width="w-[384px]" 
        height="h-[54px]"
        bgColor={isFormValid ? 'bg-sub1' : 'bg-gray-300'}
        textColor={isFormValid ? 'text-gray-750' : 'text-gray-500'}
        onClick={isFormValid ? handleSignup : undefined}
        isDisabled={!isFormValid}
      />

      {/*---또는---*/}
      <div className="flex items-center w-[384px] my-[16px] cursor-default">
        <hr className="flex-grow border-gray-300"/>
        <span className="text-gray-500 text-[14px] mx-[24px]">또는</span>
        <hr className="flex-grow border-gray-300"/>
      </div>

      {/*Github 회원가입 버튼*/}
      <Button onClick={handleGithubSignup} text="Github 계정으로 회원가입" fontSize="text-[18px]" width="w-[384px]" bgColor="bg-gray-800" textColor="text-white"/>

      {/*로그인 버튼*/}
      <div className="flex items-center mt-[48px] cursor-default">
        <span className="text-gray-750 text-[16px] mr-[12px]">이미 회원이신가요?</span>
        <button onClick={handleLogin} className="flex items-center border-none text-gray-750 text-[16px] font-semibold cursor-pointer hover:underline">
          로그인하기
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none" className="ml-[8px]">
            <path d="M1 1.5L6.29289 6.79289C6.68342 7.18342 6.68342 7.81658 6.29289 8.20711L1 13.5" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SignupPage;