import React from "react";

function RecruitBoard({
  // title,
  // createdAt,
  // imgUrls,
  nickname,
  recruitCommentCount,
  // recruitKeeps,
  // recruitLocation,
  // recruitTasks,
  // recruitStacks,
  recruitKeepCount,
  recruitDurationWeeks,
}) {
  return (
    <>
      <div className="w-full mb-[20px] h-[178px] overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
          alt="게시글 사진"
        />
      </div>
      <div className="p-x[20px] overflow-hidden sm:text-[14px]">
        <p className="line-clamp-2 font-bold px-[20px] sm:text-[18px] sm:mb-[18px]  lg:mb-[30px] ">
          게시물의 글자수 제한 게시물의 글자수 제한 게시물의 글자수 제한
          게시물의 글자수 제한 게시물의 글자수 제한 게시물의 글자수 제한
        </p>
        <ul className="px-[18px] sm:mb-[18px]">
          <li className="flex mb-[6px] text-[#797979]">
            서울/수도권
            <span className="mx-[6px]">|</span>
            {recruitDurationWeeks}주 예상
          </li>
          <ul className="flex text-[12px] gap-[6px]">
            <li className="bg-[#c0c0c0] py-[2px] px-[10px] rounded-[11px] sm:px-[8px] sm:py-[2px] ">
              <span className="relative ">프론트엔드</span>
            </li>
            <li className="bg-[#c0c0c0] py-[2px] px-[11px] rounded-[11px] sm:px-[8px] sm:py-[2px] ">
              <span className="relative ">백엔드</span>
            </li>
            <li className="bg-[#c0c0c0] py-[2px] px-[11px] rounded-[11px] sm:px-[8px] sm:py-[2px] ">
              <span className="relative ">디자이너</span>
            </li>
            <li className="bg-[#c0c0c0] py-[2px] px-[11px] rounded-[11px] sm:px-[8px] sm:py-[2px] ">
              <span className="relative ">기획자</span>
            </li>
          </ul>
        </ul>

        <ul className="flex justify-between px-[20px] sm:pb-[10px] sm:text-[12px] lg:text-[14px]">
          <li className="flex w-[60%] whitespace-nowrap line-clamp-1">
            2022-03-20
            <span className="mx-[8px] text-[#797979]">|</span>
            {nickname}
          </li>
          <li className="flex">
            <p className="mr-[10px]">ㅁ 1{recruitCommentCount}</p>
            <p>ㅁ 1{recruitKeepCount}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default RecruitBoard;
