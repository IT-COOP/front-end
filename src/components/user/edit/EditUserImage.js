import React from "react";
import { useQueryClient } from "react-query";

import useUploadUserProfileImgMutation from "../../../hooks/useUploadUserProfileImgMutation";

import { Camera } from "../../../assets/icons";

function EditUserImage({ onChange, profileImgUrl, nickname }) {
  const client = useQueryClient();

  const { mutate } = useUploadUserProfileImgMutation();

  const handleFileChange = e => {
    const formData = new FormData();
    let file = e.target.files[0];
    formData.append("image", file);

    mutate(formData, {
      onSuccess: ({ data: remoteImageUrl }) => {
        client.setQueryData(["userInfo", "currentUser"], user => {
          return {
            ...user,
            profile: { ...user.profile, profileImgUrl: remoteImageUrl },
          };
        });
        onChange(remoteImageUrl);
      },
    });
  };

  return (
    <div className="shrink-0 w-[140px] h-[140px] relative">
      <img
        src={profileImgUrl}
        alt={`${nickname}'s profile`}
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
