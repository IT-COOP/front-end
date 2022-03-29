import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import { useQueryClient } from "react-query";

import { Location, Task, Stack } from "../../constants/enums";
import {
  KeepItDetail,
  KeepIt,
  KeepItActive,
  LeftArrow,
  KeepItDetailActive,
} from "../../assets/icons";
import convertDateText from "../../lib/convertDateText";

import useDeleteRecruitBoard from "../../hooks/useDeleteRecruitBoardMutation";
import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";
import useAddCommentMutation from "../../hooks/useAddCommentMutation";
import useDeleteCommentMutation from "../../hooks/useDeleteCommentMutation";
import useDeleteRecruitBoardMutation from "../../hooks/useDeleteRecruitBoardMutation";
import useDeleteRecruitBoardKeepItMutation from "../../hooks/useDeleteRecruitBoardKeepItMutation";

function RecruitBoardDetail() {
  const commentValue = useRef();
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData("userInfo");

  const { recruitId } = useParams();
  const { data: recruitBoard, isSuccess } = useGetRecruitDetailQuery(recruitId);
  const { mutateAsync: addComment } = useAddCommentMutation();
  const { mutateAsync: deleteComment } = useDeleteCommentMutation();
  const { mutateAsync: deleteRecruitBoard } = useDeleteRecruitBoard();
  const { mutateAsync: keepItRecruitBoard } = useDeleteRecruitBoardMutation();
  const { mutateAsync: deleteKeepItRecruitBoard } =
    useDeleteRecruitBoardKeepItMutation();

  const [isFetchData, setIsFetchData] = useState(false);

  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  console.log(recruitBoard);

  const deleteRecruitBoardHandler = async () => {
    const { success } = await deleteRecruitBoard(recruitId);
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  const addRecruitBoardKeepIt = async () => {
    const { success } = await keepItRecruitBoard(recruitId);
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  const deleteRecruitBoardKeepIt = async () => {
    const { success } = await deleteKeepItRecruitBoard(recruitId);
    if (success) {
      queryClient.invalidateQueries("recruitBoardDetail");
    }
  };

  const addCommentHandler = async e => {
    e.preventDefault();
    if (commentValue.current.value === "") {
      return;
    }
    const commentData = {
      data: {
        recruitCommentContent: commentValue.current.value,
      },
      recruitId,
    };
    const { success } = await addComment(commentData);
    commentValue.current.value = "";
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

  let groupSet = new Set();

  let view = {};

  recruitBoard?.recruitComments.map(comment => {
    if (groupSet.has(comment.commentGroup)) {
      view[comment.commentGroup] = [...view[comment.commentGroup], comment];
      return (view[comment.commentGroup] = [
        ...view[comment.commentGroup],
        comment,
      ]);
    }
    groupSet.add(comment.commentGroup);
    view[comment.commentGroup] = [comment];
    return (view[comment.commentGroup] = [comment]);
  });

  const commentListView = Object.values(view);

  return (
    <>
      <ul className="w-[1224px] mx-auto mt-[70px]">
        <li className="flex w-full">
          <img
            className="w-[392px] h-[269px] mr-[24px]"
            src={recruitBoard?.thumbImgUrl}
            alt="썸네일"
          />
          <div className="flex flex-wrap items-end content-between w-full">
            <h1 className="text-[36px] w-full">{recruitBoard?.title}</h1>
            <ul className="flex items-end justify-between w-full">
              <li>
                <p className="text-[15px] text-gray4 mb-[9px]">
                  {Location[recruitBoard?.recruitLocation]}
                </p>
                <p className="text-[15px] text-gray4 mb-[17px]">
                  소요기간 : {recruitBoard?.recruitDurationWeeks}주 예상
                </p>
                <ul className="flex flex-wrap">
                  {recruitBoard?.recruitTasks.map(task =>
                    task.recruitTask < 300 ? (
                      <li
                        className={classNames(
                          "mr-[20px]  px-[14px] py-[2px] rounded-[11px] text-white text-[15px]",
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
                        "mr-[20px] px-[14px] py-[2px] rounded-[11px] text-white text-[15px]",
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
              <li className="flex">
                {recruitBoard?.isKeeps ? (
                  <button
                    className="text-[19px] border-[1px] border-blue3 py-[6px] px-[30px] text-blue3 rounded-[5px] mr-[9px]"
                    onClick={deleteRecruitBoardKeepIt}
                  >
                    <KeepItDetailActive className="inline-block " />
                    <span className="px-[15px] pl-[5px]">Keep It</span>
                  </button>
                ) : (
                  <button
                    className="text-[19px] border-[1px] border-blue3 py-[6px] px-[30px] text-blue3 rounded-[5px] mr-[9px]"
                    onClick={addRecruitBoardKeepIt}
                  >
                    <KeepItDetail className="inline-block " />
                    <span className="px-[15px] pl-[5px]">Keep It</span>
                  </button>
                )}

                <button className="text-[19px]  px-[15px] py-[6px] rounded-[5px] bg-blue3 text-white">
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
          <form onSubmit={addCommentHandler} className="w-full overflow-hidden">
            <textarea
              ref={commentValue}
              type="text"
              placeholder="댓글을 작성하세요"
              className="block w-full h-[135px] p-[11px] resize-none border-[1px] border-gray2 mb-[13px]"
            />
            <button className="float-right mr-[13px] text-[19px] px-[15px] py-[6px] rounded-[5px] text-white bg-blue3">
              댓글 작성
            </button>
          </form>
        </li>
        <li>
          <ul className="border-b-[1px] border-gray2">
            {commentListView?.map(comment =>
              comment.map((list, idx) => (
                <li
                  key={idx}
                  className="pt-[30px] pb-[40px] border-t-[1px] border-gray2"
                >
                  <div className="flex items-center mb-[21px]">
                    <div className="flex items-center mr-[23px] ">
                      <img
                        src={list.user.profileImgUrl}
                        alt="유저 프로필"
                        className="w-[44px] h-[44px] rounded-full overflow-hidden mr-[11px]"
                      />
                      <p>{list.user.nickname}</p>
                    </div>
                    <div className="text-[17px] text-gray4">
                      {convertDateText(list.createdAt)}
                    </div>
                  </div>
                  <p className="mb-[33px]">{list.recruitCommentContent}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <button className="text-[15px] text-gray4 mr-[12px]">
                        수정하기
                      </button>
                      <button
                        className="text-[15px] text-gray4"
                        onClick={deleteCommentHandler(list.recruitCommentId)}
                      >
                        삭제하기
                      </button>
                    </div>
                    <button className="border-[1px] border-blue3 text-[19px] text-blue3 px-[15px] py-[6px] rounded-[5px]">
                      대댓글작성
                    </button>
                  </div>
                </li>
              )),
            )}
          </ul>
        </li>
        <Link to="/" className="block">
          <button className="flex items-center mt-[34px] mb-[136px] py-[6px] rounded-[20px] border-[1px] border-blue2 text-blue2 px-[17px] text-[23px]">
            <LeftArrow className="inline-block mr-[9px]" />
            목록으로
          </button>
        </Link>
      </ul>
      {!true && (
        <div className="fixed top-0 left-0 z-[999] flex items-center justify-center w-screen h-screen transition-opacity bg-black/70">
          <div className="relative w-[800px] h-[500px] flex bg-white rounded-[16px] overflow-hidden items-center justify-center">
            <div>
              <h3 className="text-[23px] font-bold mb-[40px] text-center">
                신청할 카테고리를 선택해주세요!
              </h3>
              <div className="flex flex-wrap justify-center mb-[50px]">
                {recruitBoard?.recruitTasks.map(task =>
                  task.recruitTask < 300 ? (
                    <button
                      className={classNames(
                        "mr-[20px]  px-[14px] py-[2px] rounded-[11px] text-white text-[23px]",
                        {
                          "bg-pink border-pink": task.recruitTask === 100,
                          "bg-yellow border-yellow": task.recruitTask === 200,
                        },
                      )}
                      key={task.recruitTask}
                    >
                      {Task[task.recruitTask]}
                    </button>
                  ) : null,
                )}
                {recruitBoard?.recruitStacks.map(stack => (
                  <button
                    className={classNames(
                      "mr-[20px] px-[14px] py-[2px] rounded-[11px] text-white text-[23px]",
                      {
                        "bg-coral border-coral":
                          100 < stack.recruitStack && stack.recruitStack < 200,
                        "bg-blue border-blue": 200 < stack.recruitStack,
                      },
                    )}
                    key={stack.recruitStack}
                  >
                    {Stack[stack.recruitStack]}
                  </button>
                ))}
              </div>
              <div className="mb-[50px]">
                <select className="w-full border-[1px] border-gray2 pl-[16px] text-[15px] h-[40px]">
                  <option value="1" disabled={true} className="hidden">
                    선택해 주세요!
                  </option>
                  {recruitBoard?.recruitTasks.map(task =>
                    task.recruitTask < 300 ? (
                      <option
                        value={task.recruitTask}
                        className={classNames("h-[40px]", {
                          "bg-pink border-pink": task.recruitTask === 100,
                          "bg-yellow border-yellow": task.recruitTask === 200,
                        })}
                        key={task.recruitTask}
                      >
                        {Task[task.recruitTask]}
                      </option>
                    ) : null,
                  )}
                  {recruitBoard?.recruitStacks.map(stack => (
                    <option
                      value={stack.recruitStack}
                      className={classNames("h-[40px]", {
                        "bg-coral border-coral":
                          100 < stack.recruitStack && stack.recruitStack < 200,
                        "bg-blue border-blue": 200 < stack.recruitStack,
                      })}
                      key={stack.recruitStack}
                    >
                      {Stack[stack.recruitStack]}
                    </option>
                  ))}
                </select>
              </div>
              <Link to="/">
                <button className="mx-auto font-bold text-[20px] rounded-[5px] text-white bg-[#000000] w-[484px] h-[70px] ">
                  신청하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecruitBoardDetail;
