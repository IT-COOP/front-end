import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useAddCommentMutation() {
  return useMutation(commentData => {
    return recruitApis.addRecruitComment(commentData);
  });
}

export default useAddCommentMutation;
