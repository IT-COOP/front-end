import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import { useQueryClient } from "react-query";

import { LeftArrow } from "../../assets/icons";
import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";
// import { io } from "socket.io-client";

import useGetUserInfoQuery from "../../hooks/useGetUserInfoQuery";
import useCancelApplyRecruitMutation from "../../hooks/useCancelApplyRecruitMutation";
import KeepItButton from "./recruitBoardDetailView/KeepItButton";
import AddCommentForm from "./recruitBoardDetailView/AddCommentForm";
import ApplyModal from "./recruitBoardDetailView/ApplyModal";
import BoardDetailInfo from "./recruitBoardDetailView/BoardDetailInfo";
import BoardDetailContent from "./recruitBoardDetailView/BoardDetailContent";
import CommentList from "./recruitBoardDetailView/CommentList";
import BoardEditAndDelete from "./recruitBoardDetailView/BoardEditAndDelete";
import RecruitDeleteModal from "./modal/RecruitDeleteModal";
import RecruitCompletionModal from "./modal/RecruitCompletionModal";

function RecruitBoardDetail() {
  const queryClient = useQueryClient();
  const { data: userData } = useGetUserInfoQuery();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { recruitId } = useParams();
  const { data: recruitBoard } = useGetRecruitDetailQuery(recruitId);
  const { mutateAsync: cancelApply } = useCancelApplyRecruitMutation();
  const [isBoardDeleteModalOpen, setIsBoardDeleteModalOpen] = useState(false);
  const [isOpenRecruitCompletionModal, setIsOpenRecruitCompletionModal] =
    useState(false);

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
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  const cancelRecruitApply = async () => {
    const applyData = {
      recruitId,
      applyId: recruitBoard.applyId,
    };
    const { success } = await cancelApply(applyData);
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  const openBoardDeleteModal = () => {
    setIsBoardDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsBoardDeleteModalOpen(false);
  };

  const openRecruitCompletionModal = () => {
    setIsOpenRecruitCompletionModal(true);
  };

  const closeRecruitCompletionModal = () => {
    setIsOpenRecruitCompletionModal(false);
  };

  return (
    <>
      {isBoardDeleteModalOpen && (
        <RecruitDeleteModal
          close={closeDeleteModal}
          boardDelete={isBoardDeleteModalOpen}
          recruitId={recruitId}
        />
      )}
      {isOpenRecruitCompletionModal && (
        <RecruitCompletionModal
          recruitId={recruitId}
          closeModal={closeRecruitCompletionModal}
        />
      )}
      <ul className="relative w-[1224px] mx-auto mt-[70px]">
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
              <li className="flex gap-[10px]">
                {userData?.userId === recruitBoard?.userId ? (
                  <>
                    <button
                      className="text-[19px]  px-[15px] py-[6px] border-blue3 border-[1px] rounded-[5px] bg-blue3 text-white mr-[9px]"
                      // onClick={handleEditButtonClick}
                    >
                      신청자 목록
                    </button>
                    <button
                      className={classNames(
                        "text-[19px]  px-[15px] py-[6px]  border-blue3 border-[1px] rounded-[5px] text-blue3 bg-white",
                      )}
                      onClick={openRecruitCompletionModal}
                    >
                      모집 마감하기
                    </button>
                  </>
                ) : (
                  <>
                    <KeepItButton
                      recruitId={recruitId}
                      keepId={recruitBoard?.keepId}
                      userId={userData?.userId}
                    />
                    {Boolean(recruitBoard?.applyId) ? (
                      <button
                        className={classNames(
                          "text-[19px]  px-[15px] py-[6px] rounded-[5px] bg-blue3 text-white",
                          {
                            "pointer-events-none lg:bg-gray2":
                              completedRequiredPeople,
                          },
                        )}
                        onClick={cancelRecruitApply}
                      >
                        취소하기
                      </button>
                    ) : (
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
                    )}
                  </>
                )}
              </li>
            </ul>
          </div>
        </li>
        <hr className="my-[40px] border-gray4"></hr>
        <BoardDetailContent recruitBoard={recruitBoard} />
        <div>
          {userData?.userId === recruitBoard?.userId ? (
            <BoardEditAndDelete
              openBoardDeleteModal={openBoardDeleteModal}
              recruitId={recruitId}
            />
          ) : null}
        </div>

        <li className="mb-[41px]">
          <div className="flex items-end justify-between mb-[17px]">
            <h3 className="text-[23px] ">댓글 작성하기</h3>
          </div>
          <AddCommentForm recruitId={recruitId} />
        </li>
        <CommentList
          recruitBoard={recruitBoard}
          recruitId={recruitId}
          userId={userData?.userId}
        />
        <Link to="/" className="block">
          <button className="flex items-center mt-[34px] mb-[136px] py-[6px] rounded-[20px] border-[1px] border-blue2 text-blue2 px-[17px] text-[23px]">
            <LeftArrow className="inline-block mr-[9px]" />
            목록으로
          </button>
        </Link>
      </ul>
      {isApplyModalOpen && (
        <ApplyModal
          stack={recruitBoard?.recruitStacks}
          task={recruitBoard?.recruitTasks}
          closeApplyModal={closeApplyModal}
          recruitId={recruitId}
        />
      )}
    </>
  );
}

export default RecruitBoardDetail;
