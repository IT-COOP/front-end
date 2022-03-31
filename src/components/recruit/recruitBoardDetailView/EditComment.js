import React, { useState } from "react";
import { useQueryClient } from "react-query";

import useEditCommentMutation from "../../../hooks/useEditCommentMutation";
function EditComment({
  recruitId,
  commentGroup,
  commentId,
  commentContent,
  commentDepth,
}) {
  const [recruitCommentContent, setRecruitCommentContent] =
    useState(commentContent);
  const queryClient = useQueryClient();
  const { mutateAsync: editComment } = useEditCommentMutation();

  const commentContentHandler = onChangeEvent => {
    setRecruitCommentContent(onChangeEvent.target.value);
  };

  const editCommentHandler = async submitEvent => {
    submitEvent.preventDefault();
    let textareaValue = submitEvent.target.children[0].value;
    if (textareaValue === "") {
      return;
    }

    const commentData = {
      commentData: {
        recruitCommentContent,
        commentGroup,
        commentDepth,
      },
      recruitId,
      commentId,
    };
    const { success } = await editComment(commentData);
    if (success) {
      submitEvent.target.children[0].value = "";
      setRecruitCommentContent("");
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  return (
    <div onSubmit={editCommentHandler} className="w-full overflow-hidden">
      <textarea
        type="text"
        placeholder="댓글을 작성하세요"
        className="block w-full h-[135px] p-[11px] resize-none border-[1px] border-gray2 mb-[13px]"
        onChange={commentContentHandler}
        maxLength="150"
        value={recruitCommentContent}
      />
      <button className="float-right mr-[13px] text-[15px] px-[15px] py-[6px] rounded-[5px] text-white bg-blue3">
        수정하기
      </button>
    </div>
  );
}

export default EditComment;
