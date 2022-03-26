import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import useGetRecruitDetailQuery from "../../hooks/useGetRecruitDetailQuery";
import { Location } from "../../constants/enums";
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
        recruitCommentContent: "commentValue.current.value",
        commentDepth: 2,
        commentGroup: 0,
      },
      recruitId,
    };
    addComment(commentData);
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
          <div className="flex flex-wrap items-end content-between w-full">
            <h1 className="text-[36px] w-full">{recruitBoard?.title}</h1>
            <ul className="flex justify-between w-full">
              <li>
                <p className="text-[15px] text-gray4 mb-[9px]">
                  {Location[recruitBoard?.recruitLocation]}
                </p>
                <p className="text-[15px] text-gray4">
                  소요기간 : {recruitBoard?.recruitDurationWeeks}주 예상
                </p>
                <ul>{}</ul>
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
              alt="유저 프로필사진"
              className="w-[44px] h-[44px] mr-[10px] rounded-[50%] bg-black"
            />
            <span className="text-[21px]">유저 닉네임</span>
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
          <div className="w-full overflow-hidden">
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
          </div>
        </li>
        <li>
          <ul className="border-b-[1px] border-gray2">
            {recruitBoard?.recruitComments.map(comment => (
              <li
                key={comment.recruitCommentId}
                className="pt-[30px] pb-[40px] border-t-[1px] border-gray2"
              >
                <ul className="flex items-center">
                  <li className="flex items-center mr-[23px]">
                    <img
                      src=""
                      alt="유저 프로필"
                      className="w-[44px] h-[44px] rounded-full overflow-hidden"
                    />
                    <p>유저 닉네임</p>
                  </li>
                  <li></li>
                </ul>
                {comment.recruitCommentContent}
              </li>
            ))}
          </ul>
        </li>
        <button className="flex items-center mt-[34px] mb-[136px] py-[6px] rounded-[20px] border-[1px] border-blue2 text-blue2 px-[17px] text-[23px]">
          <LeftArrow className="inline-block mr-[9px]" />
          목록으로
        </button>
      </ul>
    </>
  );
}

export default RecruitBoardDetail;
