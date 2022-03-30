import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import { useQueryClient } from "react-query";

import { Location, Task, Stack } from "../../constants/enums";
import { KeepIt, KeepItActive, LeftArrow } from "../../assets/icons";
import convertDateText from "../../lib/convertDateText";

import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";

import useDeleteCommentMutation from "../../hooks/useDeleteCommentMutation";
import useDeleteRecruitBoardMutation from "../../hooks/useDeleteRecruitBoardMutation";
import KeepItButton from "./recruitBoardDetailView/KeepItButton";
import AddCommentForm from "./recruitBoardDetailView/AddCommentForm";
import ApplyModal from "./recruitBoardDetailView/ApplyModal";

function RecruitBoardDetail() {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");
  const [isApplyModalToggle, setIsApplyModalToggle] = useState(false);

  const { recruitId } = useParams();
  const { data: recruitBoard } = useGetRecruitDetailQuery(recruitId);
  const { mutateAsync: deleteComment } = useDeleteCommentMutation();
  const { mutateAsync: deleteRecruitBoard } = useDeleteRecruitBoardMutation();

  const deleteRecruitBoardHandler = async () => {
    const { success } = await deleteRecruitBoard(recruitId);
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  const deleteCommentHandler = recruitCommentId => async () => {
    const { success } = await deleteComment({ recruitCommentId, recruitId });
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

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
              <li>
                <p className="text-[15px] text-gray4 mb-[9px]">
                  {Location[recruitBoard?.recruitLocation]}
                </p>
                <p className="text-[15px] text-gray4 mb-[17px]">
                  소요기간 : {recruitBoard?.recruitDurationWeeks}주 예상
                </p>
                <ul className="flex flex-wrap gap-[20px]">
                  {recruitBoard?.recruitTasks.map(task =>
                    task.recruitTask < 300 ? (
                      <li
                        className={classNames(
                          "  px-[14px] py-[2px] rounded-[11px] text-white text-[15px]",
                          {
                            "bg-pink border-pink": task.recruitTask === 100,
                            "bg-yellow border-yellow": task.recruitTask === 200,
                          },
                        )}
                        key={task.recruitTask}
                      >
                        {Task[task.recruitTask]}
                        <span className="ml-[7px]">
                          {task.numberOfPeopleSet} /{" "}
                          {task.numberOfPeopleRequired}명
                        </span>
                      </li>
                    ) : null,
                  )}
                  {recruitBoard?.recruitStacks.map(stack => (
                    <li
                      className={classNames(
                        " px-[14px] py-[2px] rounded-[11px] text-white text-[15px]",
                        {
                          "bg-coral border-coral":
                            100 < stack.recruitStack &&
                            stack.recruitStack < 200,
                          "bg-blue border-blue": 200 < stack.recruitStack,
                        },
                      )}
                      key={stack.recruitStack}
                    >
                      {Stack[stack.recruitStack]} {stack.numberOfPeopleSet} /{" "}
                      {stack.numberOfPeopleRequired}명
                    </li>
                  ))}
                </ul>
              </li>
              <li className="flex ">
                <KeepItButton
                  recruitId={recruitId}
                  keepId={recruitBoard?.keepId}
                />
                <button
                  className="text-[19px]  px-[15px] py-[6px] rounded-[5px] bg-blue3 text-white"
                  onClick={openApplyModal}
                >
                  신청하기
                </button>
              </li>
            </ul>
          </div>
        </li>
        <hr className="my-[40px] border-gray4"></hr>
        <li className="mb-[70px]">
          <div className="flex items-center">
            <img
              src={recruitBoard?.userProfileImgUrl}
              alt="유저 프로필사진"
              className="w-[44px] h-[44px] mr-[10px] rounded-[50%] bg-black"
            />
            <span className="text-[21px]">{recruitBoard?.nickname}</span>
            <span className="mx-[15px]">|</span>
            <span className="text-[21px]">
              {convertDateText(recruitBoard?.createdAt)}
            </span>
          </div>
        </li>
        <li className="px-[104px] mb-[80px]">{recruitBoard?.recruitContent}</li>
        <li className="text-right mb-[34px]">
          <p className="text-[23px]">
            {true ? (
              <KeepIt className="inline-block w-[24px] h-[24px]" />
            ) : (
              <KeepItActive className="inline-block w-[24px] h-[24px]" />
            )}
            <span className="ml-[6px]"> {recruitBoard?.recruitKeepCount}</span>
          </p>
        </li>
        <li className="mb-[41px]">
          <div className="flex items-end justify-between mb-[17px]">
            <h3 className="text-[23px] ">댓글 작성하기</h3>
            <div>
              <button
                className="text-gray4 mr-[15px]"
                onClick={deleteRecruitBoardHandler}
              >
                삭제하기
              </button>
              <button className="text-gray4">수정하기</button>
            </div>
          </div>
          <AddCommentForm recruitId={recruitId} />
        </li>
        <li>
          <ul className="border-b-[1px] border-gray2">
            {recruitBoard?.recruitComments.map(comment => (
              <li
                key={comment.recruitCommentId}
                className="pt-[30px] pb-[40px] border-t-[1px] border-gray2"
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
                <div className="flex items-end justify-between">
                  <div>
                    <button className="text-[15px] text-gray4 mr-[12px]">
                      수정하기
                    </button>
                    <button
                      className="text-[15px] text-gray4"
                      onClick={deleteCommentHandler(comment.recruitCommentId)}
                    >
                      삭제하기
                    </button>
                  </div>
                  <button className="border-[1px] border-blue3 text-[19px] text-blue3 px-[15px] py-[6px] rounded-[5px]">
                    대댓글작성
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </li>
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
