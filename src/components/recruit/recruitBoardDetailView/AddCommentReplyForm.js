import React, { useState } from "react";
import { useQueryClient } from "react-query";

import useAddCommentMutation from "../../../hooks/useAddCommentMutation";

const AddCommentReplyForm = ({
  commentGroup,
  recruitId,
  user,
  userId,
  closeCommentReply,
}) => {
  const [recruitCommentReplyContent, setRecruitCommentReplyContent] =
    useState("");

  const queryClient = useQueryClient();
  const { mutateAsync: addCommentReply } = useAddCommentMutation();

  const commentReplyContentHandler = onChangeEvent => {
    setRecruitCommentReplyContent(onChangeEvent.target.value);
  };

  console.log(commentGroup);
  const addCommentReplyHandler = async submitEvent => {
    submitEvent.preventDefault();
    let textareaValue = submitEvent.target.children[1].value;
    if (textareaValue === "") {
      return;
    }
    const commentData = {
      commentData: {
        recruitCommentContent: recruitCommentReplyContent,
        commentGroup,
      },
      recruitId,
    };
    const { success } = await addCommentReply(commentData);
    if (success) {
      submitEvent.target.children[1].value = "";
      setRecruitCommentReplyContent("");
      queryClient.invalidateQueries("recruitBoardDetail");
      closeCommentReply();
    }
  };

  const date = new Date();
  const nowDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

  return (
    <form
      onSubmit={addCommentReplyHandler}
      className="w-full overflow-hidden pl-[40px] border-t-[1px] border-gray2 pt-[30px] pb-[20px]"
    >
      <div className="flex items-center pb-[20px]">
        <img
          className="block rounded-full w-[44px] h-[44px] mr-[11px]"
          alt="댓글 작성자 프로필 이미지"
          src={`/${user.profileImgUrl}`}
        />
        <p className="text-[18px] mr-[20px]">{user.nickname}</p>
        <p className="text-[18px] text-gray3">{nowDate}</p>
      </div>
      <textarea
        type="text"
        placeholder="댓글을 작성하세요"
        className="block w-full h-[135px] p-[11px] resize-none border-[1px] border-gray2 mb-[13px]"
        onChange={commentReplyContentHandler}
        maxLength="150"
      />
      <button className="float-right mr-[13px] text-[19px] px-[15px] py-[6px] rounded-[5px] text-white bg-blue3">
        작성하기
      </button>
    </form>
  );
};
export default AddCommentReplyForm;
