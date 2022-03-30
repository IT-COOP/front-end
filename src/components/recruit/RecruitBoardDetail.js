import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import { useQueryClient } from "react-query";

import { LeftArrow } from "../../assets/icons";
import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";

import useDeleteRecruitBoardMutation from "../../hooks/useDeleteRecruitBoardMutation";
import KeepItButton from "./recruitBoardDetailView/KeepItButton";
import AddCommentForm from "./recruitBoardDetailView/AddCommentForm";
import ApplyModal from "./recruitBoardDetailView/ApplyModal";
import BoardDetailInfo from "./recruitBoardDetailView/BoardDetailInfo";
import BoardDetailContent from "./recruitBoardDetailView/BoardDetailContent";
import CommentList from "./recruitBoardDetailView/CommentList";

function RecruitBoardDetail() {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");
  const [isApplyModalToggle, setIsApplyModalToggle] = useState(false);

  const { recruitId } = useParams();
  const { data: recruitBoard } = useGetRecruitDetailQuery(recruitId);
  const { mutateAsync: deleteRecruitBoard } = useDeleteRecruitBoardMutation();

  const deleteRecruitBoardHandler = async () => {
    const { success } = await deleteRecruitBoard(recruitId);
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  const completedRequiredPeople = Boolean(
    (recruitBoard?.recruitStacks.filter(
      stack => stack.numberOfPeopleRequired !== stack.numberOfPeopleSet,
    ).length ===
      0) &
      (recruitBoard?.recruitTasks.filter(
        task => task.numberOfPeopleRequired !== task.numberOfPeopleSet,
      ).length ===
        0),
  );

  const openApplyModal = () => {
    setIsApplyModalToggle(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalToggle(false);
  };

  return (
    <>
      <ul className="w-[1224px] mx-auto mt-[70px]">
        <li className="flex w-full">
          <img
            className="w-[392px] h-[269px] mr-[24px]"
            src={recruitBoard?.thumbImgUrl}
            alt="썸네일"
          />
          <div className="flex flex-wrap items-end w-full">
            <h1 className="text-[36px] w-full">{recruitBoard?.title}</h1>
            <ul className="flex items-end justify-between w-full">
              <BoardDetailInfo recruitBoard={recruitBoard} />
              <li className="flex ">
                <KeepItButton
                  recruitId={recruitId}
                  keepId={recruitBoard?.keepId}
                />
                <button
                  className={classNames(
                    "text-[19px]  px-[15px] py-[6px] rounded-[5px] bg-blue3 text-white",
                    {
                      "pointer-events-none lg:bg-gray2":
                        completedRequiredPeople,
                    },
                  )}
                  onClick={openApplyModal}
                >
                  신청하기
                </button>
              </li>
            </ul>
          </div>
        </li>
        <hr className="my-[40px] border-gray4"></hr>
        <BoardDetailContent recruitBoard={recruitBoard} />
        <li className="mb-[41px]">
          <div className="flex items-end justify-between mb-[17px]">
            <h3 className="text-[23px] ">댓글 작성하기</h3>
          </div>
          <AddCommentForm recruitId={recruitId} />
        </li>
        <CommentList recruitBoard={recruitBoard} recruitId={recruitId} />
        <Link to="/" className="block">
          <button className="flex items-center mt-[34px] mb-[136px] py-[6px] rounded-[20px] border-[1px] border-blue2 text-blue2 px-[17px] text-[23px]">
            <LeftArrow className="inline-block mr-[9px]" />
            목록으로
          </button>
        </Link>
      </ul>
      {isApplyModalToggle && (
        <ApplyModal
          stack={recruitBoard?.recruitStacks}
          task={recruitBoard?.recruitTasks}
          closeApplyModal={closeApplyModal}
        />
      )}
    </>
  );
}

export default RecruitBoardDetail;
