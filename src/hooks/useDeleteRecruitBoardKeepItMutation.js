import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useDeleteRecruitBoardKeepItMutation() {
  return useMutation(recruitBoardId => {
    return recruitApis.deleteKeepItRecruitBoard(recruitBoardId);
  });
}

export default useDeleteRecruitBoardKeepItMutation;
