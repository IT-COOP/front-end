import React from "react";
import { useQueryClient } from "react-query";

import useUploadUserProfileImgMutation from "../../../../hooks/useUploadUserProfileImgMutation";

import { Camera } from "../../../../assets/icons";

function EditUserImage({ onChange }) {
  const client = useQueryClient();
  const { userInfo } = client.getQueryData("userInfo");
  const { mutate } = useUploadUserProfileImgMutation();

  const handleFileChange = e => {
    const formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);

    mutate(formData, {
      onSuccess: ({ data: remoteImageUrl }) => {
        client.setQueryData("userInfo", user => {
          return {
            ...user,
            userInfo: { ...userInfo, profileImgUrl: remoteImageUrl },
          };
        });
        onChange(remoteImageUrl);
      },
    });
  };

  return (
    <div className="shrink-0 w-[140px] h-[140px] relative">
      <img
        src={userInfo.profileImgUrl}
        alt={`${userInfo.nickname}'s profile`}
        className="object-cover w-full h-full rounded-full"
      />
      <label className="absolute bottom-0 right-0 w-[34px] h-[34px] cursor-pointer bg-white rounded-full flex justify-center items-center border border-solid border-[#cccccc]">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <Camera />
      </label>
    </div>
  );
}

export default EditUserImage;
