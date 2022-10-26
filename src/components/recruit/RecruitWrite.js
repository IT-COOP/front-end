import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useCompleteWriteMutation from "../../hooks/useCompleteWriteMutation";
import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";

import { Completion } from "../../assets/icons";
import { recruitBoardDefaultUrl } from "../../constants/defaultImages";

import Title from "./recruitWriteView/Title";
import DurationWeek from "./recruitWriteView/DurationWeek";
import LocationSelect from "./recruitWriteView/LocationSelect";
import TaskAndStack from "./recruitWriteView/TaskAndStack";
import Content from "./recruitWriteView/Content";
import ImgUpload from "./recruitWriteView/ImgUpload";

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

  const { data: userData, isLoading } = useGetUserInfoQuery();

  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutateAsync: completeWriteBoard } = useCompleteWriteMutation();

  const handleTitle = title => {
    setRecruitData(prev => ({ ...prev, title }));
  };

  const handleContent = recruitContent => {
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

  const setUploadImg = thumbImgUrl => {
    setRecruitData(prev => ({ ...prev, thumbImgUrl }));
  };

  const removeRecruitImg = () => {
    setRecruitData(prev => ({ ...prev, thumbImgUrl: recruitBoardDefaultUrl }));
  };

  const handleCompleteWriteBoard = async () => {
    if (recruitData.title === "") {
      toast("제목을 입력하지 않았습니다!");
      return;
    }
    if (recruitData.recruitDurationWeek === 0) {
      toast("예상 소요 기간을 선택해주세요!");
      return;
    }
    if (recruitData.recruitLocation === 0) {
      toast("지역을 선택해 주세요!");
      return;
    }
    if (recruitData.recruitTasks.length === 0) {
      toast("직군을 추가해 주세요!");
      return;
    }
    if (recruitData.recruitContent === "") {
      toast("내용을 입력해주세요!");
      return;
    }
    const data = await completeWriteBoard(recruitData);
    if (data.success) {
      setIsSuccess(data.success);
    }
  };

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!userData) {
  //       Swal.fire({
  //         title: "잘못 된 접근 입니다!",
  //         showClass: {
  //           popup: "animate__animated animate__fadeInDown",
  //         },
  //         hideClass: {
  //           popup: "animate__animated animate__fadeOutUp",
  //         },
  //       }).then(() => {
  //         navigate("/recruit");
  //       });
  //     }
  //   }
  // }, [isLoading, navigate, userData]);

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
          <Content handleContent={handleContent} />
          <ImgUpload
            recruitData={recruitData}
            removeRecruitImg={removeRecruitImg}
            setUploadImg={setUploadImg}
          />
          <li className="text-right">
            <button
              className="rounded-[5px] mr-[24px] text-[17px] px-[15px] py-[6px] bg-black text-white"
              onClick={handleCompleteWriteBoard}
            >
              글 등록하기
            </button>
            <Link to="/recruit">
              <button className="rounded-[5px] bg-[#C4C4C4] text-[17px] px-[15px] py-[6px]">
                취소
              </button>
            </Link>
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
              <Link to="/recruit" replace={true}>
                <button className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] ">
                  메인 화면으로 가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        progressClassName="bar"
      />
    </section>
  );
}

export default RecruitWrite;
