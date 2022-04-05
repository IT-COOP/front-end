import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useEditCommentMutation() {
  return useMutation(commentData => {
    return recruitApis.editRecruitComment(commentData);
  });
}

export default useEditCommentMutation;
