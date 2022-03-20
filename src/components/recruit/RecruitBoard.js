import React from "react";

function RecruitBoard({
  title,
  createdAt,
  imgUrls,
  nickname,
  recruitCommentCount,
  recruitKeeps,
  recruitLocation,
  recruitTasks,
  recruitStacks,
  recruitKeepCount,
  recruitDurationWeeks,
}) {
  return (
    <>
      <div className="w-full mb-[10px] h-[178px] overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src="https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335"
          alt="게시글 사진"
        />
      </div>
      <div className="p-x[20px] overflow-hidden text-[14px]">
        <p className="line-clamp-2 px-[20px] text-[18px] mb-[10px] font-bold sm:mt-[13px] lg:mb-[30px] ">
          게시물의 글자수 제한 게시물의 글자수 제한 게시물의 글자수 제한
          게시물의 글자수 제한 게시물의 글자수 제한 게시물의 글자수 제한
        </p>
        <ul className="px-[18px] lg:mb-[20px]">
          <li className="flex mb-[6px]">
            <p>서울/수도권</p>
            <div className="relative h-[50%] top-[25%] w-[1px] mx-[7px] bg-[#797979]"></div>
            <p>{recruitDurationWeeks}주 예상</p>
          </li>
          <ul className="flex text-[12px] gap-[6px]">
            <li className="bg-[#c0c0c0] py-[2px] px-[10px] rounded-[11px] sm:px-[8px] sm:py-[2px] ">
              <span className="relative -top-[0.5px]">프론트엔드</span>
            </li>
            <li className="bg-[#c0c0c0] py-[2px] px-[11px] rounded-[11px] sm:px-[8px] sm:py-[2px] ">
              <span className="relative -top-[0.5px]">백엔드</span>
            </li>
            <li className="bg-[#c0c0c0] py-[2px] px-[11px] rounded-[11px] sm:px-[8px] sm:py-[2px] ">
              <span className="relative -top-[0.5px]">디자이너</span>
            </li>
            <li className="bg-[#c0c0c0] py-[2px] px-[11px] rounded-[11px] sm:px-[8px] sm:py-[2px] ">
              <span className="relative -top-[0.5px]">기획자</span>
            </li>
          </ul>
        </ul>

        <ul className="flex justify-between px-[20px] py-[10px] text-[12px] lg:text-[14px]">
          <li className="flex w-[70%]">
            <p className="relative top-[0.5px] whitespace-nowrap text-[#797979]">
              2022-03-20
            </p>
            <span className="mx-[8px] text-[#797979]">|</span>
            <p className="relative  top-[0.5px] whitespace-nowrap line-clamp-1 text-[#797979]">
              {nickname}
            </p>
          </li>
          <li className="flex">
            <p className="mr-[10px]">ㅁ {recruitCommentCount}</p>
            <p>ㅁ {recruitKeepCount}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default RecruitBoard;
