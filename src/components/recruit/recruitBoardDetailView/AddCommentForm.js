import React, { useState } from "react";
import { useQueryClient } from "react-query";

import useAddCommentMutation from "../../../hooks/useAddCommentMutation";
function AddCommentForm({ recruitId }) {
  const [recruitCommentContent, setRecruitCommentContent] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync: addComment } = useAddCommentMutation();

  const commentContentHandler = onChangeEvent => {
    setRecruitCommentContent(onChangeEvent.target.value);
  };

  const addCommentHandler = async submitEvent => {
    submitEvent.preventDefault();
    let textareaValue = submitEvent.target.children[0].value;
    if (textareaValue === "") {
      return;
    }
    const commentData = {
      commentData: {
        recruitCommentContent,
        commentGroup: 0,
      },
      recruitId,
    };
    const { success } = await addComment(commentData);
    if (success) {
      submitEvent.target.children[0].value = "";
      setRecruitCommentContent("");
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };
  return (
    <form onSubmit={addCommentHandler} className="w-full overflow-hidden">
      <textarea
        type="text"
        placeholder="댓글을 작성하세요"
        className="block w-full h-[135px] p-[11px] resize-none border-[1px] border-gray2 mb-[13px]"
        onChange={commentContentHandler}
        maxLength="150"
      />
      <button className="float-right mr-[13px] text-[19px] px-[15px] py-[6px] rounded-[5px] text-white bg-blue3">
        댓글 작성
      </button>
    </form>
  );
}

export default AddCommentForm;
