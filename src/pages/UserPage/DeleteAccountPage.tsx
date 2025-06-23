import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import Button from "../../components/common/Button";

function DeleteAccountPage() {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    // 탈퇴하기 버튼 (API)
    const handleSubmit = () => {
        if(!agree) {
            alert("안내 사항 확인 후 동의해야 탈퇴가 가능합니다.");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            alert("로그인 상태가 아닙니다.");
            navigate("/login");
            return;
        }

        setShowModal(true);
    };

    // 모달 - 탈퇴하기 버튼 (API)
    const handleDelete = async () => {
        if (!password) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await fetch(`${apiUrl}/members/me`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ password }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                //console.log("토큰 삭제 전:", localStorage.getItem('accessToken'));
                localStorage.removeItem('accessToken');
                //console.log("토큰 삭제 후:", localStorage.getItem('accessToken'));
                alert("회원 탈퇴가 완료되었습니다.");
                navigate("/");
            } else {
                if (response.status === 401) {
                    alert("비밀번호가 일치하지 않습니다.");
                } else {
                    alert("회원 탈퇴 실패: " + response.status);
                }
            }
        } catch (error) {
            console.error("회원 탈퇴 실패: ", error);
            alert("회원 탈퇴 실패");
        }
    };

    const [feedback, setFeedback] = useState('');
    const [agree, setAgree] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');

    return(
        <div className="flex flex-col items-center font-pretendard mb-[60px]">
            <Header isLogin={true}/>
            <div className="w-[588px] my-[56px]">
                <p className="font-semibold text-gray-900 text-[38px] cursor-default">회원 탈퇴</p>
            </div>

            {/*탈퇴 사유*/}
            <div className="w-[588px] flex items-end gap-[10px] mb-[18px] cursor-default">
                <p className="font-medium text-[20px] text-gray-750">탈퇴 사유</p>
                <p className="font-medium text-[12px] text-gray-500">다중선택 가능</p>
            </div>
            <div className="w-[588px] flex flex-col gap-[14px]">
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-[16px] h-[16px] mr-[13px] accent-gray-500 border-gray-500"/>
                    더 이상 사용하지 않음
                </label>
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-[16px] h-[16px] mr-[13px] accent-gray-500 border-gray-500"/>
                    사용하기 불편함
                </label>
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-[16px] h-[16px] mr-[13px] accent-gray-500 border-gray-500"/>
                    원하는 정보를 찾을 수 없음
                </label>
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-[16px] h-[16px] mr-[13px] accent-gray-500 border-gray-500"/>
                    보안이 걱정됨
                </label>
                <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-[16px] h-[16px] mr-[13px] accent-gray-500 border-gray-500"/>
                    기타
                </label>
            </div>

            {/*피드백*/}
            <div className="w-[588px] flex items-end gap-[10px] mt-[40px] mb-[18px] cursor-default">
                <p className="font-medium text-[20px] text-gray-750">피드백</p>
                <p className="font-medium text-[12px] text-gray-500">300자 이내</p>
            </div>
            <textarea
                placeholder="(선택)"
                maxLength={300}
                className="resize-none bg-gray-150 text-[14px] text-gray-900 w-[588px] h-[92px] rounded-[8px] px-[16px] py-[14px] mb-[40px] focus:bg-white focus:border-gray-800"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
            />

            {/*안내 사항*/}
            <div className="flex flex-col justify-center w-[588px] h-[130px] rounded-[8px] border border-gray-400 px-[32px] py-[30px] gap-[20px] mb-[20px] cursor-default">
                <div className="flex gap-[12px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2.7252 21C2.54187 21 2.3752 20.9543 2.2252 20.863C2.0752 20.7717 1.95853 20.6507 1.8752 20.5C1.79187 20.3493 1.7462 20.1867 1.7382 20.012C1.7302 19.8373 1.77587 19.6667 1.8752 19.5L11.1252 3.5C11.2252 3.33333 11.3545 3.20833 11.5132 3.125C11.6719 3.04167 11.8342 3 12.0002 3C12.1662 3 12.3289 3.04167 12.4882 3.125C12.6475 3.20833 12.7765 3.33333 12.8752 3.5L22.1252 19.5C22.2252 19.6667 22.2712 19.8377 22.2632 20.013C22.2552 20.1883 22.2092 20.3507 22.1252 20.5C22.0412 20.6493 21.9245 20.7703 21.7752 20.863C21.6259 20.9557 21.4592 21.0013 21.2752 21H2.7252ZM12.0002 18C12.2835 18 12.5212 17.904 12.7132 17.712C12.9052 17.52 13.0009 17.2827 13.0002 17C12.9995 16.7173 12.9035 16.48 12.7122 16.288C12.5209 16.096 12.2835 16 12.0002 16C11.7169 16 11.4795 16.096 11.2882 16.288C11.0969 16.48 11.0009 16.7173 11.0002 17C10.9995 17.2827 11.0955 17.5203 11.2882 17.713C11.4809 17.9057 11.7182 18.0013 12.0002 18ZM12.0002 15C12.2835 15 12.5212 14.904 12.7132 14.712C12.9052 14.52 13.0009 14.2827 13.0002 14V11C13.0002 10.7167 12.9042 10.4793 12.7122 10.288C12.5202 10.0967 12.2829 10.0007 12.0002 10C11.7175 9.99933 11.4802 10.0953 11.2882 10.288C11.0962 10.4807 11.0002 10.718 11.0002 11V14C11.0002 14.2833 11.0962 14.521 11.2882 14.713C11.4802 14.905 11.7175 15.0007 12.0002 15Z" fill="#F74E4E"/>
                    </svg>
                    <p className="font-medium text-[16px] text-gray-750">탈퇴 시 회원정보 및 서비스 이용기록이 모두 삭제됩니다.</p>
                </div>
                <div className="flex gap-[12px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2.7252 21C2.54187 21 2.3752 20.9543 2.2252 20.863C2.0752 20.7717 1.95853 20.6507 1.8752 20.5C1.79187 20.3493 1.7462 20.1867 1.7382 20.012C1.7302 19.8373 1.77587 19.6667 1.8752 19.5L11.1252 3.5C11.2252 3.33333 11.3545 3.20833 11.5132 3.125C11.6719 3.04167 11.8342 3 12.0002 3C12.1662 3 12.3289 3.04167 12.4882 3.125C12.6475 3.20833 12.7765 3.33333 12.8752 3.5L22.1252 19.5C22.2252 19.6667 22.2712 19.8377 22.2632 20.013C22.2552 20.1883 22.2092 20.3507 22.1252 20.5C22.0412 20.6493 21.9245 20.7703 21.7752 20.863C21.6259 20.9557 21.4592 21.0013 21.2752 21H2.7252ZM12.0002 18C12.2835 18 12.5212 17.904 12.7132 17.712C12.9052 17.52 13.0009 17.2827 13.0002 17C12.9995 16.7173 12.9035 16.48 12.7122 16.288C12.5209 16.096 12.2835 16 12.0002 16C11.7169 16 11.4795 16.096 11.2882 16.288C11.0969 16.48 11.0009 16.7173 11.0002 17C10.9995 17.2827 11.0955 17.5203 11.2882 17.713C11.4809 17.9057 11.7182 18.0013 12.0002 18ZM12.0002 15C12.2835 15 12.5212 14.904 12.7132 14.712C12.9052 14.52 13.0009 14.2827 13.0002 14V11C13.0002 10.7167 12.9042 10.4793 12.7122 10.288C12.5202 10.0967 12.2829 10.0007 12.0002 10C11.7175 9.99933 11.4802 10.0953 11.2882 10.288C11.0962 10.4807 11.0002 10.718 11.0002 11V14C11.0002 14.2833 11.0962 14.521 11.2882 14.713C11.4802 14.905 11.7175 15.0007 12.0002 15Z" fill="#F74E4E"/>
                    </svg>
                    <p className="">삭제된 데이터는 복구되지 않습니다.</p>
                </div>
            </div>

            {/*동의*/}
            <div className="w-[588px] mb-[42px] text-left">
                <label className="flex items-center font-medium text-[14px] text-gray-500 cursor-pointer">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                />
                <div
                    className="mr-[13px]"
                >
                    {agree ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.25 17.25L19.0625 8.4375L17.3125 6.6875L10.25 13.75L6.6875 10.1875L4.9375 11.9375L10.25 17.25ZM3.25 23.25C2.5625 23.25 1.97417 23.0054 1.485 22.5163C0.995833 22.0271 0.750833 21.4383 0.75 20.75V3.25C0.75 2.5625 0.995 1.97417 1.485 1.485C1.975 0.995833 2.56333 0.750833 3.25 0.75H20.75C21.4375 0.75 22.0263 0.995 22.5163 1.485C23.0063 1.975 23.2508 2.56333 23.25 3.25V20.75C23.25 21.4375 23.0054 22.0263 22.5163 22.5163C22.0271 23.0063 21.4383 23.2508 20.75 23.25H3.25Z" fill="#9CED1A"/>
                    </svg>
                    ) : (
                    <div className="w-[24px] h-[24px] border-[2px] border-main bg-white rounded-[4px]" />
                    )}
                </div>
                안내 사항을 모두 확인하였으며, 이에 동의합니다.
                </label>
            </div>

            {/*탈퇴하기 버튼*/}
            <Button onClick={handleSubmit} text="탈퇴하기" fontSize="text-[18px]" width="w-[296px]"/>

            {/*탈퇴하기 모달*/}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center justify-center w-[400px] h-[500px] bg-white rounded-[8px] px-[26px] text-center shadow-lg font-pretendard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="105" height="105" viewBox="0 0 105 105" fill="none">
                            <path d="M52.5 96.25C28.3369 96.25 8.75 76.6631 8.75 52.5C8.75 28.3369 28.3369 8.75 52.5 8.75C76.6631 8.75 96.25 28.3369 96.25 52.5C96.25 76.6631 76.6631 96.25 52.5 96.25ZM48.125 48.125V74.375H56.875V48.125H48.125ZM48.125 30.625V39.375H56.875V30.625H48.125Z" fill="#F74E4E"/>
                        </svg>

                        <p className="font-medium text-[16px] text-gray-750 leading-[24px] my-[34px] cursor-default">
                            회원 탈퇴 시, 이용 기록 및 저장된 정보가<br/>
                            모두 삭제되며 복구가 불가능합니다.
                        </p>

                        <div className="w-[348px] mb-[20px] cursor-default">
                            <p className="font-normal text-left text-[15px] text-gray-750">비밀번호 확인</p>
                            <input 
                                type="password" 
                                className="bg-gray-150 text-gray-900 w-[348px] h-[54px] rounded-[8px] p-[15px] my-[8px] border border-transparent outline-none focus:bg-white focus:border-gray-800"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="font-normal text-left text-[12px] text-gray-400">* 보안을 위해 비밀번호를 입력해주세요.</p>
                        </div>

                        <Button 
                            onClick={handleDelete}
                            text="탈퇴하기" width="w-[348px]" fontSize="text-[18px]" bgColor="bg-point" textColor="text-gray-100"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeleteAccountPage;