import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Swal from "sweetalert2";

import { Location } from "../../constants/enums";
import useUploadRecruitBoardImgMutation from "../../hooks/useUploadRecruitBoardImgMutation";
import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";
import useEditRecruitBoardMutation from "../../hooks/useEditRecruitBoardMutation";
import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";
import { Completion } from "../../assets/icons";

function RecruitEdit() {
  const { recruitId } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isImgConfirmMsg, setIsImgConfirmMsg] = useState(false);
  const { data: userData } = useGetUserInfoQuery();
  const config = {
    refetchOnWindowFocus: false,
  };
  const navigate = useNavigate();
  const {
    data: recruitBoard,
    isSuccess: recruitBoardIsSuccess,
    isLoading,
  } = useGetRecruitDetailQuery(recruitId, config);

  const [recruitData, setRecruitData] = useState({
    title: "",
    recruitContent: "",
    recruitLocation: 1,
    recruitDurationWeek: 1,
    thumbImgUrl: "",
  });

  useEffect(() => {
    if (recruitBoard?.userId !== userData?.userId) {
      Swal.fire({
        title: "잘못 된 접근 입니다!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(() => {
        navigate("/recruit");
      });
    }
  }, [navigate, recruitBoard?.userId, userData?.userId]);

  useEffect(() => {
    if (recruitBoardIsSuccess) {
      setRecruitData(prev => ({
        ...prev,
        title: recruitBoard.title,
        recruitContent: recruitBoard.recruitContent,
        recruitLocation: recruitBoard.recruitLocation,
        recruitDurationWeek: recruitBoard.recruitDurationWeeks,
        thumbImgUrl: recruitBoard.thumbImgUrl,
      }));
    }
  }, [recruitBoardIsSuccess, recruitBoard]);

  const locationList = Object.values(Location).filter(v => !isNaN(v));

  const { mutateAsync: recruitBoardImgUpload } =
    useUploadRecruitBoardImgMutation();

  const { mutateAsync: completeEditBoard } = useEditRecruitBoardMutation();

  const handleTitle = inputText => {
    const title = inputText.target.value;
    setRecruitData(prev => ({ ...prev, title }));
  };

  const handleContent = inputText => {
    const recruitContent = inputText.target.value;
    setRecruitData(prev => ({ ...prev, recruitContent }));
  };

  const handleDurationWeek = selectValue => {
    const recruitDurationWeek = selectValue.target.value;
    setRecruitData(prev => ({
      ...prev,
      recruitDurationWeek: Number(recruitDurationWeek),
    }));
  };

  const handleLocation = selectValue => {
    const recruitLocation = selectValue.target.value;
    setRecruitData(prev => ({
      ...prev,
      recruitLocation: Number(recruitLocation),
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
    const editData = {
      recruitData,
      recruitPostId: recruitId,
    };

    const data = await completeEditBoard(editData);
    if (data.success) {
      setIsSuccess(data.success);
    }
  };

  return (
    <section className="w-full py-[68px] bg-white3">
      <div className="w-[1224px] mx-auto">
        <h1 className="text-[24px] mb-[21px]">모집글 수정하기</h1>
        <ul className="border-[1px] px-[30px] py-[24px] border-gray2 rounded-[8px] bg-white pb-[80px]">
          <li className="flex items-center mb-[60px]">
            <p className="w-[208px] text-[17px]"> 제목 </p>
            <input
              className="text-[20px] py-[10px] flex-1 border-b-[1px]"
              maxLength={20}
              type="text"
              placeholder="20글자 이내로 작성해주세요!"
              onChange={handleTitle}
              value={recruitData.title}
            />
          </li>
          <li className="flex items-center mb-[62px]">
            <p className="w-[208px] text-[17px]"> 예상 소요 기간 </p>
            <select
              className="border-[1px] border-black px-[20px] w-[392px] text-[17px] h-[40px] "
              defaultValue={recruitData.recruitDurationWeek}
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
              defaultValue={recruitBoard?.location}
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

          <hr className="my-[30px] border-[#C4C4C4]"></hr>
          <li className="flex pb-[60px]">
            <p className="w-[208px] text-[17px]"> 내용 </p>
            <textarea
              className="flex-1 h-[315px] border border-gray3 resize-none p-[4px] applyUserUl"
              type="text"
              value={recruitData.recruitContent}
              onChange={handleContent}
            />
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
                  <button className="block rounded-[5px] px-[15px] py-[6px] bg-[#C4C4C4]">
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
              글 수정하기
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
                글 수정이 완료되었습니다.
              </h3>
              <Completion className="mx-auto mb-[50px]" />
              <Link to={`/recruit/${recruitId}`}>
                <button className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] ">
                  게시글로 가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default RecruitEdit;
