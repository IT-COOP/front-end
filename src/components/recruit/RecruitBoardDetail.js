import React from "react";

function RecruitBoardDetail() {
  return (
    <>
      <ul className="w-[1224px] mx-auto">
        <li className="flex">
          <img
            className="w-[392px] h-[269px] mr-[24px]"
            src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
            alt="썸네일"
          />
          <div>
            <h1 className="text-[36px]">
              리액트, 스프링 개발자를 1명 모집, 이커머스 플랫폼 사이드 프젝할
              사람
            </h1>
          </div>
        </li>
        <hr className="my-[40px]"></hr>
        <li>
          <div className="flex items-center">
            <img
              alt="유저 프로필사진"
              className="w-[44px] h-[44px] mr-[10px] rounded-[50%] bg-black"
            />
            <span>유저 닉네임</span>
            <span className="mx-[15px]">|</span>
            2022.02.11
          </div>
        </li>
        <li className="px-[104px] mb-[75px]">
          안녕하세요😆 저희는 '저장만 되어있는 URL들을 구출🚀 '하기 위한 사이드
          프로젝트를 진행하고 있는 URURL입니다! ✨프로젝트 개요✨ 저희는
          성장하고 싶은 PM분들을 위한 프로젝트예요. 1 본인이 추후에 읽으려고
          저장했던 유의미한 글이 흩어지지 않게 저희 사이트에 가져오도록 하고, 2
          직접 가져오신 글들을 읽으며 성장을 위해 자신의 만족도를 달성하고자
          합니다. 더 자세한 내용은 https://bit.ly/3sMah7G 에서 확인해주세요!
        </li>
        <li className="text-right">
          <span>조회수</span>

          <span>Keep it</span>
        </li>
        <li>
          <h3>댓글 작성하기</h3>
        </li>
        <li>
          <ul>
            <li></li>
          </ul>
        </li>
      </ul>
    </>
  );
}

export default RecruitBoardDetail;
