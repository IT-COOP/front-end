import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import useUploadRecruitBoardImgMutation from "../../hooks/useUploadRecruitBoardImgMutation";
import useCompleteWriteMutation from "../../hooks/useCompleteWriteMutation";
import { Completion } from "../../assets/icons";
import { recruitBoardDefaultUrl } from "../../constants/defaultImages";

import Title from "./recruitWriteView/Title";
import DurationWeek from "./recruitWriteView/DurationWeek";
import LocationSelect from "./recruitWriteView/LocationSelect";
import TaskAndStack from "./recruitWriteView/TaskAndStack";

function RecruitWrite() {
  const [recruitData, setRecruitData] = useState({
    title: "",
    recruitContent: "",
    recruitDurationWeek: 0,
    recruitLocation: 0,
    recruitTasks: [],
    recruitStacks: [],
    thumbImgUrl: recruitBoardDefaultUrl,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isImgConfirmMsg, setIsImgConfirmMsg] = useState(false);

  const { mutateAsync: recruitBoardImgUpload } =
    useUploadRecruitBoardImgMutation();

  const { mutateAsync: completeWriteBoard } = useCompleteWriteMutation();

  const handleTitle = title => {
    setRecruitData(prev => ({ ...prev, title }));
  };

  const handleContent = inputText => {
    const recruitContent = inputText.target.value;
    setRecruitData(prev => ({ ...prev, recruitContent }));
  };

  const handleDurationWeek = week => {
    setRecruitData(prev => ({
      ...prev,
      recruitDurationWeek: Number(week),
    }));
  };

  const handleLocation = location => {
    setRecruitData(prev => ({
      ...prev,
      recruitLocation: Number(location),
    }));
  };

  const addRecruitTask = data => {
    setRecruitData(prev => ({
      ...prev,
      recruitTasks: data,
    }));
  };

  const addRecruitStack = data => {
    setRecruitData(prev => ({
      ...prev,
      recruitStacks: data,
    }));
  };

  const removeRecruitTask = data => {
    setRecruitData(prev => ({
      ...prev,
      recruitTasks: data,
    }));
  };

  const removeRecruitStack = data => {
    setRecruitData(prev => ({
      ...prev,
      recruitStacks: data,
    }));
  };

  const uploadRecruitBoardImg = async e => {
    const formData = new FormData();
    let file = e.target.files[0];

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
    const { data: thumbImgUrl } = await recruitBoardImgUpload(formData);
    setRecruitData(prev => ({ ...prev, thumbImgUrl }));
  };

  const deleteRecruitBoardImg = () => {
    setRecruitData(prev => ({ ...prev, thumbImgUrl: recruitBoardDefaultUrl }));
  };

  const handleCompleteWriteBoard = async () => {
    if (recruitData.title === "") {
      return;
    }
    if (recruitData.recruitContent === "") {
      return;
    }
    if (recruitData.recruitDurationWeek === 0) {
      return;
    }
    if (recruitData.recruitLocation === 0) {
      return;
    }
    if (recruitData.recruitTasks.length === 0) {
      return;
    }
    const data = await completeWriteBoard(recruitData);
    if (data.success) {
      setIsSuccess(data.success);
    }
  };

  return (
    <section className="w-full py-[68px] bg-white3">
      <div className="w-[1224px] mx-auto">
        <h1 className="text-[24px] mb-[21px]">모집글 작성하기</h1>
        <ul className="border-[1px] px-[30px] py-[24px] border-gray2 rounded-[8px] bg-white pb-[80px]">
          <Title handleTitle={handleTitle} />
          <DurationWeek handleDurationWeek={handleDurationWeek} />
          <LocationSelect handleLocation={handleLocation} />
          <TaskAndStack
            handleAddRecruitTask={addRecruitTask}
            handleAddRecruitStack={addRecruitStack}
            handleRemoveRecruitTask={removeRecruitTask}
            handleRemoveRecruitStack={removeRecruitStack}
            recruitData={recruitData}
          />
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
                  src={recruitData.thumbImgUrl}
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
