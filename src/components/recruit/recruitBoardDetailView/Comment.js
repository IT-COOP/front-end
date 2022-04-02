import React, { useState } from "react";
import classNames from "classnames";
import { useQueryClient } from "react-query";

import convertDateText from "../../../lib/convertDateText";

import useDeleteCommentMutation from "../../../hooks/useDeleteCommentMutation";
import AddCommentReplyForm from "./AddCommentReplyForm";
import EditComment from "./EditComment";

function Comment({ comment, recruitId, userId }) {
  const [isAddCommentReplyOpen, setIsAddCommentReplyOpen] = useState(false);
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
  const { mutateAsync: deleteComment } = useDeleteCommentMutation();
  const queryClient = useQueryClient();
  const deleteCommentHandler = recruitCommentId => async () => {
    const { success } = await deleteComment({ recruitCommentId, recruitId });
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  const openEditComment = () => {
    setIsEditCommentOpen(true);
  };
  const closeEditComment = () => {
    setIsEditCommentOpen(false);
  };

  const toggleCommentReply = () => {
    setIsAddCommentReplyOpen(prev => !prev);
  };

  const closeCommentReply = () => {
    setIsAddCommentReplyOpen(false);
  };

  console.log(comment);

  return (
    <li
      className={classNames("pt-[30px] pb-[40px] border-t-[1px] border-gray2", {
        "pl-[80px]": comment.commentDepth === 1,
      })}
    >
      <div className="flex items-center mb-[21px]">
        <div className="flex items-center mr-[23px] ">
          <img
            src={comment.user.profileImgUrl}
            alt="유저 프로필"
            className="w-[44px] h-[44px] rounded-full overflow-hidden mr-[11px] "
          />
          <p>{comment.user.nickname}</p>
        </div>
        <div className="text-[17px] text-gray4">
          {convertDateText(comment.createdAt)}
        </div>
      </div>
      {isEditCommentOpen ? (
        <EditComment
          commentId={comment.recruitCommentId}
          commentGroup={comment.commentGroup}
          commentContent={comment.recruitCommentContent}
          recruitId={comment.recruitPostId}
          commentDepth={comment.commentDepth}
          closeEditComment={closeEditComment}
        />
      ) : (
        <>
          <p className="mb-[33px]">{comment.recruitCommentContent}</p>
          <div className="flex items-end justify-between mb-[20px]">
            <div>
              {comment.userId === userId ? (
                <>
                  <button
                    className="text-[15px] text-gray4 mr-[12px]"
                    onClick={openEditComment}
                  >
                    수정하기
                  </button>
                  <button
                    className="text-[15px] text-gray4"
                    onClick={deleteCommentHandler(comment.recruitCommentId)}
                  >
                    삭제하기
                  </button>
                </>
              ) : null}
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
        </>
      )}
      {comment.commentDepth === 0
        ? isAddCommentReplyOpen && (
            <AddCommentReplyForm
              commentGroup={comment.commentGroup}
              recruitId={comment.recruitPostId}
              user={comment.user}
              userId={comment.userId}
              closeCommentReply={closeCommentReply}
            />
          )
        : null}
    </li>
  );
}

export default Comment;
