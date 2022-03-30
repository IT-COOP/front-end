import { useMutation } from "react-query";
import { userApis } from "../apis/userApi";

function useUploadUserProfileImgMutation() {
  return useMutation(formData => {
    return userApis.uploadUserProfileImg(formData);
  });
}

export default useUploadUserProfileImgMutation;
