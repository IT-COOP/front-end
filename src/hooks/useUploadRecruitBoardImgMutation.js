import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useUploadRecruitBoardImgMutation() {
  return useMutation(formData => {
    console.log(formData);
    return recruitApis.uploadRecruitBoardImg(formData);
  });
}

export default useUploadRecruitBoardImgMutation;
