import React, { useState } from "react";
import classNames from "classnames";
import useUploadRecruitBoardImgMutation from "../../../hooks/useUploadRecruitBoardImgMutation";

const ImgUpload = ({ recruitData, removeRecruitImg, setUploadImg }) => {
  const [isImgConfirmMsg, setIsImgConfirmMsg] = useState(false);

  const { mutateAsync: recruitBoardImgUpload } =
    useUploadRecruitBoardImgMutation();

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
    const { data: thumbImgUrl } = await recruitBoardImgUpload(formData);
    setUploadImg(thumbImgUrl);
  };

  const deleteRecruitBoardImg = () => {
    removeRecruitImg();
  };
  return (
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
            className={classNames("absolute duration-700 transition-all", {
              "text-red text-[20px]": isImgConfirmMsg,
            })}
          >
            jpg 혹은 png 파일만 업로드 해주세요!
          </p>
        </div>
      </div>
    </li>
  );
};

export default ImgUpload;
