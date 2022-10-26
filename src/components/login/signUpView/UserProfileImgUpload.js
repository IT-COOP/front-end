import React from "react";

import { Prev } from "../../../assets/icons";

import useUploadUserProfileImgMutation from "../../../hooks/useUploadUserProfileImgMutation";

function UserProfileImgUpload({
  handleNextChapter,
  handlePrevChapter,
  profileImgUrl,
  handleProfileImg,
  defaultImageUrl,
}) {
  const { mutateAsync: uploadImg } = useUploadUserProfileImgMutation();

  const uploadUserProfileImg = async e => {
    const formData = new FormData();
    let file = e.target.files[0];
    const regex = new RegExp("png|jpg");
    if (!file) {
      return;
    }
    if (!regex.test(file.name.slice(-3))) {
      return;
    }
    formData.append("image", file);
    const { data: imgUrl } = await uploadImg(formData);
    handleProfileImg(imgUrl);
  };
  const setDefaultImg = () => {
    handleProfileImg(defaultImageUrl);
  };

  return (
    <li className="flex flex-col absolute w-[800px] h-[500px] duration-700  bg-white opacity-0  px-[158px] rounded-[16px] ">
      <button
        className="absolute top-[14px] left-[14px]"
        onClick={handlePrevChapter}
      >
        <Prev />
      </button>
      <h1 className="text-center font-bold text-[30px] mt-[74px] mb-[32px]">
        사용하실 프로필 사진을 설정해주세요.
      </h1>
      <p className="text-center text-[20px] text-[#797979] mb-[40px] ">
        서비스를 이용할 때 사용되는 이미지에요!
      </p>
      <ul className="relative flex items-center justify-center mb-[36px]">
        <li>
          <img
            src={profileImgUrl}
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
          <button
            className="w-[126px] h-[40px] rounded-[5px] bg-gray2 text-[18px] leading-[22.54px]"
            onClick={setDefaultImg}
          >
            프로필 삭제
          </button>
        </li>
        <p className="absolute top-[100%] mt-[10px]">
          PNG, JPG 파일만 업로드 가능합니다!
        </p>
      </ul>
      <button
        className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px]"
        onClick={handleNextChapter}
      >
        다음으로
      </button>
    </li>
  );
}

export default UserProfileImgUpload;
