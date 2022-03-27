import { useMutation } from "react-query";
import { userApis } from "../apis/recruitApi";

function useUploadUserProfileImgMutation() {
  return useMutation(formData => {
    return userApis.uploadUserProfileImg(formData);
  });
}

export default useUploadUserProfileImgMutation;
