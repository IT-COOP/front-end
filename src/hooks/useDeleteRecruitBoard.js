import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useDeleteRecruitBoard() {
  return useMutation(recruitBoardId => {
    return recruitApis.deleteRecruitBoard(recruitBoardId);
  });
}

export default useDeleteRecruitBoard;
