import React, { useState } from "react";
import classNames from "classnames";
import { useQueryClient } from "react-query";

import { Dot } from "../../../assets/icons";
import convertDateText from "../../../lib/convertDateText";

import useDeleteCommentMutation from "../../../hooks/useDeleteCommentMutation";
import AddCommentReplyForm from "./AddCommentReplyForm";
import EditComment from "./EditComment";

function Comment({ comment, recruitId, userId }) {
  const [isAddCommentReplyOpen, setIsAddCommentReplyOpen] = useState(false);
  const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);
  const [isEditAndDeleteModalOpen, setIsEditAndDeleteModalOpen] =
    useState(false);
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
    setIsEditAndDeleteModalOpen(prev => !prev);
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

  const toggleEditAndDeleteModal = () => {
    setIsEditAndDeleteModalOpen(prev => !prev);
  };

  return (
    <li
      className={classNames(
        "pt-[30px] pb-[40px] border-t-[1px] border-gray2 relative",
        {
          "pl-[80px]": comment.commentDepth === 1,
        },
      )}
    >
      <div className="flex items-center mb-[21px] justify-between">
        <div className="flex items-center mr-[23px] ">
          <img
            src={comment.user.profileImgUrl}
            alt="유저 프로필"
            className="w-[44px] h-[44px] rounded-full overflow-hidden mr-[11px] "
          />
          <p>{comment.user.nickname}</p>
        </div>
        <div className="">
          {comment.userId === userId ? (
            <>
              <button className="mr-[20px]" onClick={toggleEditAndDeleteModal}>
                <Dot />
              </button>
              {isEditAndDeleteModalOpen && (
                <div className="absolute border rounded-[5px] border-gray5 right-[20px] bg-white">
                  <button
                    className="block text-[14px] w-[85px] leading-[40px] text-gray4 text-center hover:font-bold"
                    onClick={openEditComment}
                  >
                    수정
                  </button>
                  <button
                    className="block text-[14px] w-[85px] leading-[40px] text-gray4 text-center hover:font-bold"
                    onClick={deleteCommentHandler(comment.recruitCommentId)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </>
          ) : null}
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
          <div className="flex items-end mb-[20px]">
            <div className="text-[17px] text-gray4 mr-[20px]">
              {convertDateText(comment.createdAt)}
            </div>
            {true && (
              <>
                <button
                  className="text-[17px] text-gray4"
                  onClick={toggleCommentReply}
                >
                  답글 달기
                </button>
              </>
            )}
          </div>
        </>
      )}
      {isAddCommentReplyOpen && (
        <AddCommentReplyForm
          commentGroup={comment.commentGroup}
          recruitId={comment.recruitPostId}
          user={comment.user}
          userId={comment.userId}
          closeCommentReply={closeCommentReply}
        />
      )}
    </li>
  );
}

export default Comment;
