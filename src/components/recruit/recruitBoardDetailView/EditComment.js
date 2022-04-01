import React, { useState } from "react";
import { useQueryClient } from "react-query";

import useEditCommentMutation from "../../../hooks/useEditCommentMutation";
function EditComment({
  recruitId,
  commentGroup,
  commentId,
  commentContent,
  commentDepth,
  closeEditComment,
}) {
  const [recruitCommentContent, setRecruitCommentContent] =
    useState(commentContent);
  const queryClient = useQueryClient();
  const { mutateAsync: editComment } = useEditCommentMutation();

  const commentContentHandler = onChangeEvent => {
    setRecruitCommentContent(onChangeEvent.target.value);
  };

  const editCommentHandler = async submitEvent => {
    console.log(123123132);
    submitEvent.preventDefault();
    if (recruitCommentContent === "") {
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
      setRecruitCommentContent("");
      queryClient.invalidateQueries("recruitBoardDetail");
      closeEditComment();
    }
  };

  return (
    <form onSubmit={editCommentHandler} className="w-full overflow-hidden">
      <textarea
        type="text"
        placeholder="댓글을 작성하세요"
        className="block w-full h-[135px] p-[11px] resize-none border-[1px] border-gray2 mb-[13px]"
        onChange={commentContentHandler}
        maxLength="150"
        value={recruitCommentContent}
        onKeyPress={e => {
          if ((e.key === "Enter") & e.shiftKey) {
            return;
          }
          if (e.key === "Enter") {
            editCommentHandler(e);
          }
        }}
      />
      <div className="text-right">
        <button className="text-[15px] mr-[23px] px-[15px] py-[6px] rounded-[5px] text-white bg-blue3">
          수정하기
        </button>
        <button
          className="text-[15px] px-[15px] py-[6px] rounded-[5px] text-white bg-blue3"
          onClick={closeEditComment}
        >
          취소하기
        </button>
      </div>
    </form>
  );
}

export default EditComment;
