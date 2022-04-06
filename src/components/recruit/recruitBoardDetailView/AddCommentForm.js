import React, { useState } from "react";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";

import useAddCommentMutation from "../../../hooks/useAddCommentMutation";
function AddCommentForm({ recruitId, isLogin }) {
  const [recruitCommentContent, setRecruitCommentContent] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync: addComment } = useAddCommentMutation();

  const commentContentHandler = onChangeEvent => {
    setRecruitCommentContent(onChangeEvent.target.value);
  };

  const addCommentHandler = async submitEvent => {
    submitEvent.preventDefault();
    if (recruitCommentContent === "") {
      return;
    }
    if (!isLogin) {
      Swal.fire({
        title: "로그인 후 이용해 주세요!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
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
      setRecruitCommentContent("");
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };
  return (
    <form className="w-full overflow-hidden" onSubmit={addCommentHandler}>
      <textarea
        type="text"
        placeholder="댓글을 작성하세요"
        className="block w-full h-[135px] p-[11px] resize-none border-[1px] border-gray2 mb-[13px]"
        value={recruitCommentContent}
        onChange={commentContentHandler}
        maxLength="150"
        onKeyPress={e => {
          if ((e.key === "Enter") & e.shiftKey) {
            return;
          }
          if (e.key === "Enter") {
            addCommentHandler(e);
          }
        }}
      />
      <button className="float-right mr-[13px] text-[19px] px-[15px] py-[6px] rounded-[5px] text-white bg-blue3">
        댓글 작성
      </button>
    </form>
  );
}

export default AddCommentForm;
