import React, { useState } from "react";
import classNames from "classnames";
import { useQueryClient } from "react-query";

import convertDateText from "../../../lib/convertDateText";

import useDeleteCommentMutation from "../../../hooks/useDeleteCommentMutation";
import AddCommentReplyForm from "./AddCommentReplyForm";

function Comment({ comment, recruitId }) {
  const [isAddCommentReplyToggle, setIsAddCommentReplyToggle] = useState(false);
  const { mutateAsync: deleteComment } = useDeleteCommentMutation();
  const queryClient = useQueryClient();
  const deleteCommentHandler = recruitCommentId => async () => {
    const { success } = await deleteComment({ recruitCommentId, recruitId });
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  const toggleCommentReply = () => {
    setIsAddCommentReplyToggle(prev => !prev);
  };

  return (
    <li
      key={comment.recruitCommentId}
      className={classNames("pt-[30px] pb-[40px] border-t-[1px] border-gray2", {
        "pl-[80px]": comment.commentDepth === 1,
      })}
    >
      <div className="flex items-center mb-[21px]">
        <div className="flex items-center mr-[23px] ">
          <img
            src={comment.user.profileImgUrl}
            alt="유저 프로필"
            className="w-[44px] h-[44px] rounded-full overflow-hidden mr-[11px]"
          />
          <p>{comment.user.nickname}</p>
        </div>
        <div className="text-[17px] text-gray4">
          {convertDateText(comment.createdAt)}
        </div>
      </div>
      <p className="mb-[33px]">{comment.recruitCommentContent}</p>
      <div className="flex items-end justify-between mb-[20px]">
        <div>
          <button className="text-[15px] text-gray4 mr-[12px]">수정하기</button>
          <button
            className="text-[15px] text-gray4"
            onClick={deleteCommentHandler(comment.recruitCommentId)}
          >
            삭제하기
          </button>
        </div>
        {comment.commentDepth === 0 ? (
          <button
            className="border-[1px] border-blue3 text-[19px] text-blue3 px-[15px] py-[6px] rounded-[5px]"
            onClick={toggleCommentReply}
          >
            대댓글작성
          </button>
        ) : null}
      </div>
      {comment.commentDepth === 0
        ? isAddCommentReplyToggle && (
            <AddCommentReplyForm
              commentGroup={comment.commentGroup}
              recruitId={comment.recruitPostId}
              user={comment.user}
              userId={comment.userId}
            />
          )
        : null}
    </li>
  );
}

export default Comment;
