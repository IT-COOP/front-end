import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useDeleteCommentMutation() {
  return useMutation(recruitCommentInfo => {
    return recruitApis.deleteRecruitComment(recruitCommentInfo);
  });
}

export default useDeleteCommentMutation;
