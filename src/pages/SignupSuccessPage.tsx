import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import FixlogLogo from "../assets/img/FixlogLogo.png";

function SignupSuccessPage() {
  const navigate = useNavigate();

  // 로그인하기 버튼
  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center font-pretendard mb-[146px]">
      <Header />
      <img src={FixlogLogo} className="h-[60px] w-auto mt-[146px] mb-[40px]" />
      <p className="font-semibold text-[28px] text-gray-800 cursor-default">회원가입이 완료되었습니다</p>
      <p className="text-center font-normal text-[20px] text-gray-600 mt-[20px] mb-[60px] leading-[30px] cursor-default">
        지금 바로 다른 개발자들이 해결한 트러블슈팅을 검색해보세요. 
        <br/>
        또는 당신이 해결한 문제를 기록해보는 건 어떨까요?
      </p>
      <Button onClick={handleLogin} text="로그인하기" fontSize="text-[18px]" width="w-[384px]"/>
    </div>
  );
}

export default SignupSuccessPage;