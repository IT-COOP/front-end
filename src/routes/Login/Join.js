import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  setUserProfile,
  socialLogin,
} from "../../state/redux/module/userSlice";
import { Close } from "../../assets/icons";

function Join() {
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("accessToken");
  const data = {
    data: {
      nickname: "13자ㅇㅋ",
      profileImgUrl:
        "https://images.mypetlife.co.kr/content/uploads/2019/12/09152000/3418e09ad3dea830a19b2996a6098fd7.jpg",
      technologyStack: "react",
      selfIntroduction: "",
      portfolioUrl: "https://naver.com",
    },
    token: token,
  };

  const handleUserInfo = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    const userValue = { ...userInfo };
    userValue[inputName] = inputValue;
    setUserInfo(userValue);
    console.log(userInfo);
  };

  const handleJoinSubmit = e => {
    e.preventDefault();
    dispatch(setUserProfile(data));
  };

  const formLi = `flex flex-col w-[800px] h-[500px] rounded-[16px] bg-[#F9F9F9] sm:w-[100%] sm:h-[392px] sm:px-[20px]`;
  const formTitle = `text-center font-bold text-[30px] mt-[74px] mb-[36px] sm:mt-[60px] sm:mb-[36px] sm:text-[20px]  `;
  const formDesc = ` text-center text-[20px] mb-[40px] sm:mb-[60px] sm:text-[12px]`;
  const inputBoxCss = `mx-auto mb-[50px] sm:w-[100%] sm:mb-[45px] flex justify-between`;
  const inputCss = `border-2 text-[24px] p-[20px] mr-[10px] rounded-[5px] w-[357px] h-[72px] sm:px-[20px] sm:py-[14px] sm:text-[14px] sm:w-[232px] sm:h-[42px] sm:mr-[8px] `;
  const checkBtn = `w-[117px] h-[72px] text-[24px] text-[14px] text-[#797979] bg-[#CCCCCC] rounded-[5px] sm:w-[60px] sm:h-[42px]  sm:text-[10px]`;
  const nextBtn = `mx-auto font-bold text-24px rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] sm:w-[100%] sm:h-[45px]`;

  return (
    <section className="fixed w-screen h-screen z-50 flex items-center justify-center sm:px-[20px]">
      {/* <h1 onClick={handleJoin}>이건 실험용이야허허허</h1> */}
      <ul className="relative w-[100%] sm:h-[392px]">
        <Close className="absolute top-[14px] right-[14px]" />
        <li className={`${formLi}`}>
          <h1 className={formTitle}>
            <span className="sm:block">사용하실 닉네임을</span> 설정해주세요.
          </h1>
          <p className={`${formDesc}`}>
            서비스를 이용할 때 사용되는 이름이에요!
          </p>
          <div className={`${inputBoxCss}`}>
            <input
              type="text"
              className={`${inputCss}`}
              placeholder="12자 이내로 입력해주세요"
              maxLength={12}
              name="nickname"
              onChange={handleUserInfo}
            />
            <button className={`${checkBtn}`}>중복확인</button>
          </div>
          <button className={`${nextBtn}`}>다음으로</button>
        </li>
      </ul>
    </section>
  );
}

export default Join;
