import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { Location, Stack, Task } from "../../constants/enums";
import useUploadRecruitBoardImgMutation from "../../hooks/useUploadRecruitBoardImgMutation";
import useCompleteWriteMutation from "../../hooks/useCompleteWriteMutation";
import { Completion } from "../../assets/icons";
import { recruitBoardDefaultUrl } from "../../constants/defaultImages";

function RecruitWrite() {
  const [recruitInfo, setRecruitInfo] = useState({
    title: "",
    recruitContent: "",
    recruitDurationWeek: 0,
    recruitLocation: 0,
    recruitTasks: [],
    recruitStacks: [],
    thumbImgUrl: recruitBoardDefaultUrl,
  });

  const [thumbImgUrl, setThumbImgUrl] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSelectedTask, setIsSelectedTask] = useState(false);
  const [isNotSelectModal, setIsNotSelectModal] = useState(false);
  const [isImgConfirmMsg, setIsImgConfirmMsg] = useState(false);
  const [numberOfPeopleRequired, setNumberOfPeopleRequired] = useState(1);
  const [selectedTask, setSelectedTask] = useState(0);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedStack, setSelectedStack] = useState(0);

  const locationList = Object.values(Location).filter(v => !isNaN(v));
  const taskList = Object.values(Task).filter(v => !isNaN(v));
  const filteredStackList =
    selectedTask < 300
      ? []
      : Object.values(Stack).filter(stack => {
          const startPoint =
            selectedTask === 300 ? selectedTask - 200 : selectedTask - 100;
          const targetPoint = Stack[stack];
          return startPoint < targetPoint && targetPoint < startPoint + 100;
        });

  const { mutateAsync: recruitBoardImgUpload } =
    useUploadRecruitBoardImgMutation();

  const { mutateAsync: completeWriteBoard } = useCompleteWriteMutation();

  const selectTask = task => () => {
    if (selectedStack === task) {
      return false;
    }
    setSelectedTask(task);
  };

  const handleTitle = inputText => {
    const title = inputText.target.value;
    setRecruitInfo(prev => ({ ...prev, title }));
  };

  const handleContent = inputText => {
    const recruitContent = inputText.target.value;
    setRecruitInfo(prev => ({ ...prev, recruitContent }));
  };

  const handleDurationWeek = selectValue => {
    const recruitDurationWeek = selectValue.target.value;
    setRecruitInfo(prev => ({
      ...prev,
      recruitDurationWeek: Number(recruitDurationWeek),
    }));
  };

  const handleLocation = selectValue => {
    const recruitLocation = selectValue.target.value;
    setRecruitInfo(prev => ({
      ...prev,
      recruitLocation: Number(recruitLocation),
    }));
  };

  const setPeopleNumber = selectValue => {
    const numberOfPeople = selectValue.target.value;
    setNumberOfPeopleRequired(numberOfPeople);
  };

  const removeRecruit = v => () => {
    if (v === 100 || v === 200) {
      setRecruitInfo(prev => ({
        ...prev,
        recruitTasks: prev.recruitTasks.filter(task => task.recruitTask !== v),
      }));
      setSelectedTasks(prev => prev.filter(task => task !== v));
      return;
    } else {
      if (v < 200) {
        setRecruitInfo(prev => ({
          ...prev,
          recruitTasks: prev.recruitTasks.filter(
            task => task.recruitTask !== Number(300),
          ),
        }));
        setSelectedTasks(prev => prev.filter(task => task !== Number(300)));
      } else {
        setRecruitInfo(prev => ({
          ...prev,
          recruitTasks: prev.recruitTasks.filter(
            task => task.recruitTask !== Number(400),
          ),
        }));
        setSelectedTasks(prev => prev.filter(task => task !== Number(400)));
      }
      setRecruitInfo(prev => ({
        ...prev,
        recruitStacks: prev.recruitStacks.filter(
          stack => stack.recruitStack !== v,
        ),
      }));
      return;
    }
  };

  const addRecruit = () => {
    if (selectedTasks.includes(selectedTask)) {
      setIsSelectedTask(prev => !prev);
      setSelectedTask(0);
      setSelectedStack(0);
      setTimeout(() => {
        setIsSelectedTask(prev => !prev);
      }, 1000);
      return;
    }
    if (selectedTask === 0) {
      setIsNotSelectModal(prev => !prev);
      setTimeout(() => {
        setIsNotSelectModal(prev => !prev);
      }, 1000);
      return;
    }
    if (selectedTask === 300 || selectedTask === 400) {
      if (selectedStack === 0) {
        setIsNotSelectModal(prev => !prev);
        setTimeout(() => {
          setIsNotSelectModal(prev => !prev);
        }, 1000);
        return;
      }
    }
    setSelectedTasks(prev => [...prev, selectedTask]);
    if (selectedTask === 100 || selectedTask === 200) {
      setRecruitInfo(prev => ({
        ...prev,
        recruitTasks: [
          ...prev.recruitTasks,
          {
            recruitTask: selectedTask,
            numberOfPeopleSet: 0,
            numberOfPeopleRequired: Number(numberOfPeopleRequired),
          },
        ],
      }));
      setSelectedTask(0);
    } else {
      if (selectedStack === 0) {
        setIsNotSelectModal(prev => !prev);
        setTimeout(() => {
          setIsNotSelectModal(prev => !prev);
        }, 1000);
        return false;
      }
      setRecruitInfo(prev => ({
        ...prev,
        recruitTasks: [
          ...prev.recruitTasks,
          {
            recruitTask: selectedTask,
            numberOfPeopleSet: 0,
            numberOfPeopleRequired: Number(numberOfPeopleRequired),
          },
        ],
      }));
      setRecruitInfo(prev => ({
        ...prev,
        recruitStacks: [
          ...prev.recruitStacks,
          {
            recruitStack: selectedStack,
            numberOfPeopleSet: 0,
            numberOfPeopleRequired: Number(numberOfPeopleRequired),
          },
        ],
      }));
      setSelectedStack(0);
      setSelectedTask(0);
    }
  };

  const selectStack = selectValue => {
    const stack = selectValue.target.value;
    setSelectedStack(stack);
  };

  const uploadRecruitBoardImg = async e => {
    const formData = new FormData();
    let file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }
    const regex = new RegExp("png|jpg");
    if (!regex.test(file.name.slice(-3))) {
      setIsImgConfirmMsg(prev => !prev);
      setTimeout(() => {
        setIsImgConfirmMsg(prev => !prev);
      }, 2000);
      return;
    }
    formData.append("image", file);
    const { data: ImgUrl } = await recruitBoardImgUpload(formData);
    setRecruitInfo(prev => ({ ...prev, ImgUrl }));
    setThumbImgUrl(ImgUrl);
  };

  const deleteRecruitBoardImg = () => {
    setThumbImgUrl(recruitBoardDefaultUrl);
  };

  const handleCompleteWriteBoard = async () => {
    if (recruitInfo.title === "") {
      return;
    }
    if (recruitInfo.recruitContent === "") {
      return;
    }
    if (recruitInfo.recruitDurationWeek === 0) {
      return;
    }
    if (recruitInfo.recruitLocation === 0) {
      return;
    }
    if (recruitInfo.recruitTasks.length === 0) {
      return;
    }
    const data = await completeWriteBoard(recruitInfo);
    if (data.success) {
      setIsSuccess(data.success);
    }
  };

  return (
    <section className="w-full py-[68px] bg-white3">
      <div className="w-[1224px] mx-auto">
        <h1 className="text-[24px] mb-[21px]">모집글 작성하기</h1>
        <ul className="border-[1px] px-[30px] py-[24px] border-gray2 rounded-[8px] bg-white pb-[80px]">
          <li className="flex items-center mb-[60px]">
            <p className="w-[208px] text-[17px]"> 제목 </p>
            <input
              className="text-[20px] py-[10px] flex-1 border-b-[1px]"
              maxLength={20}
              type="text"
              placeholder="20글자 이내로 작성해주세요!"
              onChange={handleTitle}
            />
          </li>
          <li className="flex items-center mb-[62px]">
            <p className="w-[208px] text-[17px]"> 예상 소요 기간 </p>
            <select
              className="border-[1px] border-black px-[20px] w-[392px] text-[17px] h-[40px] "
              defaultValue="hidden"
              onChange={handleDurationWeek}
            >
              <option value="hidden" disabled className="hidden">
                예상 소요 기간을 선택해주세요!
              </option>
              <option value="1">1주</option>
              <option value="2">2주</option>
              <option value="3">3주</option>
              <option value="4">4주</option>
            </select>
          </li>
          <li className="flex items-center mb-[62px]">
            <p className="w-[208px] text-[17px]">지역</p>
            <select
              className="border-[1px] border-black px-[20px] w-[392px] text-[17px] h-[40px]"
              defaultValue="hidden"
              onChange={handleLocation}
            >
              <option value="hidden" disabled className="hidden">
                지역을 선택해주세요!
              </option>
              {locationList.map(location => (
                <option key={location} value={location}>
                  {Location[location]}
                </option>
              ))}
            </select>
          </li>
          <li className="flex items-start mb-[100px]">
            <p className="w-[208px] text-[17px]">필요 직군</p>
            <ul className="relative">
              <li className="absolute bottom-[100%] mb-[10px] text-gray3">
                최소 하나의 직군이 필요합니다! 각 직군과 스택은 각각 하나씩 선택
                가능합니다!
              </li>
              <li className="mb-[30px]">
                {taskList.map(task => (
                  <button
                    key={task}
                    value={task}
                    className={classNames(
                      "px-[16px] py-[6px] text-[18px] rounded-[20px] mr-[15px] bg-gray1",
                      {
                        "bg-pink text-white":
                          (selectedTask === task) & (selectedTask === 100),
                        "bg-yellow text-white":
                          (selectedTask === task) & (selectedTask === 200),
                        "bg-coral text-white":
                          (selectedTask === task) & (selectedTask === 300),
                        "lg:bg-blue text-white":
                          (selectedTask === task) & (selectedTask === 400),
                      },
                    )}
                    onClick={selectTask(task)}
                  >
                    {Task[task]}
                  </button>
                ))}
              </li>
              <li className="relative flex">
                <div className="flex items-center mr-[24px]">
                  <select
                    className="border-[1px] border-black px-[20px] w-[184px] text-[18px] h-[40px]"
                    onChange={selectStack}
                    disabled={selectedTask === 100 || selectedTask === 200}
                    defaultValue="hidden"
                  >
                    <option value="hidden" className="pointer-events-none">
                      선택해주세요!
                    </option>
                    {filteredStackList.map(stack => (
                      <option key={Stack[stack]} value={Stack[stack]}>
                        {stack}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center mx-[24px]">
                  <p className="text-[17px] mr-[23px]">모집인원</p>
                  <select
                    className="border-[1px] border-black px-[20px] w-[184px] text-[18px] h-[40px]"
                    onChange={setPeopleNumber}
                  >
                    {selectedTask < 300 ? (
                      <>
                        <option value="1">1명</option>
                        <option value="2">2명</option>
                      </>
                    ) : (
                      <>
                        <option value="1">1명</option>
                        <option value="2">2명</option>
                        <option value="3">3명</option>
                        <option value="4">4명</option>
                      </>
                    )}
                  </select>
                </div>
                <button
                  className="text-[15px] text-blue3 relative"
                  onClick={addRecruit}
                >
                  추가 작성하기 +
                </button>
                <div
                  className={classNames(
                    "absolute top-[100%] mt-[10px] left-0 text-red duration-500 transition-opacity",
                    {
                      "opacity-0": !isNotSelectModal,
                      "opacity-100": isNotSelectModal,
                    },
                  )}
                >
                  직군 혹은 스택을 선택하지 않으셨습니다!
                </div>
                <div
                  className={classNames(
                    "absolute top-[100%] mt-[10px] left-0 text-red duration-500 transition-opacity",
                    {
                      "opacity-0": !isSelectedTask,
                      "opacity-100": isSelectedTask,
                    },
                  )}
                >
                  이미 선택된 직군입니다!
                </div>
              </li>
              <ul className="flex mt-[40px]">
                {recruitInfo.recruitTasks.map(task =>
                  task.recruitTask < 300 ? (
                    <li
                      className={classNames(
                        "mr-[20px]  px-[14px] py-[6px] rounded-[11px] border-[1px]",
                        {
                          "text-pink border-pink": task.recruitTask === 100,
                          "text-yellow border-yellow": task.recruitTask === 200,
                        },
                      )}
                      key={task.recruitTask}
                    >
                      {Task[task.recruitTask]} / {task.numberOfPeopleRequired}명{" "}
                      <button
                        className="ml-[5px]"
                        onClick={removeRecruit(task.recruitTask)}
                      >
                        X
                      </button>
                    </li>
                  ) : null,
                )}
                {recruitInfo.recruitStacks.map(stack => (
                  <li
                    className={classNames(
                      "mr-[20px] px-[14px] py-[6px] rounded-[11px] border-[1px]",
                      {
                        "text-coral border-coral":
                          100 < stack.recruitStack && stack.recruitStack < 200,
                        "text-blue border-blue": 200 < stack.recruitStack,
                      },
                    )}
                    key={stack.recruitStack}
                  >
                    {Stack[stack.recruitStack]} / {stack.numberOfPeopleRequired}
                    명
                    <button
                      className="ml-[5px]"
                      onClick={removeRecruit(stack.recruitStack)}
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </ul>
          </li>
          <hr className="my-[30px] border-[#C4C4C4]"></hr>
          <li className="flex pb-[60px]">
            <p className="w-[208px] text-[17px]"> 내용 </p>
            <input className="flex-1" type="text" onChange={handleContent} />
          </li>
          <li className="flex mt-[70px] mb-[50px]">
            <p className="w-[208px] text-[17px]">모집공고 이미지</p>
            <div>
              <div className="flex">
                <img
                  className="w-[288px] h-[186px] mr-[16px]"
                  src={recruitInfo.thumbImgUrl}
                  alt="썸네일 이미지"
                />
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block rounded-[5px] px-[15px] py-[6px] mb-[8px] bg-[#C4C4C4] cursor-pointer"
                  >
                    이미지 등록
                  </label>
                  <input
                    id="thumbnail"
                    type="file"
                    className="hidden"
                    accept=".jpg, .png"
                    onChange={uploadRecruitBoardImg}
                  />
                  <button
                    className="block rounded-[5px] px-[15px] py-[6px] bg-[#C4C4C4]"
                    onClick={deleteRecruitBoardImg}
                  >
                    이미지 삭제
                  </button>
                </div>
              </div>
              <div>
                썸네일로 들어갈 이미지에요 (권장사이즈 288 * 186px)
                <p
                  className={classNames(
                    "absolute duration-700 transition-all",
                    {
                      "text-red text-[20px]": isImgConfirmMsg,
                    },
                  )}
                >
                  jpg 혹은 png 파일만 업로드 해주세요!
                </p>
              </div>
            </div>
          </li>
          <li className="text-right">
            <button
              className="rounded-[5px] mr-[24px] text-[17px] px-[15px] py-[6px] bg-black text-white"
              onClick={handleCompleteWriteBoard}
            >
              글 등록하기
            </button>
            <button className="rounded-[5px] bg-[#C4C4C4] text-[17px] px-[15px] py-[6px]">
              취소
            </button>
          </li>
        </ul>
      </div>
      {isSuccess && (
        <div className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
          <div className="relative w-[800px] h-[500px] flex bg-white rounded-[16px] overflow-hidden items-center justify-center">
            <div>
              <h3 className="text-[23px] font-bold mb-[40px] text-center">
                글 작성이 완료되었습니다.
              </h3>
              <Completion className="mx-auto mb-[50px]" />
              <Link to="/">
                <button className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] ">
                  메인 화면으로 가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecruitWrite;
