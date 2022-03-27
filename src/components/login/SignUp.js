import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { Close, Prev } from "../../assets/icons";
import { Stack, Task } from "../../constants/enums";
import useUploadUserProfileImgMutation from "../../hooks/useUploadRecruitBoardImgMutation";
import useConfirmNicknameMutation from "../../hooks/useConfirmNicknameMutation";
import useCreateUserMutation from "../../hooks/useCreateUserMutation";

function SocialSignIn({ closeSignUpModal }) {
  const [userInfo, setUserInfo] = useState({
    technologyTask: [],
  });
  const [confirmNickname, setConfirm] = useState(false);
  const [checkDuplicateUserNickname, setCheckDuplicate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(0);
  const [selectedStack, setSelectedStack] = useState([]);
  const [profileImgSrc, setProfileImgSrc] = useState("");

  const navigate = useNavigate();

  const { mutateAsync: uploadImg } = useUploadUserProfileImgMutation();
  const { mutateAsync: duplicateUserNickname } = useConfirmNicknameMutation();
  const { mutateAsync: createUser, isSuccess: createSuccess } =
    useCreateUserMutation();

  const filterTask = Object.values(Task).filter(task => !isNaN(task));

  const filteredStackList =
    selectedTask < 300
      ? null
      : Object.values(Stack).filter(stack => {
          const startPoint =
            selectedTask === 300 ? selectedTask - 200 : selectedTask - 100;
          const targetPoint = Stack[stack];
          return startPoint < targetPoint && targetPoint < startPoint + 100;
        });

  const handleCheckUserNickname = async () => {
    const { data } = await duplicateUserNickname(userInfo.nickname);
    if (data) {
      setCheckDuplicate(true);
    } else {
      setCheckDuplicate(false);
    }
  };

  const confirmUserNickname = e => {
    const regex = /^[가-힣|a-z|A-Z|0-9|]+$/;
    const nickname = e.target.value;
    const inputName = e.target.name;
    const userInfoCopy = { ...userInfo };
    userInfoCopy[inputName] = nickname;
    regex.test(nickname);
    if (regex.test(nickname) & (nickname.length > 1) & (nickname.length <= 5)) {
      setConfirm(true);
      setUserInfo(userInfoCopy);
    } else {
      setConfirm(false);
    }
  };

  const closeModal = e => {
    if (e.target.nodeName === "svg") {
      closeSignUpModal();
      localStorage.removeItem("coopToken");
    }
  };

  const handleSelectTask = task => e => {
    const colorChipAll = e.target.parentNode.children;
    const colorChip = e.target;
    for (let key of colorChipAll) {
      key.classList.add("bg-gray1");
      key.classList.add("text-gray4");
      key.classList.remove("text-white");
      key.classList.remove("bg-pink");
      key.classList.remove("bg-yellow");
      key.classList.remove("bg-coral");
      key.classList.remove("bg-blue");
    }

    switch (task) {
      case 100:
        colorChip.classList.remove("text-gray4");
        colorChip.classList.add("bg-pink");
        colorChip.classList.add("text-white");
        break;
      case 200:
        colorChip.classList.remove("text-gray4");
        colorChip.classList.add("bg-yellow");
        colorChip.classList.add("text-white");
        break;
      case 300:
        colorChip.classList.remove("text-gray4");
        colorChip.classList.add("bg-coral");
        colorChip.classList.add("text-white");
        break;
      case 400:
        colorChip.classList.remove("text-gray4");
        colorChip.classList.add("bg-blue");
        colorChip.classList.add("text-white");
        break;
      default:
        return;
    }

    if (selectedTask === task) {
      return false;
    }

    setSelectedStack([]);
    setSelectedTask(task);
    setUserInfo(prev => ({ ...prev, technologyTask: [task] }));
  };

  const handleSelectStack = e => {
    const stackValue = e.target.value;
    if (selectedStack.length === 3 || selectedStack.includes(stackValue)) {
      return false;
    }
    setSelectedStack(prev => [...prev, stackValue]);
  };

  const removeSelectedStack = stack => () => {
    const selectedStackCopy = selectedStack.filter(v => v !== stack);
    setSelectedStack(selectedStackCopy);
  };

  const handleNextChapter = e => {
    const currentLi = e.currentTarget.parentNode;
    const nextLi = currentLi.nextElementSibling;
    currentLi.classList.remove("z-10");
    currentLi.style.opacity = 0;
    nextLi.classList.add("z-10");
    nextLi.style.opacity = 1;
  };

  const handlePrevChapter = e => {
    const currentLi = e.currentTarget.parentNode;
    const prevLi = currentLi.previousElementSibling;
    currentLi.classList.remove("z-10");
    currentLi.style.opacity = 0;
    prevLi.classList.add("z-10");
    prevLi.style.opacity = 1;
  };

  const uploadUserProfileImg = async e => {
    const formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);
    const { data: imgUrl } = await uploadImg(formData);
    setProfileImgSrc(imgUrl);
  };

  const submitUserData = async () => {
    const taskAndStack = [...selectedStack, String(selectedTask)].join(",");
    const userData = {
      nickname: userInfo.nickname,
      profileImgUrl: profileImgSrc,
      technologyStack: taskAndStack,
    };
    createUser(userData);
  };

  useEffect(() => {
    if (createSuccess) {
      navigate("/", { replace: true });
      window.location.replace("/");
    }
  }, [createSuccess, navigate]);
  const formLi = `flex flex-col absolute w-[800px] h-[500px] duration-700  bg-white opacity-0  px-[158px]`;
  const formTitle = `text-center font-bold text-[30px] mt-[74px] mb-[32px] `;
  const formDesc = `text-center text-[20px] text-[#797979] mb-[40px] `;

  return (
    <section className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
      <ul className="relative w-[800px] h-[500px] flex bg-white rounded-[16px] overflow-hidden">
        <button
          className="absolute top-[14px] right-[14px] z-50"
          onClick={closeModal}
        >
          <Close className="fill-black" />
        </button>
        <li className={`${formLi} z-10 opacity-100`}>
          <h1 className={formTitle}>사용하실 닉네임을 설정해주세요.</h1>
          <p className={`${formDesc}`}>
            서비스를 이용할 때 사용되는 이름이에요!
          </p>
          <div className="mb-[6px] flex justify-between">
            <input
              type="text"
              className="border-2 text-[24px] p-[20px] mr-[10px] rounded-[5px] w-[357px] h-[72px]"
              placeholder="2~5자 이내로 입력해주세요"
              maxLength={5}
              name="nickname"
              onChange={confirmUserNickname}
            />
            <button
              className={classNames(
                "w-[117px] h-[72px] text-[24px]   rounded-[5px]",
                {
                  "bg-[#CCCCCC] text-gray4": !confirmNickname,
                  "bg-blue text-white": confirmNickname,
                },
              )}
              disabled={!confirmNickname}
              onClick={handleCheckUserNickname}
            >
              중복확인
            </button>
          </div>
          <p className="mb-[70px] text-[20px] leading-[25.04px] text-gray4">
            {"닉네임은 공백 없이 한글/영문/숫자만 가능합니다"}
          </p>
          <button
            className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px]"
            onClick={handleNextChapter}
            disabled={!checkDuplicateUserNickname}
          >
            {checkDuplicateUserNickname ? "다음으로" : "중복검사를 해주세요!"}
          </button>
        </li>
        <li className={`${formLi}`}>
          <button
            className="absolute top-[14px] left-[14px]"
            onClick={handlePrevChapter}
          >
            <Prev />
          </button>
          <h1 className={`${formTitle} mb-[33px]`}>
            <span>직군과 스택을</span> 설정해주세요.
          </h1>
          <div className="flex items-center mb-[40px] ">
            <p className="text-left text-[24px] leading-[30.05px] mr-[26px] text-gray4">
              직군
            </p>
            <div className="flex">
              {filterTask.map(task => (
                <button
                  key={task}
                  className={classNames(
                    "bg-gray1 text-gray4 mr-[16px] text-[16px] px-[16px] py-[6px] rounded-[20px]",
                  )}
                  onClick={handleSelectTask(task)}
                >
                  {Task[task]}
                </button>
              ))}
            </div>
          </div>
          <div className="flex stack mb-[40px]">
            <p className="text-left text-[24px] leading-[50px] mr-[26px] text-gray4">
              스택
            </p>
            <div className="flex-1">
              <select
                className="w-full border-[1px] h-[50px] pl-[15px]"
                onChange={handleSelectStack}
              >
                {filteredStackList?.map(stack => (
                  <option key={stack} value={Stack[stack]}>
                    {stack}
                  </option>
                ))}
              </select>
              <p className="leading-[40px] text-[20px] text-gray4 ">
                최소 1개부터 최대 3개까지 선택 해주세요!
              </p>
              <div className="flex gap-x-[10px]">
                {selectedStack.map((stack, idx) => (
                  <span
                    key={idx}
                    className="text-gray4 text-[15px] cursor-pointer"
                    onClick={removeSelectedStack(stack)}
                  >
                    {Stack[stack]} <Close className="inline-block fill-gray4" />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px]"
            onClick={handleNextChapter}
          >
            다음으로
          </button>
        </li>
        <li className={`${formLi}`}>
          <button
            className="absolute top-[14px] left-[14px]"
            onClick={handlePrevChapter}
          >
            <Prev />
          </button>
          <h1 className={formTitle}>사용하실 프로필 사진을 설정해주세요.</h1>
          <p className={`${formDesc} mb-[36px]`}>
            서비스를 이용할 때 사용되는 이미지에요!
          </p>
          <ul className="flex items-center justify-center mb-[36px]">
            <li>
              <img
                src={profileImgSrc}
                className="w-[140px] h-[140px] rounded-full bg-black overflow-hidden mr-[42px]"
                alt="프로필 사진"
              />
            </li>
            <li>
              <label
                htmlFor="upload"
                className="block cursor-pointer w-[126px] h-[40px] bg-black text-white rounded-[5px] mb-[10px] text-[18px] leading-[40px] text-center"
              >
                프로필 등록
              </label>
              <input
                id="upload"
                type="file"
                className="hidden"
                onChange={uploadUserProfileImg}
              />
              <button className="w-[126px] h-[40px] rounded-[5px] bg-gray2 text-[18px] leading-[22.54px]">
                프로필 삭제
              </button>
            </li>
          </ul>
          <button
            className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px]"
            onClick={submitUserData}
          >
            완료하기
          </button>
        </li>
      </ul>
    </section>
  );
}

export default SocialSignIn;
