import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { LeftArrow } from "../../assets/icons";

import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";
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

  const navigate = useNavigate();

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
    if (!Boolean(userData)) {
      Swal.fire({
        title: "???????????? ??????????????????!",
        confirmButtonText: "??????",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }
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

  const routeAppliedUserList = () => {
    navigate(`/apply/${recruitId}`);
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
          userId={userData?.userId}
          closeModal={closeRecruitCompletionModal}
        />
      )}
      <ul className="relative w-[1224px] mx-auto mt-[70px]">
        <li className="flex w-full">
          <img
            className="w-[392px] h-[269px] mr-[24px]"
            src={recruitBoard?.thumbImgUrl}
            alt="?????????"
          />
          <div className="flex flex-wrap items-end w-full">
            <h1 className="text-[36px] w-full">{recruitBoard?.title}</h1>
            <ul className="flex items-end justify-between w-full">
              <BoardDetailInfo recruitBoard={recruitBoard} />
              <li className="flex gap-[10px]">
                {recruitBoard?.status === 1 || recruitBoard?.status === 2 ? (
                  <button className="text-[19px]  px-[15px] py-[6px] border-blue3 border-[1px] rounded-[5px] bg-blue3 text-white mr-[9px]">
                    {recruitBoard?.status === 1
                      ? "??????????????????."
                      : "?????????????????????."}
                  </button>
                ) : userData?.userId === recruitBoard?.userId ? (
                  <>
                    <button
                      className="text-[19px]  px-[15px] py-[6px] border-blue3 border-[1px] rounded-[5px] bg-blue3 text-white mr-[9px]"
                      onClick={routeAppliedUserList}
                    >
                      ????????? ??????
                    </button>
                    <button
                      className={classNames(
                        "text-[19px]  px-[15px] py-[6px]  border-blue3 border-[1px] rounded-[5px] text-blue3 bg-white",
                      )}
                      onClick={openRecruitCompletionModal}
                    >
                      ?????? ????????????
                    </button>
                  </>
                ) : (
                  <>
                    <KeepItButton
                      recruitId={recruitId}
                      keepId={recruitBoard?.keepId}
                      userId={userData?.userId}
                      isLogin={Boolean(userData)}
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
                        ????????????
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
                        ????????????
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
            <h3 className="text-[23px] ">?????? ????????????</h3>
          </div>
          <AddCommentForm recruitId={recruitId} isLogin={Boolean(userData)} />
        </li>
        <CommentList
          recruitBoard={recruitBoard}
          recruitId={recruitId}
          userId={userData?.userId}
        />
        <Link to="/recruit" className="block">
          <button className="flex items-center mt-[34px] mb-[136px] py-[6px] rounded-[20px] border-[1px] border-blue2 text-blue2 px-[17px] text-[23px]">
            <LeftArrow className="inline-block mr-[9px]" />
            ????????????
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
