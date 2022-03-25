import { useMutation } from "react-query";
import { recruitApis } from "../apis/recruitApi";

function useAddCommentMutation() {
  return useMutation(commentData => {
    console.log(commentData);
    return recruitApis.addRecruitComment(commentData);
  });
}

export default useAddCommentMutation;
