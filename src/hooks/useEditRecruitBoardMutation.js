import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useEditRecruitBoardMutation() {
  return useMutation(editData => recruitApis.editRecruitBoard(editData));
}

export default useEditRecruitBoardMutation;
