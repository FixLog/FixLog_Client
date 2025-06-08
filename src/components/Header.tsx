// Header.tsx
import { useState } from 'react';
// 아이콘 import (경로는 프로젝트에 맞게 조정 필요)
// import AlarmIcon from '../assets/icons/Alarm.svg';
// import WriteIcon from '../assets/icons/Write.svg';
// import ProfileIcon from '../assets/icons/Profile.svg';

interface HeaderProps {
  isLogin: boolean;
}

const Header = ({ isLogin }: HeaderProps) => {
  // 드롭다운 메뉴 상태 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex justify-between items-center w-full px-6 py-3 border-b bg-white shadow-sm font-pretendard">
      {/* 로고/사이트 이름 */}
      <div className="text-xl font-bold italic text-main">
        Fix<span className="not-italic font-normal text-gray700">[Log]</span>
      </div>

      {/* 네비게이션 (로그인/비로그인 공통) */}
      <nav className="flex gap-6 items-center text-sm text-gray700 font-semibold"> {/* 폰트 굵기 적용 */}
        <button className="hover:text-black transition-colors duration-200">태그 모음</button>
        <button className="hover:text-black transition-colors duration-200">최신글</button>
        <button className="hover:text-black transition-colors duration-200">인기글</button>
      </nav>

      {/* 우측 섹션 (로그인 상태에 따라 다름) */}
      <div className="flex items-center gap-4">
        {isLogin ? (
          // 로그인 상태
          <>
            {/* 작성하기 버튼 */}
            <button className="flex items-center gap-1 text-sm text-gray700 hover:text-black transition-colors duration-200">
              {/* <img src={WriteIcon} alt="작성하기" className="h-4 w-4" /> */} {/* 아이콘 크기 적용 */}
              작성하기
            </button>

            {/* 알림 아이콘 */}
            <button className="p-1 rounded-full hover:bg-gray100 transition-colors duration-200"> {/* 패딩, 라운드, hover 배경 */}
              {/* <img src={AlarmIcon} alt="알림" className="h-5 w-5" /> */} {/* 아이콘 크기 적용 */}
              {/* 아이콘 자리 */} 🔔
            </button>

            {/* 프로필 아이콘 및 드롭다운 */}
            <div className="relative"> {/* 드롭다운 위치 기준 */}
              <button
                className="w-8 h-8 rounded-full bg-gray300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-main" // 프로필 이미지 자리, 라운드, 배경색, focus 스타일
                onClick={toggleDropdown}
              >
                {/* <img src={ProfileIcon} alt="프로필" className="h-full w-full object-cover" /> */} {/* 프로필 이미지 스타일 */}
                {/* 프로필 이미지 자리 */} 👤
              </button>

              {/* 드롭다운 메뉴 */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"> {/* 드롭다운 스타일 */}
                  <button className="block px-4 py-2 text-sm text-gray700 hover:bg-gray100 w-full text-left transition-colors duration-200">
                    마이페이지
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray700 hover:bg-gray100 w-full text-left transition-colors duration-200">
                    로그아웃
                  </button>
                   <div className="border-t my-1"></div> {/* 구분선 */}
                   <button className="block px-4 py-2 text-sm text-gray700 hover:bg-gray100 w-full text-left transition-colors duration-200">
                    회원정보 수정
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // 비로그인 상태
          <div className="flex gap-2">
            <button className="text-sm text-main border border-main px-4 py-1 rounded hover:bg-main hover:text-white transition-colors duration-200">
              로그인
            </button>
            <button className="text-sm text-white bg-main px-4 py-1 rounded hover:bg-sub1 hover:text-main transition-colors duration-200">
              회원가입
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;