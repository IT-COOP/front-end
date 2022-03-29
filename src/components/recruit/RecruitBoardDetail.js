import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";

import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";
import { Location, Task, Stack } from "../../constants/enums";
import {
  KeepItDetail,
  KeepIt,
  KeepItActive,
  LeftArrow,
} from "../../assets/icons";
import convertDateText from "../../lib/convertDateText";
import useAddCommentMutation from "../../hooks/useAddCommentMutation";

function RecruitBoardDetail() {
  const commentValue = useRef();

  const { recruitId } = useParams();
  const { data: recruitBoard } = useGetRecruitDetailQuery(recruitId);

  const { mutate: addComment } = useAddCommentMutation();

  const addCommentHandler = () => {
    if (commentValue.current.value === "") {
      return false;
    }

    const commentData = {
      data: {
        recruitCommentContent: commentValue.current.value,
        commentDepth: 2,
        commentGroup: 0,
      },
      recruitId,
    };
    addComment(commentData);
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
                <ul>
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
                      {Stack[stack.recruitStack]} /{" "}
                      {stack.numberOfPeopleRequired}명
                      <button className="ml-[5px]">X</button>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="flex">
                <button className="text-[19px] border-[1px] border-blue3 py-[6px] px-[30px] text-blue3 rounded-[5px] mr-[9px]">
                  <KeepItDetail className="inline-block " />
                  <span className="px-[15px] pl-[5px]">Keep It</span>
                </button>
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
          <h3 className="text-[23px] mb-[17px]">댓글 작성하기</h3>
          <form onSubmit={addCommentHandler} className="w-full overflow-hidden">
            <textarea
              ref={commentValue}
              type="text"
              placeholder="댓글을 작성하세요"
              className="block w-full h-[135px] p-[11px] resize-none border-[1px] border-gray2 mb-[13px]"
            />
            <button
              className="float-right mr-[13px] text-[19px] px-[15px] py-[6px] rounded-[5px] text-white bg-blue3"
              onClick={addCommentHandler}
            >
              댓글 작성
            </button>
          </form>
        </li>
        <li>
          <ul className="border-b-[1px] border-gray2">
            {commentListView?.map(comment =>
              comment.map(list => (
                <li
                  key={list.recruitCommentId}
                  className="pt-[30px] pb-[40px] border-t-[1px] border-gray2"
                >
                  <ul className="flex items-center mb-[21px]">
                    <li className="flex items-center mr-[23px] ">
                      <img
                        src={list.user.profileImgUrl}
                        alt="유저 프로필"
                        className="w-[44px] h-[44px] rounded-full overflow-hidden mr-[11px]"
                      />
                      <p>{list.user.nickname}</p>
                    </li>
                    <li className="text-[17px] text-gray4">
                      {convertDateText(list.createdAt)}
                    </li>
                  </ul>
                  {list.recruitCommentContent}
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
    </>
  );
}

export default RecruitBoardDetail;
