import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useUploadRecruitBoardImgMutation() {
  return useMutation(formData => {
    return recruitApis.uploadRecruitBoardImg(formData);
  });
}

export default useUploadRecruitBoardImgMutation;
