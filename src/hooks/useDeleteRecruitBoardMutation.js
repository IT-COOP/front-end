import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useDeleteRecruitBoardMutation() {
  return useMutation(recruitBoardId => {
    return recruitApis.deleteRecruitBoard(recruitBoardId);
  });
}

export default useDeleteRecruitBoardMutation;
