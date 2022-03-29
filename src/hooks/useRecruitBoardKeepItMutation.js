import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useRecruitBoardKeepItMutation() {
  return useMutation(recruitBoardId =>
    recruitApis.keepItRecruitBoard(recruitBoardId),
  );
}

export default useRecruitBoardKeepItMutation;
